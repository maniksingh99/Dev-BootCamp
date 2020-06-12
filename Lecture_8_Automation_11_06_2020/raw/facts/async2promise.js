let fs=require("fs");
//polyfill
//abstraction
function fsprf(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,function(err,content){
            if(err){
                console.log("Error while reading file");
                reject(err);
            }
            else{
                //console.log("Content "+content);
                resolve(content);
            }
        })
    })
}
//a async fs.readfile
//1.return promise
//2.doesn't require cb

let readFilePromise=fsprf("f1.txt");
//user
readFilePromise.then(function(data){
    console.log("inside then ");
    console.log("content "+data);
})
readFilePromise.catch(function(err){
    console.log("Inside catch");
    console.log("Error "+err);
})
