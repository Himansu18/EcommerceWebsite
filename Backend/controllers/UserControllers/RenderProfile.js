const productModel=require("../../models/productModel")
const userModel=require("../../models/userModel");
const passport = require('passport');
const RenderProfile=async(req,res)=>{
    res.render("UserPages/Profile.ejs");
  };
  module.exports=RenderProfile;