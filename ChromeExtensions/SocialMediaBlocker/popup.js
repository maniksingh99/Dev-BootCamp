console.log("Iam in popup.js");
let input = document.querySelector("input");
let list = document.querySelector("ul");
let button = document.querySelector(".btn");
button.addEventListener("click",async function(){
    let toBeBlocked = input.value;
    if(toBeBlocked){
        await sendMessage({
            type:"url",
            link:toBeBlocked
        });
        addToList(toBeBlocked);
        input.value = '';
    }
})

// (async function (){
//    let blockList =  await sendMessage({type:"getList"});
//    for(let i = 0; i < blockList.length;i++){
//        addToList(blockList[i].site);
//    }
// })();
async function init() {
    let blockList = await sendMessage({ type: "getList" });
    for (let i = 0; i < blockList.length; i++) {
        addToList(blockList[i].site);
    }
}
init();

function sendMessage(toBeBlocked){
    return new Promise(function (resolve,reject){
        chrome.runtime.sendMessage(toBeBlocked, function (response) {
            resolve(response)
        });
    })
}

function addToList(toBeBlocked){
    let li = document.createElement("li");
    li.setAttribute("class","list-group-item");
    li.innerHTML = toBeBlocked + '<i class="fas fa-times"></i>';
    list.appendChild(li);
    
    let i = li.querySelector("i");
    i.addEventListener("click",function(){
        i.parentNode.remove();
    })
}