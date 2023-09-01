const express=require("express");
const cartroute=express.Router();

const {Cartmodel}=require("../models/cart.model");
const {Productmodel}=require("../models/product.model")


// Add to cart

cartroute.post("/addtocart",async(req,res)=>{

    const payload=req.body;

    const productid=payload.productid;
    const userid=payload.userid;
    const quantity=payload.quantity;

    let cart_available=await Cartmodel.findOne({productid,userid});

    if(cart_available){
        res.status(401).json({msg:"already available in cart",status:"error"})

    }else{
        let product=await Productmodel.findOne({_id:productid});
        let price=product?.price

        try {

            if(product){
                let total_price=quantity*price;

                let newcart=new Cartmodel({
                    quantity:quantity,
                    productid:productid,
                    userid:userid,
                    total_price:total_price
                });

                await newcart.save();
                res.status(201).json({msg:"add to cart successfull",status:"success"});
            }else{
                res.status(401).json({msg:"product is not available",status:"error"})
            }
            
        } catch (error) {
            res.status(401).json({msg:error,status:"error"})
        }
    }

})


// get all the cart

cartroute.get("/allcart",async(req,res)=>{

    const payload=req.body;
    const userid=payload.userid;

    try {
       let cart=await Cartmodel.find({userid}).populate("productid");

       res.status(201).json({data:cart,status:"success"})

    } catch (error) {
        res.status(401).json({msg:"error while fetching data",status:"error"})
    }

})


// update the quantity 

cartroute.patch("/update/:id",async(req,res)=>{

    let cartid=req.params.id
    let payload=req.body;
    let quantity=payload.quantity;
    let userid=payload.userid;

    try {

        let itam=await Cartmodel.findOne({_id:cartid,userid});

        if(itam){

            let total_price= (itam.total_price/itam.quantity)*quantity;

            await Cartmodel.findByIdAndUpdate({_id:cartid},{total_price,quantity});

            res.status(201).json({msg:"update sucessfull",status:"sucess"})

        }else{
            res.status(401).json({msg:"invalid operation",status:"error"})
        }
        
    } catch (error) {
        res.status(401).json({msg:"something went wrong",status:"error"})
    }

    
})


// delete the cart

cartroute.delete("/deletecart/:id",async(req,res)=>{

    let cartid=req.params.id
    let userid=req.body.userid

    let itam= await Cartmodel.findOne({_id:cartid,userid});

    try {
        if(itam){

            await Cartmodel.findByIdAndDelete({_id:cartid});

            res.status(201).json({msg:"delete successfull",status:"success"})

        }else{
            res.status(401).json({msg:"invalid opration",status:"error"})
        }
        
    } catch (error) {
        res.status(401).json({msg:"somehing went wrong",status:"error"})
    }

})

// total price


cartroute.get("/totalprice",async(req,res)=>{
    
    const userid=req.body.userid;

    try {
        const products= await Cartmodel.find({userid});

        //console.log(products);
        let tl=0

        products.forEach((el)=>{
            tl+=el.total_price
        })

        //console.log(tl)

        res.status(201).json({total_price:tl,status:"success"})
        
    } catch (error) {
        res.status(401).json({msg:"something is wrong",status:"error"})
    }
})

module.exports={cartroute}