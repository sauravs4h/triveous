const express=require("express");
const productrouter=express.Router();
const {Productmodel}=require("../models/product.model");

productrouter.get("/getallproduct",async(req,res)=>{

    try {
        const allproducts= await Productmodel.find();
        res.status(201).json({products:allproducts,status:"success"});
    } catch (error) {
        res.status(401).json({msg:error.msg,status:"error"});
        
    }
});

productrouter.get("/getproductbyid/:productid",async(req,res)=>{

    const productid=req.params.productid

    try {
        let product=await Productmodel.findOne({_id:productid});
        res.status(201).json({product:product,status:"success"});   
    } catch (error) {
        res.status(401).json({msg:error.msg,status:"error"});
    }
})

productrouter.post("/addproduct",async(req,res)=>{

    const payload=req.body;

    try {
       const newproduct=new Productmodel(payload);
       await newproduct.save();
       res.status(201).json({msg:"product is added",status:"success"});
    } catch (error) {
        res.status(401).json({msg:error.msg,status:"error"});
        
    }
})

module.exports={productrouter};


