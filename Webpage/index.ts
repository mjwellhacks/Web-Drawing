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
var drawn:matrix = [
[ 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0 ],
[ 0, 0, 0, 0, 0, 0, 0, 0 ],
];
var themes = [
    ["#102E4A", "#715AFF", "#5887FF", "#A682FF", "#55C1FF"],
    ["#001524", "#78290F", "#15616D", "#FF7D00", "#FFECD1"],
    ["#2D2D2A", "#353831", "#38423B", "#3F5E5A", "#20FC8F"],
    ["#031926", "#468189", "#77ACA2", "#9ABEBB", "#F4E9CD"],
    ["#6290C3", "#C2E7DA", "#F1FFE7", "#1A1B41", "#BAFF29"],
    ["#E55934", "#D9594C", "#CE8D66", "#C3BF6D", "#B7B868"],
    ["#DCDCDD", "#C5C3C6", "#46494C", "#4C5C68", "#1985A1"]
];
var currenttheme : number;
if (document.cookie.length > 0) {
    currenttheme = Number(document.cookie);
}
else {
    currenttheme = 0;
}
const blank:matrix = [
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
];
var numtoindex ={"a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h" : 7};
var indextonum ={0 : "a", 1 : "b", 2 : "c", 3 : "d", 4 : "e", 5 : "f", 6 : "g", 7 : "h"};
var dotcolor : string = themes[currenttheme][1];
var dotbackground : string = themes[currenttheme][4];
var websocket = new WebSocket("ws://192.168.1.94:8765");
function pixelclick(pixel): void {
    drawn[numtoindex[pixel[0]]][pixel[1] - 1]++;
    if (drawn[numtoindex[pixel[0]]][pixel[1] - 1] == 2){
        drawn[numtoindex[pixel[0]]][pixel[1] - 1] = 0;
    }
    pixeldraw();
}
function pixeldraw(): void {
    for (const row of drawn){
        for (var i = 0; i < 8; i++){
            var item = row[i];
            if (item == 1){
                document.getElementById(indextonum[drawn.indexOf(row)] + String(i + 1)).style.backgroundColor = dotcolor;
            }
            if (item == 0) {
                document.getElementById(indextonum[drawn.indexOf(row)] + String(i + 1)).style.backgroundColor = dotbackground;
            }
        }
    }
}
function sendpixels(): void{
    var username = (<HTMLInputElement>document.getElementById("name")).value;
    if (username.length > 0 && JSON.stringify(drawn) != JSON.stringify(blank)) {
        var sendlist: jsonmatrix = {"username": username, "drawn": drawn};
        websocket.send(JSON.stringify(sendlist));
        alert("Picture Sent!");
    }
    else if(username.length == 0 && JSON.stringify(drawn) == JSON.stringify(blank)){
        alert("Please Specify a Username And Draw A Picture");
    }
    else if(JSON.stringify(drawn) == JSON.stringify(blank)){
        alert("Please Draw A Picture");
    }
    else if(username.length == 0){
        alert("Please Specify a Username");
    }
}
function createreadable(): void{
    var returnstring = "";
    for (const row of drawn){
        returnstring += String(drawn.indexOf(row)) + String(row[0]) + String(row[1]) + String(row[2]) + String(row[3]) + String(row[4]) + String(row[5]) + String(row[6]) + String(row[7]) + ',';
    }
    console.log(returnstring);
}
function reset(): void {
    drawn = [
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    ];
    pixeldraw();
}
function dotset(color): void {
    for (var row = 0; row < 8; row++){
        for (var collumn = 0; collumn < 8; collumn++){
            document.getElementById(indextonum[row] + String(collumn + 1)).style.backgroundColor = color;
        }
    }
    pixeldraw();
}
function settheme(): void{
    document.body.style.color = themes[currenttheme][4];
    document.body.style.backgroundColor = themes[currenttheme][0];
    document.getElementById("name").style.color = themes[currenttheme][4];
    document.getElementById("name").style.borderColor = themes[currenttheme][4];
    document.getElementById("name").style.backgroundColor = themes[currenttheme][0];
    document.getElementById("reset").style.color = themes[currenttheme][4];
    document.getElementById("send").style.color = themes[currenttheme][4];
    document.getElementById("changetheme").style.color = themes[currenttheme][4];
    document.getElementById("reset").style.borderColor = themes[currenttheme][4];
    document.getElementById("send").style.borderColor = themes[currenttheme][4];
    document.getElementById("changetheme").style.borderColor = themes[currenttheme][4];
    document.getElementById("reset").style.backgroundColor = themes[currenttheme][4];
    document.getElementById("send").style.backgroundColor = themes[currenttheme][4];
    document.getElementById("changetheme").style.backgroundColor = themes[currenttheme][4];
    document.getElementById("reset").style.color = themes[currenttheme][0];
    document.getElementById("send").style.color = themes[currenttheme][0];
    document.getElementById("changetheme").style.color = themes[currenttheme][0];
    dotcolor = themes[currenttheme][1];
    dotbackground = themes[currenttheme][4];
    dotset(themes[currenttheme][4]);
}
function changetheme(){
    currenttheme += 1;
    if(currenttheme == themes.length){
        currenttheme = 0;
    }
    settheme();
    pixeldraw();
    document.cookie = String(currenttheme);
}