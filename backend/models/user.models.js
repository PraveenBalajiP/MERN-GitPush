import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:3,
        maxlength:30
    },
    password:{
        type:String,
        required:true,
        minlength:6
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
},{timestamps:true})

userSchema.index({ username: 1 }, { unique: true });

const User=mongoose.model("User",userSchema);

export default User