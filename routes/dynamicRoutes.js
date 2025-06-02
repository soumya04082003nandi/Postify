const express=require("express");
const router = express.Router();
const{handleRegisterUser,
    handleLoginUser,
    handleLogoutUser,
    handleProfilePge,
    handlePostCreation,
    handleLikeThePost,
    handleEditThePost, 
    handleUpdateThePost,
    handleDeletePost,
    handleAcount,
    handleSaveProfilepic   }=require("../controllers/dynamicControllers");

//Login checking
const{isLogedin}=require("../services/auth");

//Multer file upload
const {upload}=require("../config/multer")



//registration
router.post("/register",handleRegisterUser);

//login
router.post("/login",handleLoginUser);

//post creation
router.post("/post",isLogedin,handlePostCreation);

//post deletion
router.get("/delete/:id",isLogedin,handleDeletePost);

//like feature
router.get("/like/:id",isLogedin,handleLikeThePost)

//post edit feature
router.get("/edit/:id",isLogedin,handleEditThePost);
router.post("/update/:id",isLogedin,handleUpdateThePost)

//Logout
router.get("/logout",handleLogoutUser);

//Profile page handaling
router.get("/profile",isLogedin,handleProfilePge);

//Acount page handeling (rendering)
router.get("/acount/:id",isLogedin,handleAcount);

//handeling profile pic upload
router.post("/upload",isLogedin,upload.single("profilepic"),handleSaveProfilepic);



module.exports=router;