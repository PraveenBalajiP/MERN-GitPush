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
    'https://git-push-frontend.vercel.app',
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

try {
    await connectDB();
} catch (error) {
    console.error("MongoDB startup connection failed:", error.message);
    if (process.env.VERCEL !== "1") {
        process.exit(1);
    }
    throw error;
}

app.use("/api/auth",authRoutes)
app.use("/",routes);
app.use("/api/github", githubRoutes);

app.get("/",(req,res)=>{
    res.send("⚡Welcome to GitPush Studio API");
});

if (process.env.VERCEL !== "1") {
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;