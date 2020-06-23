let files=["f1.txt","f2.txt","f3.txt"];

let fs=require("fs");
for(let i=0;i<files.length;i++){
    let f1KaPromise=fs.promises.readFile(files[i]);
    f1KaPromise.then(function(data){
        console.log(""+data);
    })
}