let fs=require("fs");
console.log("Before");
function f1cb(err,content){
    if(err){
        console.log("Inside err");
        console.log(err);
        fs.readFile("../../f2.txt",f2cb);
    }
    else{
        console.log("Data of f1 has arrived");
        console.log("Content "+content);
        fs.readFile("../../f2.txt",f2cb);
    }
}

function f2cb(err,content){
    if(err){
        console.log("Inside err");
        console.log(err);
        fs.readFile("../../f3.txt",f3cb);
    }
    else{
        console.log("Data of f2 has arrived");
        console.log("Content "+content);
        fs.readFile("../../f3.txt",f3cb);
    }
}

function f3cb(err,content){
    if(err){
        console.log("Inside err");
        console.log(err);
    }
    else{
        console.log("Data of f3 has arrived");
        console.log("Content "+content);
    }
}

fs.readFile("../../f1.txt",f1cb);
console.log("After");