import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()


const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URL)
        .then( ()=>{
            console.log(`database connected successfully`);
        })
        .catch((err)=>{
            console.log(`${err}`);
        })
}

export default dbConnect;