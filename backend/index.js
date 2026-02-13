import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbconnect from "./config/database.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 4000;

const allowOrigin = [
  "http://localhost:5173",
  "https://fullstack-realtime-chat-app-steel.vercel.app",
  "https://fullstack-realtime-chat-app-git-main-kapil-ishwarkars-projects.vercel.app",
  "https://fullstack-realtime-chat-rlqlmauvy-kapil-ishwarkars-projects.vercel.app",
];

app.use(
  cors({
    origin: allowOrigin,
    credentials: true,
    methods: ["POST", "PUT", "DELETE", "GET"],
  }),
);
app.use(express.json());
app.use(cookieParser()); // becaue of this we can use cookie in isAuthenticated middleware

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

dbconnect();

server.listen(PORT, () => {
  console.log(`server is live on ${PORT}`);
});
