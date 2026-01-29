import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import 'dotenv/config';
import { connect } from './config/mongodb.js';
import authRouter from './routs/authRoutes.js'
import userRouter from './routs/userRoutes.js';

const app = express();

const port = process.env.PORT || 4000;
connect();

app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials: true}))


// API End-Points
app.get("/", (req, res) => {
    res.send("Api is working")
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(port, () => {
    console.log(`server is running on ${port}.`)
    console.log(process.env.MONGODB_URL)
})

