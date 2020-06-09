let fs=require("fs");
let path=require("path");
module.exports.treefyFn=function(){
    let src=arguments[0];
    let dest=arguments[1];
    let rawData=fs.readFileSync(path.join(src,"metadata.json"));
    let data=JSON.parse(rawData);
    console.log(data);
    treefy(src,dest,data);
}

function treefy(src,dest,cELem){
    if(cELem.isFile==true){
        let srcPath=path.join(src,cELem.newName);
        let filePath=path.join(dest,cELem.oldName);
        fs.copyFileSync(srcPath,filePath);
        console.log(`${cELem.oldName} is created`);
    }
    else{
        //let dirName=cELem.name;
        let dirPath=path.join(dest,cELem.name);
        fs.mkdirSync(dirPath);
        console.log(`Directory ${cELem.name} created inside ${dest}`);
        for(let i=0;i<cELem.children.length;i++){
            treefy(src,dirPath,cELem.children[i])
        }
    }
}