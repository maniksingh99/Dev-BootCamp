let fs=require("fs");
console.log("Before");

let readFilePromise=fs.promises.readFile("f1.txt");
readFilePromise.then(function(data){
    console.log("inside then");
    console.log("Content "+data);
})

readFilePromise.catch(function(err){
    console.log("Inside catch");
    console.log("The error is "+err);
})

console.log("After");