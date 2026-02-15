import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function protectedRoute(req,res,next){
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized: No Token Provided"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized: Invalid Token"});
    }
}

export default protectedRoute;