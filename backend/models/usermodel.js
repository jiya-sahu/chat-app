import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname:{
        type:String ,
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
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum :["female","male"],
    },
    profilepic:{
        type:String,
        default:"",

    },
    
},{timestamps:true});

const usermodel = mongoose.model("usermodel",userSchema);
export default usermodel;
