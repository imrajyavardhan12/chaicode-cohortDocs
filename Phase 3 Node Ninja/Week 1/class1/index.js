import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './utils/db.js';
import {register} from './controller/user.controller.js';

// import all routes
import userRoutes from './routes/user.route.js';

dotenv.config();

const port = process.env.PORT ;

const app = express();

app.use(cors({
    origin : process.env.BASE_URL,
    methods : ['GET','POST','DELETE','OPTIONS'],
    allowedHeaders : ['Content-Type','Authorization'],
    credentials : true
}))

// it is used to parse JSON data
app.use(express.json());
// it is used to parse URL-encoded data
app.use(express.urlencoded({extended:true}));



//connection to database
dbConnect();

app.use('/api/v1/users', userRoutes);


app.listen(port,()=>{
    console.log(`server is listening on ${port}`)
})