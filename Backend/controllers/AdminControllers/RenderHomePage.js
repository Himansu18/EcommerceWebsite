const productModel=require("../../models/productModel")
const AllProductHome= async (req,res)=>{
  try{
    let allData=await productModel.find({});
    res.render("AdminPages/AdminHome.ejs",{allData});
    }catch(e){
    res.send(e.message)
  }
}
module.exports=AllProductHome;