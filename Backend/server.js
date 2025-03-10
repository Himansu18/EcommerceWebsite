//all requires
const express = require('express')
const app = express()
const mongoose=require("mongoose");
const dotenv=require("dotenv")
const main=require("./config/db")
const path=require('path');
const engine=require("ejs-mate")
const methodOverride = require('method-override')
const session = require('express-session')
const passport=require('passport')
const LocalStrategy=require('passport-local');
const flash = require('connect-flash');
const IsUserAuthenticate=require('./controllers/IsUserAuthenticate');

const productRoute=require("./routes/productRoutes");
const userRoute=require("./routes/userRoutes");
const adminRoute=require("./routes/adminRoutes");

//config dot env
dotenv.config();

//Models required

const userModel=require("./models/userModel")
const adminModel=require("./models/adminModel");
const productModel = require('./models/productModel');

//db connection
main();

//All Required Middlewares
app.set('view engine','ejs');
app.set('views', 'D:/ECOMMERCE/Backend/views');
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.engine('ejs', engine);
app.use(flash());
app.use(express.urlencoded({ extended: true }));  // To parse form data
app.use(methodOverride('_method'));

//session added
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

//passport autherntication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

//defult middleware
app.use((req,res,next)=>{
  res.locals.info=req.flash("info");
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.user=req.user;
  next()
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Routes
app.use('/api/products',productRoute);
app.use('/api/user',userRoute);
app.use('/api/admin/',adminRoute);



app.listen(process.env.PORT, () => {
  console.log(`app listening on port 8080`)
})