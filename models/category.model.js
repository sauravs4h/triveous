const mongoose=require("mongoose");

const categorySchema=mongoose.Schema({
    Name:{
        type:String,
        required: true,
    }
})

const Categorymodel=mongoose.model("category",categorySchema);

module.exports={Categorymodel}