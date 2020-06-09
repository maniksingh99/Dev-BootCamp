let fs=require("fs");
let path=require("path");
function checkWhetherFile(src){
    return fs.lstatSync(src).isFile();
}

function getContent(src){
    return fs.readdirSync(src);
}

let unqid=require('uniqid');
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
        obj.isFile=false;
        obj.children=[];
        obj.name=path.basename(src);
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
let src=process.argv[2];
let dest=process.argv[3];
let root={};
untreefy(src,dest,root);
console.log(root);