import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { connect } from "./config/mongodb.js";
import authRouter from "./routs/authRoutes.js";
import userRouter from "./routs/userRoutes.js";

const app = express();

await connect();

const allowedOrigins = [
  "http://localhost:5173",
  "https://authentication-system-virid.vercel.app",
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true })); //allows your frontend to send and receive authentication cookies securely.

// API End-Points
app.get("/", (req, res) => {
  res.send("Api is working");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on ${port}.`);
});
