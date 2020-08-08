let isPenDown = false;
board.addEventListener("mousedown",function(e){
    let x = e.clientX;
    let y = e.clientY;
    let top = getPosition();
    y = y - top;
    ctx.beginPath(0,0);
    ctx.moveTo(x,y);
    isPenDown = true;
})

board.addEventListener("mousemove",function(e){
    let x = e.clientX;
    let y = e.clientY;
    let top = getPosition();
    y = y - top;
    if(isPenDown == true){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
})

window.addEventListener("mouseup",function(e){
    isPenDown = false;
})

function getPosition(){
    let {top} = board.getBoundingClientRect();
    return top;
}