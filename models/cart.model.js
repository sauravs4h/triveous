const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    total_price:{
        type:Number,
        require:true
    }
});

const Cartmodel=mongoose.model("cart",cartSchema);

module.exports={Cartmodel}