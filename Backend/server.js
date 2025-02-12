//all requires
const express = require('express')
const app = express()
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const main=require("./config/db")
const path=require('path');
const engine=require("ejs-mate")
//config dot env
dotenv.config();

//Models required
const productModel=require("./models/productModel")
const userModel=require("./models/userModel")
const adminModel=require("./models/adminModel")

//db connection
main();

//All Middlewares
app.set('view engine','ejs');
app.set('views', 'D:/ECOMMERCE/Backend/views');
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.engine('ejs', engine);




app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/api/products",async (req,res)=>{
  try{
    let allData=await productModel.find({});
    //console.log(allData)
    res.render("ProductPages/HomePage.ejs",{allData});
    }catch(e){
    res.send(e.message)
  }
})
app.get("/api/products/:id",async (req,res)=>{
  try{
    let {id}=req.params;
    let idData=await productModel.findById({_id:id});
    res.render("ProductPages/IdPage.ejs",{idData});
    }catch(e){
    res.send(e.message)
  }
})
app.get("/api/products/category/:category",async (req,res)=>{
  try{
    let {category}=req.params;
    let categoryData=await productModel.find({category:category});
    res.render("ProductPages/CategoryPage.ejs",{categoryData});
    }catch(e){
    res.render(e.message)
  }
})

app.listen(process.env.PORT, () => {
  console.log(`app listening on port 8080`)
})