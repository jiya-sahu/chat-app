import express from 'express'
import  dotenv from'dotenv';
import cookieParser from 'cookie-parser';


import authroutes from './routes/auth.routes.js'
import messageroutes from './routes/message.routes.js'
import userroutes from './routes/user.routes.js'

import connectmongodb from './db/connectMongodb.js';

const app = express();
const PORT = process.env.PORT||5000;

dotenv.config(); 

app.use(express.json());//to parse incoming requests with json payloads
app.use(cookieParser());



// app.get("/",(req,res)=>{
//     res.send("Hello world")
// })

app.use("/api/auth/",authroutes);
app.use("/api/message/",messageroutes);
app.use("/api/users",userroutes)

app.listen(PORT,()=>{
    connectmongodb();
    console.log(`server running on port ${PORT}`);
})