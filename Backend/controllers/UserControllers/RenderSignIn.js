const productModel=require("../../models/productModel")
const userModel=require("../../models/userModel");
const passport = require('passport');
const RenderSignIn=(req,res)=>{
    res.render("UserPages/SignIn.ejs");
};
module.exports=RenderSignIn;