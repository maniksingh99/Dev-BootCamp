
function changeImages(){
    let imgArr = document.querySelectorAll("img");
    let images = ["images/img-1.jpg","images/img-2.jpg","images/img-3.jpg","images/img-4.jpg","images/img-5.jpeg"];
    
    for(let i = 0; i < imgArr.length;i++){
        let idx = Math.floor(Math.random()*images.length);
        let url = chrome.extension.getURL(images[idx]);
        console.log(url);
        imgArr[i].src = url;
    }
}


chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    sendResponse("Hello from content");
    changeImages();
})