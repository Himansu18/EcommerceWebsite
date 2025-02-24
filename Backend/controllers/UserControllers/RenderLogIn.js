const productModel=require("../../models/productModel")
const userModel=require("../../models/userModel");
const passport = require('passport');
const RenderLogIn=(req,res)=>{
      res.render("UserPages/LogIn.ejs");
};
module.exports=RenderLogIn;