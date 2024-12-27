import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const port = process.env.PORT || 4000;
connectDB();

// const allowedOrigins = ['http://localhost:5173']
const allowedOrigins = ['https://coding-stars-one.vercel.app']


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

// API EndPoints
app.get('/', (req,res)=> res.send("API Working Live on Web With Database"));
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);


app.listen(port, ()=> console.log(`Server started on PORT: ${port}`));
