const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    availability:{
        type:Number,
        require:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        require:true
    }
});


const Productmodel=mongoose.model("product",productSchema);

module.exports={Productmodel}