

const handleStaticPage= async(req,res)=>{
    return res.render("register");
}

const handleStaticLoginPage=async(req,res)=>{
    return res.render("login");
}


module.exports={
    handleStaticPage,
    handleStaticLoginPage,
}