const express = require('express')
const router = express.Router()

const productModel=require("../models/productModel")
const AllProduct = require('../controllers/ProductControllers/AllProduct')
const IdData = require('../controllers/ProductControllers/IdData')
const CategoryData = require('../controllers/ProductControllers/CategoryData')
const AllProductHome = require('../controllers/ProductControllers/AllProductHome')
const IsUserAuthenticate = require('../controllers/IsUserAuthenticate')
const AddToCart = require('../controllers/ProductControllers/AddToCart')
const AddTOWishlist=require('../controllers/ProductControllers/AddToWishlist');

router.get("/",AllProductHome);
router.get("/:id",IdData);
router.get("/category/:category",CategoryData);
router.get("/all/allproducts",AllProduct);
router.post('/:id/cart',IsUserAuthenticate,AddToCart);
router.post('/:id/wishlist',IsUserAuthenticate,AddTOWishlist);
module.exports = router;