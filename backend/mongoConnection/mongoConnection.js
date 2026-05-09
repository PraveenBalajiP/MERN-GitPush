import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

let connectionPromise = null;

async function mongoConnect(){
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set. Add it to your backend .env file.");
    }

    connectionPromise = mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`Connected to MongoDB: ${mongoose.connection.host}`);
            return mongoose.connection;
        })
        .catch((error) => {
            connectionPromise = null;
            throw error;
        });

    return connectionPromise;
}
export default mongoConnect;