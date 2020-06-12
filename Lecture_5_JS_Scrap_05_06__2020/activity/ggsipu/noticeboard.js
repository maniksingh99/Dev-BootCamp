let request=require("request");
let fs=require("fs");
let emailLogic=require("./emailLogic");
let cheerio=require("cheerio");

console.log("Sending request");
let url="http://www.ipu.ac.in/notices.php";
let allNotices=[];
request(url,cb);
function cb(err,response,html){
    console.log("Recevied Response");
    if(err==null&& response.statusCode==200){
        fs.writeFileSync("notice.html",html);
        console.log("File Saved");
        parseHtml(html);
    }
    else if(response.statusCode==404){
        console.log("Page not found");
    }
    else{
        console.log(err);
        console.log(response.statusCode);
    }
}

function parseHtml(html){
    let cCallNotices=[];
    let $=cheerio.load(html);
    let tBodyArr=$(".table-box table tbody");
    let trArray=$(tBodyArr[1]).find("tr");
    //fetching all the notices for current call
    for(let i=0;i<trArray.length;i++){
        let notOurElement=$(trArray[i]).hasClass("item-collapse");

        if(notOurElement==true){
            break;
        }
        let columns=$(trArray[i]).find("td");
        let notice=$(columns[0]).text();
        let date=$(columns[1]).text();
        let noticeObj={};
        noticeObj.notice=notice;
        noticeObj.date=date;
        cCallNotices.push(noticeObj);
    }
    //first request hai 
    if(allNotices.length==0){
        allNotices=cCallNotices;
        console.table(allNotices);
        let html=fs.readFileSync("index.html")+"";
        let allNoticesHtml="";
        for(let i=0;i<allNotices.length;i++){
            let cNotice=allNotices[i];
            let currentNotice=`<tr><td>${cNotice.notice}</td><td>${cNotice.date}</td></tr>`;
            allNoticesHtml+=currentNotice;
        }
        html=html.replace("{{template}}",allNoticesHtml);
        //console.log(html);
        emailLogic.sendEmail(html);
    }
    else if(allNotices.length==cCallNotices.length){
        console.log("No New Notice");
    }
    else{
        let newNotices=cCallNotices.length-allNotices.length;
        console.log(newNotices);
        for(let i=0;i<newNotices;i++){
            allNotices.unshift(cCallNotices[i]);
            console.table(cCallNotices[i]);
        }
    }
}