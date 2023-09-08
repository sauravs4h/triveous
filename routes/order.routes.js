const express=require("express");
const orderrouter=express.Router();

const {Ordermodel}=require("../models/order.model");
const {Cartmodel}=require("../models/cart.model");
const  { ShipmentModel }=require("../models/shipment.model")



// genrate traking number

function generateTrackingNumber() {
    const prefix = "SH"; 
    const randomDigits = Math.floor(Math.random() * 10000); 

   
    const paddedNumber = String(randomDigits).padStart(4, "0");

    
    const trackingNumber = `${prefix}${paddedNumber}`;

    return trackingNumber;
}



// place the order

orderrouter.post("/placeorder",async(req,res)=>{

    const payload = req.body;
    const userid = payload.userid;
    const shippingAddress = payload.shippingAddress; 

   

    try {

        let products=await Cartmodel.find({userid})

        for (const el of products){

            let {quantity,total_price,productid,userid}=el;

            let orderitam= new Ordermodel({
                quantity,
                total_price,
                productid,
                userid,
                orderstatus:"Placed"
            })

            await orderitam.save();

            let shipment = new ShipmentModel({
                order: orderitam._id,
                trackingNumber: generateTrackingNumber(), 
                shippingStatus: "Processing",
                shippingAddress: shippingAddress
            });

            await shipment.save();
        }

        await Cartmodel.deleteMany({userid});

        res.status(201).json({msg:"order successfull ",status:"success"})
        
    } catch (error) {
        console.log(error)
        res.status(401).json({msg:"order unsuccessfull ",status:"error"})
    }

})

//for shipment 



// Add a new route to retrieve shipments
orderrouter.get("/shipments", async (req, res) => {
    const {orderid}=req.body;
    try {
        const shipments = await ShipmentModel.find({order:orderid})
            .populate("order") 
            .exec();

        res.status(200).json({ data: shipments, status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Failed to retrieve shipments", status: "error" });
    }
});


//All orders (order history)

orderrouter.get("/allorders",async(req,res)=>{

    let userid=req.body.userid
    try {
        let products=await Ordermodel.find({userid}).populate("productid")

        res.status(201).json({data:products,status:"success"})
        
    } catch (error) {
        console.log(error)
        res.status(401).json({msg:"something went wrong",status:"error"})
    }
})

// Get specific order by id

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

// delete the order
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