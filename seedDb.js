const mongoose = require("mongoose");
const Users = require("./models/users")



function seed(){
    Users.remove({}, (err, deletedData)=>{
    if(!err){
        console.log(deletedData);
    }else{
        console.log(err)
    }
});
}

module.exports = seed;