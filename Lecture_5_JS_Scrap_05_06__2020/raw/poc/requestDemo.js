let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
console.log("Sending request");
//let url="https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results";
let url="https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results";
request(url,cb);
function cb(err,response,html){
    console.log("Received Response");
    if(err==null && response.statusCode==200){
        fs.writeFileSync("index.html",html);
        console.log("File saved");
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
    console.log("Parsing Html");
    let $=cheerio.load(html);
    let title=$('title');
    console.log("```````````````````````");
    console.log(title.text());
    console.log("```````````````````````````");
}