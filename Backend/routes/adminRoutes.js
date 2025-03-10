const express = require('express')
const router = express.Router()
const RenderHomePage=require('../controllers/AdminControllers/RenderHomePage');
const DeleteProduct=require('../controllers/AdminControllers/DeleteProduct');
const RenderUpdateForm=require('../controllers/AdminControllers/RenderUpdateForm');
const UpdateProduct=require('../controllers/AdminControllers/UpdateProduct');
const RenderNewForm=require('../controllers/AdminControllers/RenderNewForm');
const AddNewProduct=require('../controllers/AdminControllers/AddNewProduct');
router.get('/',(req,res)=>{
    res.send("admin page");
})
router.get('/allProducts',RenderHomePage);
router.get('/:id/delete',DeleteProduct);
router.get('/:id/update',RenderUpdateForm);
router.put('/:id/update',UpdateProduct);
router.get('/newProduct',RenderNewForm);
router.post('/newProduct',AddNewProduct);
module.exports=router;
