let fs=require("fs");
let path=require("path");
let utility=require("./utility");

function getContent(src){
    return fs.readdirSync(src);
}

function checkWhetherFile(src){
    return fs.lstatSync(src).isFile();
}

function sendFile(dest,category,src){
    let destPath=path.join(dest,category);
    if(fs.existsSync(destPath)==false){
        fs.mkdirSync(destPath);
    }
    let file=path.basename(src);
    let finalPath=path.join(destPath,file);
    fs.copyFileSync(src,finalPath);
}

function getExtension(src){
    let ext=src.split(".").pop();
    return ext;
}

function getCategory(ext){
    let types=utility.types;
    for(let category in types){
        for(let i=0;i<types[category].length;i++){
            if(ext==types[category][i]){
                console.log("Inside get category"+category);
                return category;
            }
        }
    }
    return null;
}

function organizer(src,dest){
    console.log("Hello ");
    if(checkWhetherFile(src)==true){
        let ext=getExtension(src);
        let category=getCategory(ext);
        // let categoryPath=path.join(category,ext);
        // let cPath=path.join(dest,cPath);
        if(category==null){
            category="others";
        }
        console.log(category);
        sendFile(dest,category,src);
    }
    else{
        let childNames=getContent(src);
        for(let i=0;i<childNames.length;i++){
            if(childNames[i]=="organizedfiles"){
                continue;
            }
            let childPath=path.join(src,childNames[i]);
            organizer(childPath,dest)
        }
    }
}

let src=process.argv[2];
let dest=path.join(src,"organizedfiles");
if(fs.existsSync(dest)==false){
    fs.mkdirSync(dest);
}
organizer(src,dest);