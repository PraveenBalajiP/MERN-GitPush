import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";

const router=express.Router();

router.post("/login",async (req,res)=>{
    try{
        const {username,password}=req.body;
        const userExists=await User.findOne({username});
        if(!userExists){
            return res.status(404).json({message:"User Doesn't Exist"});
        }
        const isPasswordValid=await bcrypt.compare(password,userExists.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid Password"});
        }
        res.status(200).json({message:"Login Successful"});
        process.exit(0);
    }
    catch(error){
        res.status(500).json({message:"Login Failed: "+error.message});
        process.exit(1);
    }
});

export default router;