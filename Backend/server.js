//all requires
const express = require('express')
const app = express()
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const main=require("./config/db")
const path=require('path');
const engine=require("ejs-mate")
const session = require('express-session')
const passport=require('passport')
const LocalStrategy=require('passport-local');

//config dot env
dotenv.config();

//Models required
const productModel=require("./models/productModel")
const userModel=require("./models/userModel")
const adminModel=require("./models/adminModel")

//db connection
main();

//All Middlewares
app.set('view engine','ejs');
app.set('views', 'D:/ECOMMERCE/Backend/views');
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.engine('ejs', engine);
const flash = require('connect-flash');


app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly:true,
    expires:Date.now()+1000*60*60*24*3,
    maxAge:1000*60*60*24*3
  }
}));
app.use(flash());
``
//passport autherntication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


app.use((req,res,next)=>{
  res.locals.info=req.flash("info");
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  next()
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/api/products",async (req,res)=>{
  try{
    let allData=await productModel.find({});
    //console.log(allData)
    //console.log(req.user);
    res.render("ProductPages/HomePage.ejs",{allData});
    }catch(e){
    res.send(e.message)
  }
})
app.get("/api/products/:id",async (req,res)=>{
  try{
    let {id}=req.params;
    let idData=await productModel.findById({_id:id});
    let allData=await productModel.find({});
    res.render("ProductPages/IdPage.ejs",{idData,allData});
    
    }catch(e){
    res.send(e.message)
  }
})
app.get("/api/products/category/:category",async (req,res)=>{
  try{
    let {category}=req.params;
    let categoryData=await productModel.find({category:category});
    res.render("ProductPages/CategoryPage.ejs",{categoryData});
    }catch(e){
    res.render(e.message)
  }
})
app.get("/api/products/all/allproducts",async (req,res)=>{
  try{
    let allData=await productModel.find({});
    res.render("ProductPages/AllProductPage.ejs",{allData});
    }catch(e){
    res.send(e.message)
  }
})

app.get("/api/user/signin",(req,res)=>{
  res.render("UserPages/SignIn.ejs");
})
app.post("/api/user/signin", async (req, res) => {
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

app.get('/api/user/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      req.flash("error","Cannot loggedout");
      res.redirect('/api/products');
     }
    req.flash("success","Logged out Successfully");
    res.redirect('/api/products');
  });
});

app.get("/api/user/login",(req,res)=>{
  res.render("UserPages/LogIn.ejs");
})
app.post('/api/user/login', (req, res, next) => {
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


app.listen(process.env.PORT, () => {
  console.log(`app listening on port 8080`)
})