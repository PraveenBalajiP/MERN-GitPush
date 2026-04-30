import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './mongoConnection/mongoConnection.js';
import authRoutes from './routes/auth.routes.js';
import routes from './routes/routes.js';
import githubRoutes from './routes/github.routes.js';

const app=express();

// Dynamic CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
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