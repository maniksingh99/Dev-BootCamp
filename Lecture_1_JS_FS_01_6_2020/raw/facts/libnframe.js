// function lib(data){
//     for(let i=2;i*i<data;i++){
//         if(data%i===0){
//             return false;
//         }
//     }
//     return true;
// }

// console.log("IS number prime?"+lib(21));
// console.log("IS number prime?"+lib(23));

function framework(data,scb,fcb){
    for(let i=2;i*i<=data;i++){
        if(data%i===0){
            return fcb();
        }
        
    }
    return scb();
}
let {exec}=require("child_process");
function fcb(){
    console.log("Number is not prime");
    exec('start chrome').unref();
}

function scb(){
    console.log("Number is prime");
    exec('calc').unref();
}

framework(21,scb,fcb);
framework(23,scb,fcb);