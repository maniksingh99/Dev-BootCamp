let fs=require("fs");
let path=require("path");
let unqid=require('uniqid');
module.exports.untreefyFn=function(){
    let src=arguments[0];
    let dest=arguments[1];
    let root={};
    untreefy(src,dest,root);
    //console.log(root);
    fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root));
}

function checkWhetherFile(src){
    //fs command to check whether it is a file or not
    return fs.lstatSync(src).isFile();
}

function getContent(src){
    return fs.readdirSync(src);
}


function untreefy(src,dest,obj){
    if(checkWhetherFile(src)==true){
        let oldname=path.basename(src);
        let newName=unqid();
        obj.newName=newName;
        obj.oldName=oldname;
        obj.isFile=true;
        let destPath=path.join(dest,newName);
        fs.copyFileSync(src,destPath);
        console.log(`File ${oldname} from src copied to ${destPath}`);
        //console.log(+" *");
    }else{
        //console.log(toPrint);
        obj.name=path.basename(src);
        obj.isFile=false;
        obj.children=[];
        let childNames=getContent(src);
        //console.log(childNames);
        for(let i=0;i<childNames.length;i++){
            let childPath=path.join(src,childNames[i]);
            //let cToPrint=path.join(toPrint,path.basename(childPath));
            let cobj={};
            untreefy(childPath,dest,cobj);
            obj.children.push(cobj);
        }
    }
}
// let src=process.argv[2];
// let dest=process.argv[3];
// let root={};
// untreefy(src,dest,root);
// console.log(root);