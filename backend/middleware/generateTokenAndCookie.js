import jwt from "jsonwebtoken";

function generateTokenAndCookie(user,res){
    try{
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict"
        });
        
        return token;
    }
    catch(error){
        console.error("Error generating token: ",error);
        throw error;
    }
}

export default generateTokenAndCookie;