//all requires
const express = require('express')
const app = express()
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const main=require("./config/db")
const path=require('path');
const engine=require("ejs-mate")
const session = require('express-session')

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
const flash = require('connect-flash');


app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly:true,
    expires:Date.now()+1000*60*60*24*3,
    maxAge:1000*60*60*24*3
  }
}));
app.use(flash());
``

app.use((req,res,next)=>{
  res.locals.info=req.flash("info");
  next()
})

app.get('/', (req, res) => {
  req.flash('info',"This is a flash info");
  res.send('Hello World!')
})
app.get("/api/products",async (req,res)=>{
  try{
    let allData=await productModel.find({});
    //console.log(allData)
    req.flash('info',"This is a flash info");
    res.render("ProductPages/HomePage.ejs",{allData});
    }catch(e){
    res.send(e.message)
  }
})
app.get("/api/products/:id",async (req,res)=>{
  try{
    let {id}=req.params;
    let idData=await productModel.findById({_id:id});
    let allData=await productModel.find({});
    res.render("ProductPages/IdPage.ejs",{idData,allData});
    
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
app.get("/api/products/all/allproducts",async (req,res)=>{
  try{
    let allData=await productModel.find({});
    res.render("ProductPages/AllProductPage.ejs",{allData});
    }catch(e){
    res.send(e.message)
  }
})

app.get("/api/user/signin",(req,res)=>{
  res.render("UserPages/SignIn.ejs");
})
app.get("/api/user/login",(req,res)=>{
  res.render("UserPages/LogIn.ejs");
})

app.listen(process.env.PORT, () => {
  console.log(`app listening on port 8080`)
})