const express=require("express");
const Userrouter=express.Router();

const {Usermodel}=require("../models/user.model")

Userrouter.post("/signup",(req,res)=>{
    
})



module.exports={Userrouter}