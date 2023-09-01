const express=require("express");
var bodyParser = require('body-parser')
const app=express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//mongodb connection 
const {connection}=require("./config/db")

// base route
app.get("/",(req,res)=>{
    res.status(201).json({msg:"Base api",status:"success"})
})

// authentication middleware
const {authentication}=require("./middlewares/authentication")

//Routes:-

//user routes
const {Userrouter}=require("./routes/User.routes");
app.use("/user",Userrouter);





app.listen(8080,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log({error:"error while connect to DB"})
    }
    console.log("Running on 8080")
})