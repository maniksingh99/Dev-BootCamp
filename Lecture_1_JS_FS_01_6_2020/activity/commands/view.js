let fs=require("fs");
let path=require("path");
function checkWhetherFile(src){
    return fs.lstatSync(src).isFile();
}

function getContent(src){
    return fs.readdirSync(src);
}
module.exports.view=function (){
    let src=arguments[0];
    let mode=arguments[1];
    if(mode=="-t"){
        viewAsTree(src,"");
    }else{
        viewAsFlatFile(src,path.basename(src));
    }
}


function viewAsFlatFile(src,toPrint){
    if(checkWhetherFile(src)==true){
        console.log(toPrint+" *");
    }else{
        console.log(toPrint);
        let childNames=getContent(src);
        //console.log(childNames);
        for(let i=0;i<childNames.length;i++){
            let childPath=path.join(src,childNames[i]);
            let cToPrint=path.join(toPrint,path.basename(childPath));
            viewAsFlatFile(childPath,cToPrint);
        }
    }
}

function viewAsTree(src,indent){
    if(checkWhetherFile(src)==true){
        console.log(indent + path.basename(src) +" *");
    }else{
        console.log(indent + path.basename(src));
        let childNames=getContent(src);
        //console.log(childNames);
        for(let i=0;i<childNames.length;i++){
            let childPath=path.join(src,childNames[i]);
            //let cToPrint=path.join(toPrint,path.basename(childPath));
            viewAsTree(childPath,indent + "__");
        }
    }
}
// let src=process.argv[2];
// viewAsTree(src,"");
//viewAsFlatFile(src,path.basename(src))