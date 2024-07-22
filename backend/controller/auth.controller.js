import bcrypt from 'bcryptjs'
import usermodel from '../models/usermodel.js';
import generateTokenAndsetCookie from '../utils/generateTokens.js'

export const signup = async(req,res)=>{
    try {
        const {fullname,username,password,confirmpassword,profilepic,gender} = req.body
        if(password!== confirmpassword){
           return  res.status(400).json({error:"Passwords don't match"})
        }
        const user = await usermodel.findOne({username});
        if(user){
            return res.send(400).json({error:"username already exits"})
        }
        //password hash
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new usermodel({
            fullname,
            username,
            password:hashedpassword,
            gender,
            profilepic: gender==='female'?girlProfilePic:boyProfilePic
        })
        if(newUser){
            //generate token here
            generateTokenAndsetCookie(newUser._id,res);
            await newUser.save();

            

            res.status(201).json({
               _id:newUser._id,
               username : newUser.username,
               fullname:newUser.fullname,
               profilepic:newUser.profilepic
    
            })
        }else{
            res.status(400).json({error:"invalid user data "})
        }
       
    } catch (error) {
        console.log(`error in signup controller ${error}`);
        res.status(500).json({error:"Internal server error"})
    }
    
   
}

export const login = async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await usermodel.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"");


        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }
        generateTokenAndsetCookie(user._id,res);

        res.status(201).json({
            _id : user._id,
            fullname:user.fullname,
            username:user.username,
            profilepic:user.profilepic
        })
    } catch (error) {
        console.log(`error in login controller ${error}`);
        res.status(500).json({error:"Internal server error"})
    }
    console.log("login route");
}



export const logout = async(req,res)=>{

   try {
    //res.cookie(name,value,age)
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully"});
   } catch (error) {
    console.log(`error in logout controller ${error}`);
    res.status(500).json({error:"Internal server error"})
   };
}