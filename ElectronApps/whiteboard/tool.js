const socket = io.connect('https://whiteboardserver.herokuapp.com/');
console.log(socket);
let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector('#redo');
let pencilOptions = document.querySelector('#pencil-options');
let eraserOptions = document.querySelector('#eraser-options');
let sliders = document.querySelectorAll("input[type='range']");
let sticky = document.querySelector("#sticky");
let activeTool = 'pencil';
let pencilSize = 5;
let eraserSize = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = "1";

pencil.addEventListener("click",function(){
    // console.log(ctx);
    if(activeTool == 'pencil'){
        pencilOptions.classList.add('show');
    }
    else{
        activeTool = 'pencil';
        eraserOptions.classList.remove('show');
        ctx.lineWidth = pencilSize;
        ctx.strokeStyle = "black";
    }

})

eraser.addEventListener("click",function(){
    // console.log(ctx);
    if(activeTool == 'eraser'){
        eraserOptions.classList.add('show');
    }
    else{
        activeTool = 'eraser';
        pencilOptions.classList.remove('show');
        ctx.lineWidth = eraserSize;
        ctx.strokeStyle = "white";
    }
})

undo.addEventListener("click",function(){
    undoMaker();
})

document.addEventListener("keydown",function(e){
    var evtObj = e;
    if(evtObj.keyCode == 90 && evtObj.ctrlKey){
        undoMaker();
    }
})

redo.addEventListener("click",function(){
    redoMaker();
})

document.addEventListener("keydown",function(e){
    var evtObj = e;
    if(evtObj.keyCode == 89 && evtObj.ctrlKey){
        redoMaker();
    }
})

sticky.addEventListener("click",function(){
    createSticky();
})

function handleColor(color){
    ctx.strokeStyle = color;
    socket.emit("color",color);
}

sliders.forEach(function(slider){
    slider.addEventListener("change",function(){
        let value = slider.value;
        ctx.lineWidth = value;
        if(activeTool == "pencil"){
            pencilSize = ctx.lineWidth;
        }else{
            eraserSize = ctx.lineWidth;
        }
    })
})
