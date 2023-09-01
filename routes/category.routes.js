const express=require("express");
const categoryrouter=express.Router();
const {Categorymodel}=require("../models/category.model")

//All category
categoryrouter.get("/allcategory",async(req,res)=>{

    try {

        let categories=await Categorymodel.find();
        res.status(201).json({categories:categories,status:"success"});
        
    } catch (error) {
        res.status(401).json({msg:error,status:"error"});
    }
});


// Add category
categoryrouter.post("/addcategory",async(req,res)=>{
    const {Name}=req.body;

    

    try {

        let preavailable=await Categorymodel.findOne({Name});
        if(preavailable){
            res.status(401).json({msg:"category is already available",status:"error"});
        }else{
            const newcategory=new Categorymodel({Name});
            await newcategory.save();
            res.status(201).send({msg:"category added",status:"success"});
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({msg:error,status:"error"});
    }
});

module.exports={categoryrouter}