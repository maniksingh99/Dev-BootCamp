function createBox(){
    //create all the required divs
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let close = document.createElement("div");
    let minimize = document.createElement("div");
    let container = document.createElement("div");

    //create subtree
    stickyPad.appendChild(navBar);
    stickyPad.appendChild(container);
    navBar.appendChild(close);
    navBar.appendChild(minimize);

    //add styling to them using css classes
    stickyPad.setAttribute("class","stickyPad");
    navBar.setAttribute("class","navBar");
    close.setAttribute("class","close");
    minimize.setAttribute("class","minimize");
    container.setAttribute("class","container");

        //append it to body
        document.body.appendChild(stickyPad);

        //functions for sticky pad
    
        let intialX = null;
        let intialY = null;
        let isStickyDown = false;
        navBar.addEventListener("mousedown",function(e){
            intialX = e.clientX;
            intialY = e.clientY;
            isStickyDown = true
        })
        board.addEventListener("mousemove",function(e){
            if(isStickyDown == true){
                //final points 
                let finalX= e.clientX;
                let finalY = e.clientY;
    
                //distance moved by the stickypad
                let dx = finalX - intialX;
                let dy = finalY - intialY;
                //move sticky
                let {top,left} = stickyPad.getBoundingClientRect();
                stickyPad.style.top = top+dy+"px";
                stickyPad.style.left = left+dx+"px";
                intialX = finalX;
                intialY = finalY;
            }
        })
    
        window.addEventListener("mouseup",function(){
            isStickyDown = false;
        })
    
        close.addEventListener("click",function(){
            stickyPad.remove();
        })
        let flag = true;
        minimize.addEventListener("click",function(){
            if(flag == true){
                container.style.display = "none";
            }
            else{
                container.style.display = "block";
            }
            flag=!flag;
        })
        return container;
}