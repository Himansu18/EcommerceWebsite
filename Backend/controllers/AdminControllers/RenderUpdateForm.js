const productModel=require("../../models/productModel")
const RenderUpdateForm=async(req,res)=>{
    const {id}=req.params;
    const productData=await productModel.findById(id);
    res.render('AdminPages/UpdateForm',{productData,id});
};
module.exports=RenderUpdateForm;