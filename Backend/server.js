//all requires
const express = require('express')
const app = express()
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const main=require("./config/db")

//config dot env
dotenv.config();

//Models required
const productModel=require("./models/productModel")
const userModel=require("./models/userModel")
const adminModel=require("./models/adminModel")

//db connection
main();


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/api/products",async (req,res)=>{
  try{
    let allData=await productModel.find({});
    res.send(allData);
    }catch(e){
    res.send(e.message)
  }
})
app.get("/api/products/:id",async (req,res)=>{
  try{
    let {id}=req.params;
    let data=await productModel.findById({_id:id});
    res.send(data);
    }catch(e){
    res.send(e.message)
  }
})
app.get("/api/products/category/:category",async (req,res)=>{
  try{
    let {category}=req.params;
    let categorydata=await productModel.find({category:category});
    res.send(categorydata);
    }catch(e){
    res.send(e.message)
  }
})

app.listen(process.env.PORT, () => {
  console.log(`app listening on port 8080`)
})