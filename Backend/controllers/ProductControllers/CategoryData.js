const productModel=require("../../models/productModel");
const CategoryData=async (req,res)=>{
  try{
    let {category}=req.params;
    let categoryData=await productModel.find({category:category});
    res.render("ProductPages/CategoryPage.ejs",{categoryData});
    }catch(e){
    res.render(e.message)
  }
};
module.exports=CategoryData;