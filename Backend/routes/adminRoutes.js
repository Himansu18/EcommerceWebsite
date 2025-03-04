const express = require('express')
const router = express.Router()
const RenderHomePage=require('../controllers/AdminControllers/RenderHomePage');
const DeleteProduct=require('../controllers/AdminControllers/DeleteProduct');

router.get('/',(req,res)=>{
    res.send("admin page");
})
router.get('/allProducts',RenderHomePage);
router.get('/:id/delete',DeleteProduct);
module.exports=router;