import mongoose from 'mongoose';

const connectmongodb = async()=>{
    try {
        await mongoose.connect(process.env.MongodbUrl);
        console.log("connected to mongodb ");
    } catch (error) {
        console.log("error connecting to mongodb ");
    }
}

export default connectmongodb;