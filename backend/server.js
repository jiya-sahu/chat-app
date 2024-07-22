import express from 'express'
import  dotenv from'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path'

import authroutes from './routes/auth.routes.js'
import messageroutes from './routes/message.routes.js'
import userroutes from './routes/user.routes.js'

import connectmongodb from './db/connectMongodb.js';

const app = express();
const PORT = process.env.PORT||5000;

dotenv.config(); 
const __dirname = path.resolve();
app.use(express.json());//to parse incoming requests with json payloads
app.use(cookieParser());



// app.get("/",(req,res)=>{
//     res.send("Hello world")
// })

app.use("/api/auth/",authroutes);
app.use("/api/message/",messageroutes);
app.use("/api/users",userroutes)


app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.listen(PORT,()=>{
    connectmongodb();
    console.log(`server running on port ${PORT}`);
})