const express = require('express')
const router = express.Router()

const productModel=require("../models/productModel")

router.get("/",async (req,res)=>{
  try{
    let allData=await productModel.find({});
    //console.log(allData)
    //console.log(req.user);
    res.render("ProductPages/HomePage.ejs",{allData});
    }catch(e){
    res.send(e.message)
  }
})
router.get("/:id",async (req,res)=>{
  try{
    let {id}=req.params;
    let idData=await productModel.findById({_id:id});
    let allData=await productModel.find({});
    res.render("ProductPages/IdPage.ejs",{idData,allData});
    
    }catch(e){
    res.send(e.message)
  }
})
router.get("/category/:category",async (req,res)=>{
  try{
    let {category}=req.params;
    let categoryData=await productModel.find({category:category});
    res.render("ProductPages/CategoryPage.ejs",{categoryData});
    }catch(e){
    res.render(e.message)
  }
})
router.get("/all/allproducts",async (req,res)=>{
  try{
    let allData=await productModel.find({});
    res.render("ProductPages/AllProductPage.ejs",{allData});
    }catch(e){
    res.send(e.message)
  }
})
module.exports = router;