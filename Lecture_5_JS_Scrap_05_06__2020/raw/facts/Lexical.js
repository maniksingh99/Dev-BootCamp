let myVar=20;

// function c(){
//     console.log(myVar);
// }


function b(){
    let myVar=2;
    function c(){
        console.log(myVar);
    }
    c();
    console.log(myVar);
    
}

function a(){
    let myVar=1;
    console.log(myVar);
    b();
}

a();

