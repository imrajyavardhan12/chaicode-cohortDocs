import mongoose from 'mongoose';


// sometimes we need to write this
import dotenv from 'dotenv';
dotenv.config();

const db = ()=>{
    mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log(`Db connected successfully`);
        })
        .catch((err)=>{
            console.log(`this is the error : ${err}`)
        })
}

export default db;