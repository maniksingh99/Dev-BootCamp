const express = require("express");
const userRouter = new express.Router();

const {createUser,getUser,updateUser,deleteUser,checkBody} = require("../controller/userController");
// ,createRequest,getAllFollowers
//user add delete update get
userRouter.route("/").post(checkBody,createUser);
userRouter.route("/:uid").get(getUser).patch(checkBody,updateUser).delete(deleteUser);

//user request add, delete ,get
// userRouter.route("/request").post(createRequest);
// userRouter.route("/request/:id").get(getAllFollowers);

module.exports = userRouter;