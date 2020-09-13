const express = require('express');
// const fs = require("fs");
// const path = require("path");
const userRouter = require("./routes/userRouter");
const app = express();

app.use(function before(req,res,next){
    console.log("I will run before express.json");
    // console.log(req.body);
    next();
})

app.use(express.json());

// app.use(function checkBody(req,res,next){
//     console.log("I will run after express.json");
//     let keysArray = Object.keys(req.body);
//     if(keysArray.length == 0){
//         res.status.json({
//             "status":"failure",
//             "message":"Body Could not be empty"
//         })
//     }
//     else{
//         next();
//     }
// })

app.use("/api/v1/user",userRouter);

app.use("*",(req,res)=>{
    res.status(404).json({
        "status":"failure",
        "message":"resource not found"
    })
})

app.listen(3000,()=>{
    console.log("Server started at port 3000");
})

