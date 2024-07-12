import jwt from 'jsonwebtoken'
import usermodel from '../models/usermodel.js';
const protectRoutes = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({error:"unauthorised - No Token provided"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({error:"Unathorized - Invalid Token"})
        }
        const user = await usermodel.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({error:"User not found"});

        }
        req.user = user;
        next();
    
    
    } catch (error) {
       console.log("Error in protectroute middleware",error.message); 
       res.status(500).json({error:"Internal server error"})
    }
}

export default protectRoutes;