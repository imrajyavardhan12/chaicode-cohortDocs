import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './utils/db.js';
import cookieParser from 'cookie-parser';

// import all user routes
import allRoutes from './routes/user.route.js'


dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cookieParser());

app.use(cors({
    origin : "http://localhost:3000",
    methods : ['GET','POST','DELETE','OPTIONS'],
    allowedHeaders : ['Content-type','Authorization'],
    credentials: true
}))

// use to parse JSON data
app.use(express.json());

// use to parse url-encoded data
app.use(express.urlencoded({extended:true}))


app.use('/api/v1/user',allRoutes);

dbConnect();

app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})