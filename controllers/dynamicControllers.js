const mongoose = require("mongoose");
const userModels = require("../models/users");
const postModels = require("../models/posts")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { post } = require("../routes/dynamicRoutes");



//load env files
dotenv.config();


//Registration
const handleRegisterUser = async (req, res) => {
    try {
        const { name, username, password, email, age } = req.body;

        // Check if user already exists
        const checkUser = await userModels.findOne({ email });
        if (checkUser) {
            return res.status(400).render("register", { user: 1 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new userModels({
            name,
            username,
            password: hashedPassword,
            email,
            age
        });

        await newUser.save();

        const token = jwt.sign({ email: newUser.email, userid: newUser._id }, process.env.SECRET_KEY)
        res.cookie("token", token);
        res.redirect("/profile")
    } catch (err) {
        console.error("Registration Error:", err);
        return res.status(500).send("Server error during registration");
    }
};

//Login feature
const handleLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await userModels.findOne({ email });
        if (!checkUser) {
            return res.render("login",{error:1})
            
        } else {
            bcrypt.compare(password, checkUser.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ email: checkUser.email, userid: checkUser._id }, process.env.SECRET_KEY)
                    res.cookie("token", token);
                    res.status(200).redirect("/profile")
                }
                else {
                    return res.render("login",{error:1})
                }

            })
        }
    } catch (error) {
        res.send("something went wrong");
        setTimeout((req, res) => {
            res.redirect("/login");
        }, 5000);
    }
}


//Handling logout feature
const handleLogoutUser = async (req, res) => {
    res.cookie("token", "");
    res.redirect("/login")
}

//Rendering profile page
const handleProfilePge = async (req, res) => {
    const user = await userModels.findOne({ email: req.user.email }).populate("post");
    const totalPosts = await postModels.find().populate("user")


    res.render("profile", { user, totalPosts })
}



//Post creation feature
const handlePostCreation = async (req, res) => {

    const user = await userModels.findOne({ email: req.user.email });
    const { content } = req.body;
    if (!content) {
        const totalPosts = await postModels.find().populate("user");
        return res.render("profile", { empty: 1, user, totalPosts });
    } else {
        const newPost = new postModels({
            user: user._id,
            content: content,
        })
        await newPost.save();
        user.post.push(newPost._id);
        await user.save();

        res.redirect("/profile")
    }


}

//Post deletion feature
const handleDeletePost=async(req,res)=>{
    const post = await postModels.findOneAndDelete({ _id: req.params.id }).populate("user");
    const user=await userModels.findOne({email:req.user.email})
    console.log(req.params.id);
    
    let index=(user.post.indexOf(req.params.id));
    user.post.splice(index,1);
    await user.save();
    res.redirect("/profile")

    
}

//Post liking feature
const handleLikeThePost = async (req, res) => {
    const post = await postModels.findOne({ _id: req.params.id }).populate("user");


    if (post.likes.indexOf(req.user.userid) === -1) {
        post.likes.push(req.user.userid);

    } else {
        post.likes.splice(post.likes.indexOf(req.user.userid));
    }
    await post.save();
    res.redirect("/profile");

}

// post editing and updating feature
const handleEditThePost = async (req, res) => {
    const post = await postModels.findOne({ _id: req.params.id });

    res.render("edit", { post })

}

const handleUpdateThePost = async (req, res) => {
    const { content } = req.body;    
    if (content=="" || content.trim() === "") {
        const post = await postModels.findOne({ _id: req.params.id });
        return res.render("edit",{empty_content:1,post})
        
    }else{
        const post =await postModels.findOneAndUpdate({_id:req.params.id},{content:content});
        await post.save();
        res.redirect("/profile")

    }
    
}

//acount  page (rendering)
const handleAcount=async(req,res)=>{
    const user = await userModels.findOne({ email: req.user.email }).populate("post");
    res.render("acount",{user})
    
}

//Acount page dp uploading
const handleSaveProfilepic=async(req,res)=>{
    if (req.file.filename ) {
        const user=await userModels.findOneAndUpdate({email:req.user.email},{profilepic:req.file.filename})
        res.redirect("/acount/:id")
    }else{
        return res.render("acount",{emptyFile:1});
    }
    
    
}



module.exports = {
    handleRegisterUser,
    handleLoginUser,
    handleLogoutUser,
    handleProfilePge,
    handlePostCreation,
    handleLikeThePost,
    handleEditThePost,
    handleUpdateThePost,
    handleDeletePost,
    handleAcount,
    handleSaveProfilepic
};
