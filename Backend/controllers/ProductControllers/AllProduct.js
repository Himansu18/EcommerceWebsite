const productModel=require("../../models/productModel")
const AllProduct=async (req,res)=>{
    try{
      let allData=await productModel.find({});
      res.render("ProductPages/AllProductPage.ejs",{allData});
      }catch(e){
      res.send(e.message)
    }
}
module.exports=AllProduct;