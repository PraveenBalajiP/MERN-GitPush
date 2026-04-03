import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import generateTokenAndCookie from "../middleware/generateTokenAndCookie.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router=express.Router();

router.post("/login",async (req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(404).json({message:"User Doesn't Exist"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid Password"});
        }
        generateTokenAndCookie(user,res);
        res.status(200).json({message:"Login Successful",user:{id:user._id,username:user.username}});
    }
    catch(error){
        console.error("Login error:",error);
        res.status(500).json({message:"Login Failed: "+error.message});
    }
});

router.get("/verify", protectedRoute, (req,res)=>{
    res.status(200).json({message:"Authenticated", user:req.user});
});

export default router;