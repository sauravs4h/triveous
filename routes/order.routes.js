const express=require("express");
const orderrouter=express.Router();

const {Ordermodel}=require("../models/order.model");
const {Cartmodel}=require("../models/cart.model");

// place the order

orderrouter.post("/placeorder",async(req,res)=>{

    const payload=req.body;
    const userid=payload.userid;
   

    try {

        let products=await Cartmodel.find({userid})

        products.forEach(async(el)=>{

            let {quantity,total_price,productid,userid}=el;

            let orderitam= new Ordermodel({
                quantity,
                total_price,
                productid,
                userid,
                orderstatus:"Placed"
            })

            await orderitam.save();
        })

        await Cartmodel.deleteMany({userid});

        res.status(201).json({msg:"order successfull ",status:"success"})
        
    } catch (error) {
        console.log(error)
        res.status(401).json({msg:"order unsuccessfull ",status:"error"})
    }

})

//All orders (order history)

orderrouter.get("/allorders",async(req,res)=>{

    let userid=req.body.userid
    try {
        let products=await Ordermodel.find({userid}).populate("productID")

        res.status(201).json({data:products,status:"success"})
        
    } catch (error) {
        res.status(401).json({msg:"something went wrong",status:"error"})
    }
})


orderrouter.get("/product/:id",async(req,res)=>{

    let orderid=req.params.id

    try {
        let product=await Ordermodel.findOne({_id:orderid});
        if(product){
             res.status(201).json({data:product,status:"success"});
        }else{
             res.status(401).json({msg:"product is not available",status:"success"});
        }
        
    } catch (error) {
        res.status(401).json({msg:"something went wrong",status:"error"})
        
    }
})


orderrouter.delete("/deleteorder/:id",async(req,res)=>{

    let orderid=req.params.id

    let order=await Ordermodel.findOne({_id:orderid});

    if(order){

        try {
            await Ordermodel.findByIdAndDelete({_id:orderid})
            res.status(201).json({msg:"order delete successfull",status:"success"});
        } catch (error) {
            res.status(401).json({msg:"something went wrong",status:"error"})   
        }

    }else{
        res.status(401).json({"msg":"invalid request",status:"error"})
    }

})


module.exports={orderrouter}