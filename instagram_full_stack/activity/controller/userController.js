const userModel = require("../model/userModel");




//add a particular user in db
const createUser = async (req,res)=>{
    let user = req.body;
    console.log("consoling the user in create function in controller",user);
    try{
        let newDbUser = await userModel.create(user);
        res.status(201).json({
            status:"success",
            user:newDbUser
        })
    }
    catch(err){
        res.status(500).json({
            status:"success",
            message:err.message
        })
    }
}

//to get a particular user
const getUser = async (req,res)=>{
    let cUid = req.params.uid;
    try{
        let user = await userModel.getById(cUid);
        res.status(201).json({
            status:"success",
            user:user
        })
    }
    catch(err){
        res.status(201).json({
            status:"failure",
            user:err.message
        })
    }
}

//to get all users
const getAllUser = (req,res)=>{
    res.status(201).json({
        status:"success"
        
    })
}

//to delete a particular user
const deleteUser = async(req,res)=>{
    let cUid = req.params.uid;
    try{
        let result = await userModel.deleteById(cUid);
        res.status(200).json({
            status:"success",
            result:result
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"failure",
            "message":err.message
        })
    }
}

//to update the data of a particular user
const updateUser = async (req,res)=>{
    let uid = req.params.uid;
    let toBeUpdateObj = req.body;
    try{
        let result = await userModel.update(uid,toBeUpdateObj);
        res.status(200).json({
            status:"success",
            "message":result
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"failure",
            "message":err.message
        })
    }
}


// a function to check whether the body is empty or not for update and createuser request
const checkBody = (req,res,next)=>{
    console.log("I will run after express.json");
    let keysArray = Object.keys(req.body);
    if(keysArray.length == 0){
        res.status(200).json({
            "status":"failure",
            "message":"Body could not be empty"
        })
    }
    else{
        next();
    }
}


//**************************** request to follow **********************



module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.checkBody = checkBody;