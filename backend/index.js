import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

//middleware
app.use(express.json({ limit: "10mb" }));
//cookie parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Authentication Routes
app.use("/api/auth", authRoute);

//Post routes
app.use("/api/posts", postRoute);

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
  connectDB();
});
