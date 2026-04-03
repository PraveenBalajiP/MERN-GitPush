import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    githubConfig:{
        repoOwner:{
            type:String,
            default:""
        },
        repoName:{
            type:String,
            default:""
        },
        branch:{
            type:String,
            default:"main"
        },
        folderPath:{
            type:String,
            default:""
        },
        token:{
            type:String,
            default:""
        }
    }
})

const User=mongoose.model("User",userSchema);

export default User