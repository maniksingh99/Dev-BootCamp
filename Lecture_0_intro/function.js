// function message(mess){
//     console.log(mess);
// }
// message("manik");
// //console.log(message());
// let a=[1,2,3,4];
// let b=a;
// console.log(b);
// let fnkaRef=function greeter(){
//     console.log("Hello yo");
//     return 20;
// }

// console.log(fnkaRef);
// console.log(fnkaRef());

function greeter(param){
    console.log("inside greeter function");
    param();
}
//greeter(10);
greeter(function innerfn(){
    console.log("Iam passed as a parameter");
    let a=10;
    console.log(++a);
})