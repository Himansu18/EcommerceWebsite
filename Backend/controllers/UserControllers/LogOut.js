const productModel=require("../../models/productModel")
const userModel=require("../../models/userModel");
const passport = require('passport');
const LogOut=function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      req.flash("error","Cannot loggedout");
      res.redirect('/api/products');
     }
    req.flash("success","Logged out Successfully");
    res.redirect('/api/products');
  });
}
module.exports=LogOut;