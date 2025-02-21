const productModel=require("../../models/productModel")
const userModel=require("../../models/userModel");
const AddToWishlist=async(req,res)=>{
    try{
    let {id}=req.params;
    let product=await productModel.findById(id);
    let userId=req.user.id;
    let user=await userModel.findById(userId);
    let result=await user.wishlist.push(product);
    user.save();
    req.flash("success","Added to wishlist");
    res.redirect('/api/products');
    }catch(e){
      res.send(e.message);
    }
};
module.exports=AddToWishlist;
