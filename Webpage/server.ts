type matrix = [
    Array<number>,
    Array<number>,
    Array<number>,
    Array<number>,
    Array<number>,
    Array<number>,
    Array<number>,
    Array<number>,
];
interface jsonmatrix {
    username: string;
    drawn: matrix;
}
var data : jsonmatrix = { 
    "username": "test",
    "drawn":
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    ]
};
var numtoindex ={"a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h" : 7};
var indextonum ={0 : "a", 1 : "b", 2 : "c", 3 : "d", 4 : "e", 5 : "f", 6 : "g", 7 : "h"};
var websocket = new WebSocket("ws://192.168.1.94:8764");
websocket.onmessage = function (event) {
    data = JSON.parse(event.data);
    console.log(data.username);
    document.getElementById("from").innerHTML = "From: " + data.username;
    pixeldraw();
    websocket.send("Good");
}
function pixeldraw(): void {
    for (const row of data.drawn){
        for (var i = 0; i < 8; i++){
            var item = row[i];
            if (item == 1){
                document.getElementById(indextonum[data.drawn.indexOf(row)] + String(i + 1)).style.backgroundColor = "#715AFF";
            }
            if (item == 0) {
                document.getElementById(indextonum[data.drawn.indexOf(row)] + String(i + 1)).style.backgroundColor = "#55C1FF";
            }
        }
    }
    //websocket.send(JSON.stringify(drawn));
}
function keepAlive(timeout = 20000) { 
    console.log("ran");
    if (websocket.readyState == websocket.OPEN) {  
        websocket.send('Ping');  
    }
}
setInterval(keepAlive, 500);