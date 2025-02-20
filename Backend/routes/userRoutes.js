const express = require('express')
const router = express.Router()
const app=express()
const userModel=require("../models/userModel")
const passport = require('passport');



router.get("/signin",(req,res)=>{
    res.render("UserPages/SignIn.ejs");
  })
  router.post("/signin", async (req, res) => {
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
  });
  
  router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
        req.flash("error","Cannot loggedout");
        res.redirect('/api/products');
       }
      req.flash("success","Logged out Successfully");
      res.redirect('/api/products');
    });
  });
  
  router.get("/login",(req,res)=>{
    res.render("UserPages/LogIn.ejs");
  })
  router.post('/login', (req, res, next) => {
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
  });
  router.post('/api/:id/cart',IsUserAuthenticate,async(req,res)=>{
    try{
    let {id}=req.params;
    let product=await productModel.findById(id);
    let userId=req.user.id;
    let user=await userModel.findById(userId);
    let result=await user.cart.push(product);
    user.save();
    req.flash("success","Added to cart");
    res.redirect('/api/products');
    }catch(e){
      res.send(e.message);
    }
  })

module.exports = router;
  