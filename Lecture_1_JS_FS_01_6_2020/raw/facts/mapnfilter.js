// var arr=[3,6,14,16,22];

// arr.map((ele)=>{
//     if(ele%2==0){
//         ele++;
//         console.log(ele);
//     }
//     else{
//         ele--;
//         console.log(ele);
//     }
// })
// console.log(arr);

// var res=arr.filter((ele)=>{
//     for(let i=2;i*i<=ele;i++){
//         if(ele%i==0){
//             return false;
//         }
//     }
//     return true;
// })
// console.log(res);
var arrMap=[];
function myMap(arr,transformer){
    for(let i=0;i<arr.length;i++){
       arrMap[i]=transformer(arr[i])
    }
    console.log(arrMap);
}



function transformer(x){
    if(x%2==0){
        return ++x;
    }
    else{
        return --x;
    }
}
// let res=[];
// function myFilter(arr,test){
//     for(let i=0;i<arr.length;i++){
        
//     }
// }

// function test(ele){
//     for(let i=2;i*i<=ele;i++){
//         if(ele%i==0){

//         }
//     }
// }

let arr=[3,6,14,16,22];
myMap(arr,transformer);