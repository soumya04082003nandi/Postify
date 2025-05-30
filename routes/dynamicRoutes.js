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
    handleProfileInfo   }=require("../controllers/dynamicControllers");
const{isLogedin}=require("../services/auth");



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

//profile-info page handeling
router.get("/profile-info/:id",isLogedin,handleProfileInfo)



module.exports=router;