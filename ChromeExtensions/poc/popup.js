console.log("Iam in popup");
let btn = document.querySelector(".click");
btn.addEventListener("click",function(){
    console.log("Popup btn was clicked");
    console.log("yha se content change");
    chrome.tabs.query({active:true,currentWindow : true},function(tabs){
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id,"hello from popup",function(response){
            console.log(response);
        })
    })
})