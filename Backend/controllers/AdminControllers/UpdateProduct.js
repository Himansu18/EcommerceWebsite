const productModel=require("../../models/productModel")
const UpdateProduct=async(req,res)=>{
    const {id}=req.params;
    UpdateProductInfo=req.body.UpdateProduct;
    const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        UpdateProductInfo,
        { new: true } 
    );
    req.flash("success","Updated succesfully");
    res.redirect('/api/admin/allproducts');
}
module.exports=UpdateProduct;