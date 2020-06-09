#!/usr/bin/env node
let fs=require("fs");
let path=require("path");
let utility=require("./utility");
function checkWhetherFile(src){
    return fs.lstatSync(src).isFile();
}

function getContent(src){
    return fs.readdirSync(src);
}

function getExtension(src){
    let ext= src.split(".").pop();
    return ext;
}

function sendFile(dest,category,src){
    console.log(category);
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fName=path.basename(src);
    let cPath=path.join(categoryPath,fName);
    fs.copyFileSync(src,cPath);
}

function getCategory(ext){
    let types=utility.types;
    for(let category in types){
        for(let i=0;i<types[category].length;i++){
            if(ext==types[category][i]){
                console.log("Inside get Category"+category);
                return category;
            }
        }
    }
    return null;
}

function organizer(src,dest){
    //check whether file or directory
    if(checkWhetherFile(src)==true){
        let ext=getExtension(src);
        let category=getCategory(ext);
        if(category==null){
            category="others";
        }
        console.log(category);
        sendFile(dest,category,src);
    }else{
        let childNames=getContent(src);
        for(let i=0;i<childNames.length;i++){
            if(childNames[i]=="organized_files"){
                continue;
            }
            let childPath=path.join(src,childNames[i]);
            organizer(childPath,dest);
        }
    }
}

let src=process.argv[2];
let dest=path.join(src,"organizedfiles");
if(fs.existsSync(dest)==false){
    fs.mkdirSync(dest);
}
organizer(src,dest);