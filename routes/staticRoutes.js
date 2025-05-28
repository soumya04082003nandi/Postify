const express=require("express");
const router = express.Router();
const {handleStaticPage,handleStaticLoginPage}=require("../controllers/staticControllers")


router.get("/", handleStaticPage);
router.get("/login",handleStaticLoginPage);


module.exports=router;