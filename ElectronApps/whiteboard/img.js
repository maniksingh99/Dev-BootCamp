let upload = document.querySelector("#upload");
upload.addEventListener("change",function(e){
    // let img = document.createElement("img");
    // const reader = new FileReader();
    // reader.readAsDataURL(upload.files[0]);
    // reader.onload = function(){
        //     img.src = reader.result;
        // }
        // let uInp = document.querySelector("input[type='file']");
        
        
        let container = createBox();
        let file = upload.files[0];
        let img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        document.body.appendChild(img);
        img.setAttribute("class","upload-img");
        container.appendChild(img);
        upload.value="";
        
        
    })
    
let download = document.querySelector("#download");
download.addEventListener("click",function(){
    let a = document.createElement("a");
    a.href = board.toDataURL('image/png');
    a.download = 'file.png';
    a.click();
    a.remove();
})