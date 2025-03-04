const express = require('express')
const router = express.Router()
const app=express()
const userModel=require("../models/userModel")
const passport = require('passport');

const IsUserAuthenticate=require("../controllers/IsUserAuthenticate");
const RenderSignIn = require('../controllers/UserControllers/RenderSignIn');
const SignIn = require('../controllers/UserControllers/SignIn');
const LogOut = require('../controllers/UserControllers/LogOut');
const RenderLogIn = require('../controllers/UserControllers/RenderLogIn');
const LogIn = require('../controllers/UserControllers/LogIn');
const RenderProfile = require('../controllers/UserControllers/RenderProfile');
const WishList = require('../controllers/UserControllers/WishList');
const RenderCart = require('../controllers/UserControllers/RenderCart');

router.get("/signin",RenderSignIn);
router.post("/signin", SignIn);
router.get('/logout', LogOut);
router.get("/login",RenderLogIn);
router.post('/login', LogIn);
router.get('/profile',IsUserAuthenticate,RenderProfile);
router.get('/wishlist',IsUserAuthenticate,WishList);
router.get('/cart',IsUserAuthenticate,RenderCart);
router.get('/order',(req,res)=>{
    console.log(req.body);
    res.send("GetIT")
})
module.exports = router;
  