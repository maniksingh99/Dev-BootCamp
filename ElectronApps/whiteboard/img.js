let upload = document.querySelector("#upload");
upload.addEventListener("change",function(e){
    // let img = document.createElement("img");
    // const reader = new FileReader();
    // reader.readAsDataURL(upload.files[0]);
    // reader.onload = function(){
    //     img.src = reader.result;
    // }
    let file = upload.files[0];
    let img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    document.body.appendChild(img);
})