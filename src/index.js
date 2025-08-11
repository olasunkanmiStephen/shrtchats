import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";

const app = express();


app.use("/api/auth", authRoutes);

dotenv.config();
const PORT = process.env.PORT

app.listen(PORT, () => {
    connectDB();
    console.log("running at PORT:" + PORT)
})
