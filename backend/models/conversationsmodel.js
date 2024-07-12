import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"messages",
            default:[],
        },
    ],
   
},{timestamps:true}
);

const conversations = mongoose.model("conversations",conversationSchema); 
export default conversations;