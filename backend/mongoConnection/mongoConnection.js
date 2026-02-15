import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

async function mongoConnect(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB:${mongoose.connection.host}`);
    }
    catch(error){
        console.error("Error connecting to MongoDB:",error);
    }
}
export default mongoConnect;