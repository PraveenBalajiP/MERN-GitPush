import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";

const router=express.Router();

router.get("/home", protectedRoute, (req,res)=>{
    return res.status(200).json({message:"Welcome to Home", user:req.user});
});

router.get("/about", protectedRoute, (req,res)=>{
    return res.status(200).json({message:"Welcome to About", user:req.user});
});

router.get("/history", protectedRoute, (req,res)=>{
    return res.status(200).json({message:"Welcome to History", user:req.user});
});

export default router;