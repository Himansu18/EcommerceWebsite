const productModel=require("../../models/productModel")
const AddNewProduct=async(req,res)=>{
    try{
        const newProduct=req.body.NewProduct;
    await productModel.insertOne(newProduct);
    
    }catch(e){
        console.log(e.message);
    }
    req.flash("success","Added Succesfully");
    res.redirect('/api/admin/allproducts');
}
module.exports=AddNewProduct;