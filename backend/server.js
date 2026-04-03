import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './mongoConnection/mongoConnection.js';
import authRoutes from './routes/auth.routes.js';
import routes from './routes/routes.js';
import githubRoutes from './routes/github.routes.js';

const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT=process.env.PORT || 5000;

app.use("/api/auth",authRoutes)
app.use("/",routes);
app.use("/api/github", githubRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});