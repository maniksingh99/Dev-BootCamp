let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
console.log("Sending request");

let url="https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";
request(url,cb);
function cb(err,response,html){
    console.log("Received Response");
    if(err==null && response.statusCode==200){
        fs.writeFileSync("match.html",html);
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
    console.log('``````````````');
    let maxWickets=0;
    let hwt;
    let players=$(".table.bowler tbody tr");
    for(let i=0;i<players.length;i++){
        let allColOfPlayers=$(players[i]).find("td");
        let cPlayerName=$(allColOfPlayers[0]).text();
        let allWickets=$(allColOfPlayers[4]).text();
        console.log(cPlayerName +" " +allWickets);
        if(Number(allWickets)>maxWickets){
            maxWickets=Number(allWickets);
            hwt=cPlayerName;
        }
    }
    console.log('````````````````````````');
    console.log(cPlayerName + " " + maxWickets);
    console.log('``````````````````````');
}