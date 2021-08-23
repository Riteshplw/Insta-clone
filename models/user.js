const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default: "https://res.cloudinary.com/cloudri/image/upload/v1629557511/image/upload/default_mpmfpb.jpg"
    },
    followers:[{type:ObjectId,ref:"User"}], 
    following:[{type:ObjectId,ref:"User"}] 
})

mongoose.model("User",userSchema);