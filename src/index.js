import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { app, server } from "./lib/socket.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json()); // parses incoming JSON
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => {
    connectDB();
    console.log("running at PORT:" + PORT)
})
