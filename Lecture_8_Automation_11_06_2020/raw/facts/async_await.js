let fs=require("fs");
//syntax sugar ES 7
(async function(){
    try{
        console.log("Before");
        let f1KaPromise=fs.readFile("f1.txt");
        let content=await f1KaPromise;
        console.log(""+content);
        console.log("After")
    }
    catch(err){
        console.log("Error occured in async_await.js",err);
    }

})()


//The Above code is similar to the bottom code
let f1KaPromise=fs.readFile("f1.txt");
console.log("Before");
f1KaPromise.then(function(content){
    console.log(""+content);
    console.log("After");
})

f1KaPromise.catch(function(err){
    console.log("Error occured ",err);
})
