const productModel=require("../../models/productModel")
const userModel=require("../../models/userModel");
const passport = require('passport');
const LogIn=(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log("Login Error:", err);
        req.flash("error", "Login failed.");
        return res.redirect('/api/user/login');
      }
      if (!user) {
        console.log("Login Failed:", info);
        req.flash("error", "Invalid username or password.");
        return res.redirect('/api/user/login');
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log("Session Error:", err);
          req.flash("error", "Session creation failed.");
          return res.redirect('/api/user/login');
        }
        
        req.flash("success", "Welcome back!");
        return res.redirect("/api/products");
      });
    })(req, res, next);
};
module.exports=LogIn;