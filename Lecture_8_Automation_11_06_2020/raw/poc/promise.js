let fs=require("fs");

console.log("Before");

function fsprf(path){

    return new Promise(
        function(resolve,reject){
            fs.readFile(path,function(err,content){
                if(err){
                    reject(err);
                }
                else{
                    console.log("The content is being print in else block of function"+content);
                    resolve(content);
                }
            })
        }
    )
}

let f1KaPromise=fsprf("f1.txt");
console.log(f1KaPromise);
let thenKaPromise=f1KaPromise.then(function(content){
    console.log("scb has ran");
    console.log("The data of file is"+content);
    return 1000;
})

f1KaPromise.catch(function(err){
    console.log("Inside catch block ");
    console.log(err);
})

console.log(thenKaPromise);
console.log(".......................");
setTimeout(function(){
    console.log('````````````````');
    console.log(thenKaPromise);
},2000);