const connection = require("../model/connection");
const { v4: uuidv4 } = require('uuid');

//command for sql to create a user
let create = (userObj)=>{
    userObj.uid = uuidv4();
    return new Promise(function(resolve,reject){
        connection.query("INSERT INTO user SET ?",userObj,function(err,res){
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        })
    })
}

//command to update the things in sql
let update = (uid,toUpdateObj)=>{
    let updateString = '';
    for(let attr in toUpdateObj){
        updateString += `${attr}="${toUpdateObj[attr]}",`;
    }
    updateString = updateString.substring(0,updateString.length-1);
    console.log(updateString);
    return new Promise(function(resolve,reject){
        connection.query(`UPDATE user SET ${updateString} WHERE uid="${uid}"`,function(err,result){
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}

//command to delete a user
let deleteById =(uid)=>{
    return new Promise(function(resolve,reject){
        connection.query(`DELETE from user WHERE uid="${uid}"`,function(err,result){
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
}


//command to fetch a particular user
let getById = (uid)=>{
    return new Promise(function(resolve,reject){
        connection.query(`SELECT * FROM user WHERE uid="${uid}"`,function(err,result){
            if(err){
                reject(err);
            }
            else{
                resolve(result[0]);
            }
        })
    })
}

module.exports.create = create;
module.exports.update = update;
module.exports.deleteById = deleteById;
module.exports.getById = getById;