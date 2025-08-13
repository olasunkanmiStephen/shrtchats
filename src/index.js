import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json()); // parses incoming JSON
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);



app.listen(PORT, () => {
    connectDB();
    console.log("running at PORT:" + PORT)
})
