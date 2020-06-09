let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
console.log("Sending request");
let url="https://www.espncricinfo.com/series/19322/commentary/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";
request(url,cb);
function cb(err,response,html){
    console.log("Received Response");
    if(err==null && response.statusCode==200){
        fs.writeFileSync("lbc.html",html);
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

//first html of first element 
//console.log(element.html());

//print text of all the selected elements
//console.log(element.text());



function parseHtml(html){
    console.log("Parsing Html");
    let $=cheerio.load(html);
    //1.generic for printing the last commentary
    let elementArr=$('.match-comment-wrapper');
    let element=$(elementArr[0]).text()
    //2.first element text for printing the last commentary
    //let ans=$(elementArr.html()).text();
    console.log("```````````````````````");
    console.log(element);
    console.log("```````````````````````````");
}