const productModel=require("../../models/productModel")
const userModel=require("../../models/userModel");
const passport = require('passport');
const SignIn=async (req, res) => {
    try {
      let { email, username, password } = req.body;
      // Check if username already exists
      let existingUser = await userModel.findOne({ username });
      if (existingUser) {
        req.flash("error", "Username already exists. Choose a different one.");
        return res.redirect("/api/user/signin");
      }
      let newUser = new userModel({ email, username });
      let resUser = await userModel.register(newUser, password);
      req.logIn(resUser, (err) => {
        if (err) {
          console.log("Login Error:", err);
          req.flash("error", "Login failed. Try again.");
          return res.redirect("/api/user/signin");
        }
        req.flash("success", "Welcome!");
        return res.redirect("/api/products");
      });
    } catch (e) {
      console.log("Registration Error:", e);
      req.flash("error", e.message);
      res.redirect("/api/user/signin");
    }
  }
  
 
  
  
module.exports=SignIn;