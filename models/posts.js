const mongoose=require("mongoose");
const {Schema,model}=require("mongoose");



const postSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    content:String,
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    }]
},{timestamps:true})

const postModel=mongoose.model("postModel",postSchema);

module.exports=postModel;