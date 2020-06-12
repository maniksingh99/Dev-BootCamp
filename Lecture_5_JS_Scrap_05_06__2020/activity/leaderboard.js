let request=require("request");
let fs=require("fs");
let cheerio=require("cheerio");
console.log("Sending request");

let url="https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results";
let leaderboard=[],count=0;
request(url,cb);
function cb(err,response,html){
    console.log("Received Response");
    if(err==null && response.statusCode==200){
        fs.writeFileSync("series.html",html);
        console.log("File saved");
        parseSeriesPage(html);
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



function parseSeriesPage(html){
    console.log("Parsing Html");
    let $=cheerio.load(html);
    console.log('``````````````');
    //let card=$('.match-score-block .match-highlight.border-bottom .row .col-16 .small.mb-0.match-description');
    //console.log(card.length);
    //let accept=[];
    let allCards=$('.col-md-8.col-16');
    for(let i=0;i<allCards.length;i++){
        let myType=$(allCards[i]).find(".small").text();
        let isValid=myType.includes("ODI") || myType.includes("T20I");
        if(isValid){
            //console.log(myType);
            //1.attribute selector
            // let anchor=$(allCards[i]).find(".match-cta-container a[data-hover='Scorecard']");
            // let matchLink=$(anchor).attr("href");
            //2. way of doing the same we did above
            let anchor=$(allCards[i]).find(".match-cta-container a").text();
            //console.log("`````````````````````````````````````````````````````````````````````````````````",anchor);
            let matchLink=$(anchor[0]).attr("href");
            console.log(matchLink);
            let fullLink=`https://www.espncricinfo.com${matchLink}`;
            //console.log(fullLink);
            handleEachMatch(fullLink);
        }
        // let desc=$(card[i]).text();
        // let arr=desc.split(" ");
        // if(arr[1]=='ODI' || arr[1]=='T20I'){
        //     //accept.push(desc);
        //     console.log(desc);
        // }
    }
    //console.log(accept.length);
    //console.log(accept);
    //console.log(card.text());
    //console.log('`````````````````');
}

//page Link=> request=>response=>recieve=>parseMatch
function handleEachMatch(fullLink){
    request(fullLink,mcb);
    count++;
    function mcb(err,response,html){
        console.log("Received Match Response");
        if(err==null && response.statusCode==200){
            //fs.writeFileSync("series.html",html);
            console.log("File saved");
            parseMatch(html);
            count--;
            if(count==0){
                console.table(leaderboard);
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
}

//input=>matchPageHtml=>get respective teamName,run,type,score of a player
function parseMatch(html){
    let $=cheerio.load(html);
    let format=$(".desc.text-truncate").text();
    if(format.includes("ODI")==true){
        format="ODI";
    }
    else{
        format="T20I";
    }
    //scorecards
    let innings=$('.card.content-block.match-scorecard-table');
    innings=innings.slice(0,2);
    for(let i=0;i<innings.length;i++){
        let cInnings=innings[i];
        let teamName=$(cInnings).find("h5").text();
        teamName=teamName.split("Innings").shift();
        console.log(teamName);
        let batsmanList=$(cInnings).find(".table.batsman tbody tr");
        for(let j=0;j<batsmanList.length;j++){
            let bCols=$(batsmanList[j]).find("td");
            let isBatsManCol=$(bCols[0]).hasClass("batsman-cell");
            if(isBatsManCol){
                let batsManName=$(bCols[0]).text();
                let runs=$(bCols[2]).text();
                console.log(batsManName + " " + runs);
                AddToLeaderBoard(batsManName,teamName,runs,format);
            }
        }
        console.log('############################');
    }
    console.log('`````````````````````````````````');
}

function AddToLeaderBoard(name,team,runs,format){
    //check=>entry exist=>total runs update
    runs=Number(runs);
    for(let i=0;i<leaderboard.length;i++){
        let cPlayerInfo=leaderboard[i];
        let match=cPlayerInfo.Name==name && cPlayerInfo.Team==team && cPlayerInfo.Format==format;
        if(match==true){
            cPlayerInfo.TotalRuns+=runs;
            return;
        }
    }
    //create a new entry and push to leaderboard
    let playerInfo={};
    playerInfo.Name=name;
    playerInfo.Team=team;
    playerInfo.Name=name;
    playerInfo.Format=format;
    leaderboard.push(playerInfo);
}