const express=require("express");
const app=express();
//routes files
const staticRouter=require("./routes/staticRoutes");
const dynamicRoutes=require("./routes/dynamicRoutes")
//database files
const {conectDB}=require("./config/db")

//others
const cookieParser=require("cookie-parser");
const path=require("path")
const dotenv=require("dotenv");



//LOAD ENV FILE  
dotenv.config();

//datebase connection
conectDB();


//middlewares
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

//USES
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());



//routes
app.use("/",staticRouter);
app.use("/",dynamicRoutes);






app.listen(process.env.PORT,(err)=>{
    if (err) {
        res.send("404 something went wrong")
    }
    console.log("server started at " ,process.env.PORT);
    
})