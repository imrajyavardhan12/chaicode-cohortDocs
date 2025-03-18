import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const registerUser = async (req,res)=>{

    const {name,email,password} = req.body;
    console.log(name)
    if(!name || !email || !password){
        return res.status(400).json({
            message : "all fileds are required"         
        })
    }

    // kyuki database alag continent mein hota hain 
    try{
        console.log(`inside try block`)
        //checking if data already exist in database
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({
                message : "user already exist"
            })
        }
        //if user is not there in database ,so will add user to collection

        const user = await User.create({
            name,
            email,
            password
        })

        console.log(user)

        // if user is not created 
        if(!user){
            return res.status(400).json({
                message : "user not registered"
            })
        }


        // to create verification token
        const token = crypto.randomBytes(32).toString('hex');

        // save verification token in database
        user.verificationToken = token;
        await user.save();
        console.log(token);
    
        // send email to user
       
        const transportor = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port:  process.env.MAILTRAP_PORT,
            auth: {
            user:  process.env.MAILTRAP_USER,
            pass:  process.env.MAILTRAP_PASSWORD
        }
    });
        console.log(`nodemailer working`)
        // create option for email (i.e mail option which is an object)
        
        const mailOption = {
            from: process.env.MAILTRAP_SENDER_EMAIL,
            to: user.email,
            subject: "Hello ✔",
            text: ` CLICK on this link to verify
            ${process.env.BASE_URL}/api/v1/user/verify/${token}`,
        }
        console.log(`mail option is working fine ${user.email}`);

        await transportor.sendMail(mailOption);
        console.log(`mail sent`)

        res.status(201).json({
            message : 'user registerd successfully',
            success : true
        })

    }
    catch(err){
        res.status(400).json({
            message : 'user not registred', err,
            success : false
        })
    }
}

const verifyUser = async (req,res) =>{
    // algorithm

    // get token from url 
    // validate
    // check if token exist in database 
    // make user.verify true 
    // remove verification token from database 
    // save user
    // return response 'user is verified'

    const {token} = req.params;

    if(!token){
        return res.status(401).json({
            message : 'token not found '
        })
    }

    const user = await User.findOne({verificationToken : token})
    
    if(!user){
        return res.status(401).json({
            message : 'Invalid token' 
        })
    }
    user.isVerified = true;
    user.verificationToken = '';

    await user.save();

    res.status(201).json({
        success: true,
        message : 'user is verified'
    })

}

const loginUser = async (req,res) =>{

    // get data from body
    const {email,password} = req.body;

    // validation
    if(!email || !password){
        return res.status(400).json({
            message : 'all fields are required for login '
        })
    }
    try {
        // email check kare
        const user = await User.findOne({email : email})

        // if user does not exist 
        if(!user){
            return res.status(400).json({
                message : 'user not found'
            })
        }
        // check for password
        const isMatch = await bcrypt.compare(password,user.password)

        // if password does not match
        if(!isMatch){
            return res.status(400).json({
                message : 'email or password is invalid'
            })
        }

        // if password matches give jwt token

        const token = jwt.sign({id : user._id},'shhhhh',{
            expiresIn : '24h'
        });
        
        const cookieOptions = {
            httpOnly : true,
            secure : true,
            maxAge : 24 * 60 * 60 * 1000
        }
        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            success: true,
            message : 'user loggedin successfully',
            jwtToken : token ,
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
                role : user.role
            },

        })

    } catch (error) {
        res.status(400).json({
            message : `$error is : ${error}`
        })
    }
}

export {registerUser, verifyUser, loginUser}
