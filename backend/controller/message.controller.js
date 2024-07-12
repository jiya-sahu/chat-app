import conversations from '../models/conversationsmodel.js'
import Messages from '../models/messagemodel.js'


export const sendMessage = async(req,res)=>{
   try {
    const {message} = req.body;
    const{id:receiverId} = req.params;
    const senderId = req.user._id;

   let conversation =  await conversations.findOne({
            participants:{$all : [senderId,receiverId]}
    })
    if(!conversation){
        conversation = await conversations.create({
            participants:[senderId,receiverId],
        })
    }

    const newMessage = new Messages({
        senderId,
        receiverId,
        message
    })

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }
    //SOCKET IO functionality will come here

    // await conversation.save();
    // await newMessage.save();

    //this will run in parallel 
    await Promise.all([conversation.save(),newMessage.save()])

    res.status(201).json(newMessage);
   } catch (error) {
    res.status(500).json({error:`Internal server error${error}`})
   }
   
   
    // console.log("Message sent",req.params.id);
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        let conversation = await conversations.findOne({
            participants :{$all :[senderId,userToChatId]}
        }).populate("messages")//this will return an object containing  all the messages

        if (!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessages controller : ",error.message);
        res.status(500).json({error:`Internal server error `})
    }
}