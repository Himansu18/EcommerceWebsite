const productModel=require("../../models/productModel")

const DeleteProduct=async(req,res)=>{
    const {id}=req.params;
    const result=await productModel.findByIdAndDelete(id);
    req.flash("success","Product Deleted");
    res.redirect('/api/admin/allProducts');
}

module.exports=DeleteProduct;