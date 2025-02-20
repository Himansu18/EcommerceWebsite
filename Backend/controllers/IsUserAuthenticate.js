
module.exports=IsUserAuthenticate=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error",("You mustbe logged in"));
        return res.redirect("/api/user/login");
    }
    next();
}
module.exports=IsUserAuthenticate;