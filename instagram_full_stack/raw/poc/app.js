const express = require('express');
var users = require('./db/user.json');
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.json());

app.post("/user",function(req,res){
    let user = req.body;
    user.uid = uuidv4();
    console.log(user);
    users.push(user);

    fs.writeFileSync(path.join(__dirname,"./db/user.json"),JSON.stringify(users));

    res.status(201).json({
        status:"success",
        user:req.body
    })
})

app.get("/user/getall",(req,res)=>{
    res.status(201).json({
        status:"success",
        userArr:users
    })
})


app.get("/user/:uid",(req,res)=>{
    let cuid = req.params.uid;
    let userArr = users.filter((user)=>{
        return user.uid == cuid
    })
    console.log(req.params);
    res.status(201).json({
        status:"success",
        user:userArr.length == 0 ? "no user" : userArr[0]
    })
})

app.delete("/user/:uid",(req,res)=>{
    let cuid = req.params.uid;
    users = users.filter((user)=>{
        return user.uid != cuid
    })
    fs.writeFileSync(path.join(__dirname,"./db/user.json"),JSON.stringify(users));
    res.status(201).json({
        status:"Deleted Successfully",
        user:users
    })
})

app.patch("/user/:uid",(req,res)=>{
    let cuid = req.params.uid;
    let toBeUpdated = req.body;
    let userArr = users.filter((user)=>{
        return user.uid == cuid
    })
    let user = userArr[0];
    for(let key in toBeUpdated){
        console.log(key);
        user[key] = toBeUpdated[key];
    }
    // for(let i = 0; i < users.length;i++){
    //     if(users[i].uid == cuid){
    //         users[i] = req.body;
    //         users[i].uid = cuid;
    //     }
    // }
    // users = users.filter((user)=>{
    //     if(user.uid == cuid){
    //         user = req.body;
    //     }
    // })
    fs.writeFileSync(path.join(__dirname,"./db/user.json"),JSON.stringify(users));
    res.status(201).json({
        status:"Updated successfully",
        user:user
    })
})



app.listen(3000,()=>{
    console.log("Server started at port 3000");
})