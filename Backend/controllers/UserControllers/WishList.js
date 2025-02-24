const productModel=require("../../models/productModel")
const userModel=require("../../models/userModel");
const passport = require('passport');
const WishList=async(req,res)=>{
    let userId=req.user.id;
    let userr=await userModel.findOne({_id:userId}).populate('wishlist');
    const wishListProducts=userr.wishlist;
    res.render("UserPages/WishList.ejs",{wishListProducts});
  };
  module.exports=WishList;