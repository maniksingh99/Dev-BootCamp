const userModel = require("../model/userModel");
const userFollowerModel = require("../model/user_followerModel");



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
//send request
const createRequest = async(req,res)=>{
    try{
        let uid = req.body.user_id;
        let follower_id = req.body.follower_id;
        await userFollowerModel.addPendingFollower(req.body);
        let {is_public} = await userModel.getById(uid);
        if(is_public == true){
            await userFollowerModel.acceptRequest(uid,follower_id);
            return res.status(201).json({
                status:"success",
                "message":"request accepted"
            })
        }
        res.status(201).json({
            status:"pending",
            "message":"request is send user will accept it"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"error",
            "message":err.message
        })
    }
}

//get all followers
const getAllFollowers=async(req,res)=>{
    try{
        let result = await userFollowerModel.getAllFollowers(req.params.id);
        res.status(201).json({
            status:"success",
            "message":result
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"error",
            "message":err.message
        })
    }
}

const getCountOfAllFollowers = async(req,res)=>{
    try{
        let result = await userFollowerModel.getCountFollowers(req.params.id);
        res.status(201).json({
            status:"success",
            "message":result
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:"error",
            "message":err.message
        })
    }
}


module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.checkBody = checkBody;
module.exports.createRequest = createRequest;
module.exports.getAllFollowers = getAllFollowers;
module.exports.getCountOfAllFollowers = getCountOfAllFollowers;