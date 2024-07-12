import usermodel from "../models/usermodel.js"; 

const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedinuserId = req.user._id;
        const filteredusers = await usermodel.find({_id:{$ne:loggedinuserId}}).select("-password")
        res.status(200).json(filteredusers)
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }

}
export  default getUsersForSidebar;
 