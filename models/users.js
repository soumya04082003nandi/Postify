const mongoose=require("mongoose");
const {Schema,model}=require("mongoose");




const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },email:{
         type:String,
        required:true,
        unique:true,
    },age:{
        type:Number,
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId, ref:"postModel"
    }],
},{timestamps:true})

 const userModel=mongoose.model("userModel",userSchema);

 module.exports=userModel;