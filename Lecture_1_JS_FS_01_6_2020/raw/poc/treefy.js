let fs=require("fs");
let path=require("path");
//let unqid=require('uniqid');
 let root=require('../xyz/metadata.json');
// let rawData=fs.readFileSync("metadata.json");
// let root=JSON.parse(rawData);
console.log(root);




function treefy(src,dest,childPath){
    if(src.isFile==true){
        
        let srcPath=path.join(dest,src.newName);
        fs.copyFileSync(srcPath,childPath);

    }else{
        fs.mkdirSync(childPath);
        let arr=src.children;
        
        console.log(arr);
        for(let i=0;i<arr.length;i++){
            let childPath=path.join(src.name,arr[i].name);
            treefy(arr[i],dest,childPath);
        }
    }
}
 let dest=process.argv[2];
treefy(src,dest,root);
// console.log(root);