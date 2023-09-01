const mongoose=require("mongoose");
require('dotenv').config()

// const userSchema=mongoose.Schema({

// })

const connection= mongoose.connect(process.env.Mongo_url);

module.exports={connection}