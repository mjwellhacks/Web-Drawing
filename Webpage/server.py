import asyncio
import websockets
import threading
import serial
import json
global drawn
drawn = {"username": "test", "drawn": [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]}
global ser
ser = serial.Serial('COM6', 9600)
def sendconvert():
    justdrawn = json.loads(drawn)["drawn"]
    returnstring = ""
    i = 0
    for item in justdrawn:
        returnstring += str(i) + str(item[0]) + str(item[1]) + str(item[2]) + str(item[3]) + str(item[4]) + str(item[5]) + str(item[6]) + str(item[7]) + ","
        i += 1
    print(returnstring)
    ser.write(str(returnstring).encode())
async def client(websocket, path):
    print("Started Client")
    global drawn
    while True:
        drawn = await websocket.recv()
        await loop.run_in_executor(None, sendconvert)
async def server(websocket, path):
    print("Started Server")
    await websocket.send(str(drawn))
    while True:
        message = await websocket.recv()
        if message == "Ping":
            await websocket.send(str(drawn))
loop = asyncio.get_event_loop()
start_client = websockets.serve(client, '192.168.1.116', 8765)
loop.run_until_complete(start_client)
start_server = websockets.serve(server, '192.168.1.116', 8764)
loop.run_until_complete(start_server)
loop.run_forever()