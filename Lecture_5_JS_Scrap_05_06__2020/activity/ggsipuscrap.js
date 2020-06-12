let request=require("request");
//let fs=require("fs");
let cheerio=require("cheerio");
let cron=require("node-cron");

let count=1;
let trArr;

console.log("Sending request");

let url="http://www.ipu.ac.in/notices.php";

cron.schedule('*/1 * * * *', function() {
    console.log("inside cron job");
    request(url,cb);
});

//request(url,cb);
function cb(err,response,html){
    console.log("Recevied Response");
    if(err==null || response.status==200){
        console.log("File Saved");
        if(count==1){
            parseHtml(html);
            count++;
        }
        else{
            parseAfterFirst(html);
            count++;
        }
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
    let $=cheerio.load(html);
    let tbody=$("tbody");
    tbody=tbody.splice(1,1);
    trArr=$(tbody).find("tr td a");
    console.log(trArr.length);
    console.log(tbody.length);
    for(let i=0;i<trArr.length;i++){
        let notice=$(trArr[i]).text();
        console.log(notice);
    }
}

function parseAfterFirst(html){
    let $=cheerio.load(html);
    let tbody=$("tbody");
    tbody=tbody.splice(1,1);
    let trArrSecond=$(tbody).find("tr td a");
    console.log(trArrSecond.length);
    console.log("the length of trarr is  ",trArr.length);
    console.log(tbody.length);
    //trArr.push("hello");
    if(trArrSecond.length==trArr.length){
        console.log("No new notice");
    }
    else{
        let res=[];
        res=trArrSecond.filter((ele)=>{
            return !trArr.find((y)=>{
                return ele==y;
            })
        })
        console.log("the length of array after removing same values```````",res.length);
        for(let i=0;i<res.length;i++){
            let notice=$(res[i]).text();
            console.log(notice);
        }
    }

}