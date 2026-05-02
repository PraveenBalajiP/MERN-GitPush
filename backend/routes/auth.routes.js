import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import generateTokenAndCookie from "../middleware/generateTokenAndCookie.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router=express.Router();

router.post("/register",async (req,res)=>{
    try{
        const username=(req.body.username || "").trim();
        const password=(req.body.password || "").trim();

        if(!username || !password){
            return res.status(400).json({message:"Username and password are required"});
        }

        if(username.length<3){
            return res.status(400).json({message:"Username must be at least 3 characters"});
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const existingUser=await User.findOne({username});
        if(existingUser){
            return res.status(409).json({message:"Username already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({username,password:hashedPassword});
        await user.save();
        res.status(201).json({message:"Registration Successful",user:{id:user._id,username:user.username}});
    }
    catch(error){
        if(error?.code===11000){
            return res.status(409).json({message:"Username already exists"});
        }
        console.error("Registration error:",error);
        res.status(500).json({message:"Registration Failed: "+error.message});
    }
});

router.post("/login",async (req,res)=>{
    try{
        const username=(req.body.username || "").trim();
        const password=(req.body.password || "").trim();

        if(!username || !password){
            return res.status(400).json({message:"Username and password are required"});
        }

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

router.get("/github-url", protectedRoute, async (req, res) => {
    try{
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const gitHubUserName=user.githubConfig?.repoOwner;
        if(!gitHubUserName){
            return res.status(400).json({message:"GitHub username not configured"});
        }
        const url=`https://github.com/${gitHubUserName}`;
        console.log(url);
        res.status(200).json({url});
    }
    catch(error){
        console.error("GitHub URL error:", error);
        res.status(500).json({ message: "Failed to get GitHub URL" });
    }
})

export default router;