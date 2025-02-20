const express = require('express')
const router = express.Router()

const productModel=require("../models/productModel")
const AllProduct = require('../controllers/ProductControllers/AllProduct')
const IdData = require('../controllers/ProductControllers/IdData')
const CategoryData = require('../controllers/ProductControllers/CategoryData')
const AllProductHome = require('../controllers/ProductControllers/AllProductHome')


router.get("/",AllProductHome)
router.get("/:id",IdData)
router.get("/category/:category",CategoryData);
router.get("/all/allproducts",AllProduct)
module.exports = router;