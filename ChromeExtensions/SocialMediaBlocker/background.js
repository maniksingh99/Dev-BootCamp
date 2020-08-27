let blockList = [];
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if(request.type == "getList"){
                return sendResponse(blockList);
        }else{
                let newEntry = request.link;
                console.log(newEntry)
                blockList.push({ site: newEntry, time: 10 })
                console.log(sender);
                sendResponse(true);
        }

});

//polling
async function init(){
        if(blockList.length > 0){
                let tab = await getTab();
                console.log(tab);
                if(tab){
                        let cUrl = tab.url;
                        for(let i = 0; i < blockList.length;i++){
                                let isUsing = (cUrl).includes(blockList[i].site);
                                if(isUsing){
                                        console.log(blockList[i].time);
                                        if(blockList[i].time > 0){
                                                blockList[i].time--;
                                                chrome.browserAction.setBadgeText({text:blockList[i].time+""});
                                        }
                                        
                                        if(blockList[i].time <= 0){
                                                console.log("close tab");
                                                chrome.browserAction.setBadgeText({text:blockList[i].time+""});
                                                await removeTab(tab);
                                                console.log("Tab closed");
                                        }
                                }
                        }
                }
        }
        console.log("polling");
}

setInterval(init,1000);

function getTab(){
        return new Promise(function(resolve,reject){
                chrome.tabs.query({active:true,currentWindow:true},function(tabs){
                        resolve(tabs[0]);
                })
        })
}

function removeTab(tab){
        return new Promise(function(resolve,reject){
            chrome.tabs.remove(tab.id,function(){
                    resolve();
            })      
        })
}



