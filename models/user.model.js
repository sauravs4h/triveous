
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({

    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    }


})

const Usermodel=mongoose.model("user",userSchema);


module.exports={Usermodel}