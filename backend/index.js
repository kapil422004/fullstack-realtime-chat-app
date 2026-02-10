import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbconnect from "./config/database.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";

const app = express();

const PORT = process.env.PORT || 4000;

const allowOrigin = ["http://localhost:8080"];

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

app.use("/api/v1/user", userRouter)
app.use("/api/v1/message", messageRouter)

dbconnect()

app.listen(PORT, () => {
  console.log(`server is live on ${PORT}`);
});
