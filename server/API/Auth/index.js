import express  from "express";
import {UserModel} from  "../../database/user"
import bcrypt from "bcryptjs";
import { validateSignup,validateSignIn } from "../../validation/auth";
const Router =  express.Router();

/*
Route       /signup
Des         Signup using email and password
Params      None
Access      Public
Method      POST
*/

Router.post("/signup",async(req,res)=>{
    try{
        await validateSignup(req.body.credentials);
        const {email,password,fullname,phoneNumber} = req.body.credentials;

        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserByPhone =  await UserModel.findOne({phoneNumber});

        if(checkUserByEmail || checkUserByPhone){
            res.json({error:"User already exits"});
        }
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password,bcryptSalt);
        //SAVE DB
        await UserModel.create({
            ...req.body.credentials,
            password:hashedPassword
        })
        //JWT Token
        const token = jwt.sign({user:fullname,email},"ZomatoApp");
        return res.status(200).json({token,message:"success"});
    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
});


/*
Route       /signin
Des         Signin using email and password
Params      None
Access      Public
Method      POST
*/

Router.post("/signin", async(req,res)=> {
    try {
     await validateSignin(req.body.credentials);
     const user = await UserModel.findByEmailAndPassword(
       req.body.credentials
     );
     const token = user.generateJwtToken();
     return res.status(200).json({token, status: "success"});
       } catch (error) {
         return res.status(500).json({error: error.message});
       }
  });

export default Router;