//it represents whole page
const d = document;

const bar1 = d.querySelector("#one");
const bar2 = d.querySelector("#two");
const ball = d.querySelector("#ball");
const body = d.querySelector("body");

body.addEventListener('keydown',function(event){
    let gameHeight = body.clientHeight;
    let bound = gameHeight - 189;
    console.log(gameHeight);
    console.log(event);
    let b1top = Number((bar1.style.top.slice(0,-2)));
    let b2top = Number((bar2.style.top.slice(0,-2)));
    if(event.key == "s" && bound > b1top){
        bar1.style.top = (100+b1top)+"px";
    }else if(event.key=="w" && b1top != 0 ){
        bar1.style.top = (b1top-100)+"px";
    }
    if(event.key == "ArrowDown" && bound > b2top){
        bar2.style.top = (100+b2top)+"px";
    }else if(event.key=="ArrowUp" && b2top != 0){
        bar2.style.top = (b2top-100)+"px";
    }
    
})

let xd = true;
let yd = true;
function moveBall(){
    let bodyHeight = body.clientHeight;
    let bodyWidth = body.clientWidth;
    let ballTop = Number(ball.style.top.slice(0,-2));
    let ballLeft = Number(ball.style.left.slice(0,-2));
    let ballBottom = Number(ball.style.top.slice(0,-2)) + 100;
    let ballRight = Number(ball.style.left.slice(0,-2)) + 100;

    if(ballTop == 0 || ballBottom == bodyHeight){
        yd = !yd
    }
    if(ballLeft  == 0 || ballRight == bodyWidth){
        xd = !xd
    }

    ball.style.top=yd==true?(ballTop-1)+"px":(ballTop+1)+"px"
    ball.style.left=xd==true?(ballLeft-1)+"px":(ballLeft+1)+"px"
}
setInterval(moveBall, 1);