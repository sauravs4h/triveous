const express=require("express");
var bodyParser = require('body-parser')
const app=express();

//cors
var cors = require('cors')
app.use(cors())

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

//user routes (Not Authenticate Route)
const {Userrouter}=require("./routes/User.routes");
app.use("/user",Userrouter);

// category routes (Not Authenticate Route)
const {categoryrouter}=require("./routes/category.routes");
app.use("/category",categoryrouter);

// product routes (Authenticate Route)
const {productrouter}=require("./routes/product.routes");
app.use("/product",authentication,productrouter);

//cart routes (Authenticate Route)
const {cartroute}=require("./routes/cart.routes");
app.use("/cart",authentication,cartroute);

//order routes (Authenticate Route)
const {orderrouter}=require("./routes/order.routes");
app.use("/order",authentication,orderrouter)


app.listen(8080,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log({error:"error while connect to DB"})
    }
    console.log("Running on 8080")
})