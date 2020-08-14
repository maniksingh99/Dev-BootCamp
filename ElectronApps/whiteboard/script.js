let isPenDown = false;
let points = [];
let redoArr = [];
board.addEventListener("mousedown",function(e){
    let x = e.clientX;
    let y = e.clientY;
    let top = getPosition();
    y = y - top;
    ctx.beginPath(0,0);
    ctx.moveTo(x,y);
    isPenDown = true;
    let mdp ={
        x:x,
        y:y,
        id:"md",
        color:ctx.strokeStyle,
        width:ctx.lineWidth
    }
    // console.log(mdp);
    points.push(mdp);
})

board.addEventListener("mousemove",function(e){
    let x = e.clientX;
    let y = e.clientY;
    let top = getPosition();
    y = y - top;
    if(isPenDown == true){
        ctx.lineTo(x,y);
        ctx.stroke();
        let mmp ={
            x:x,
            y:y,
            id:"mm",
            color:ctx.strokeStyle,
            width:ctx.lineWidth
        }
        points.push(mmp);
    }
   
})

window.addEventListener("mouseup",function(e){
    isPenDown = false;
})

function getPosition(){
    let {top} = board.getBoundingClientRect();
    return top;
}

//first requirement of this redraw function is that when we resize the window all the written stuff gets erasied
function redraw() {
    for (let i = 0; i < points.length; i++) {
        let { x, y, id, color, width } = points[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (id == "md") {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else if (id == "mm") {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}

function undoMaker(){
    // addFirst => unshift, 
    // removeFirst => shift
    //  addLast=> push
    // removeLast => pop
    
    if(points.length >= 2){
        let tempArr = [];
        for(let i = points.length-1;i >= 0;i--){
            let {id} = points[i];
            if(id == "md"){
                tempArr.unshift(points.pop());
                // redoArr.push(obj);
                break;
            }
            else{
                //mm
                tempArr.unshift(points.pop());
            }
            // redoArr.push(obj);
        }
        redoArr.push(tempArr);
        ctx.clearRect(0,0,board.width,board.height);
        redraw();
    }

}

function redoMaker(){
    if(redoArr.length > 0){
        let redoPathArr = redoArr.pop();
        //add all points to undo arr
        points.push(...redoPathArr);
        ctx.clearRect(0,0,board.width,board.height);
        redraw();
    }
}


