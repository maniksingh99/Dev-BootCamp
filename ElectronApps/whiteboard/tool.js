const { contextBridge } = require("electron");

let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");


pencil.addEventListener("click",function(){
    ctx.lineWidth = 10;
    console.log(ctx);
    ctx.strokeStyle = "black";
})

eraser.addEventListener("click",function(){
    ctx.lineWidth = 10;
    console.log(ctx);
    ctx.strokeStyle = "white";
})