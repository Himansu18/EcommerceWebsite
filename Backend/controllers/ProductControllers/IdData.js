const productModel=require("../../models/productModel")
const IdData=async (req,res)=>{
  try{
    let {id}=req.params;
    let idData=await productModel.findById({_id:id});
    let allData=await productModel.find({});
    res.render("ProductPages/IdPage.ejs",{idData,allData});
    
    }catch(e){
    res.send(e.message)
  }
}
module.exports=IdData;