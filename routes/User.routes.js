const express=require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Userrouter=express.Router();

const {Usermodel}=require("../models/user.model")


// Signup 

Userrouter.post("/signup",async(req,res)=>{
    
    const Payload=req.body;
    const Email=Payload.Email;
    const Password=Payload.Password

    const user_available=await Usermodel.findOne({Email:Email});

    if(user_available){
        res.status(401).json({msg:"User is already available",status:"error"});
    }else{

        bcrypt.hash(Password, 5, async function(err, hash) {
            if(err){
                res.status(401).json({msg:"something went wrong",status:"error"});
            }else{
                Payload.Password=hash;
                const user= new Usermodel(Payload);
                await user.save();

                res.status(201).json({msg:"signup successfull",status:"success"});
            }
        });
    }

})

//Login

Userrouter.post("/login",async(req,res)=>{

    const Payload=req.body;
    const Email=Payload.Email;
    const Password=Payload.Password;

    const user_available= await Usermodel.findOne({Email});
    const hashpassword=user_available?.Password;
    const userid=user_available?._id

    if(user_available){

        
        bcrypt.compare(Password, hashpassword, function(err, result) {
            if(result){
                var token = jwt.sign({ userid: userid}, 'hush');

                res.status(201).json({msg:"Login Successfull ", token:token,status:"success"});

            }else{
                res.status(401).json({msg:"Wrong craditionals",status:"error"})
            }
        });
    }else{
        res.status(401).json({msg:"Please Signup First",status:"error"});
    }
    
})



module.exports={Userrouter}