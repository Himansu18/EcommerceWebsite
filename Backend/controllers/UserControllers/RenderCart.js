const userModel=require("../../models/userModel");
const RenderCart=async(req,res)=>{
    let userId=req.user.id;
    let userr=await userModel.findOne({_id:userId}).populate('cart');
    const cartProducts=userr.cart;
    res.render('UserPages/Cart.ejs',{cartProducts});
}
module.exports=RenderCart;