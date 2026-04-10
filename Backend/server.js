import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import clientRouter from "./routes/clientRoutes.js"
dotenv.config();
const app = express();






//Middlwares
app.use(express.json());

// Routes

app.use("/api/auth/users",userRouter);
app.use("/api/clients",clientRouter);


















connectDB();
const port = process.env.PORT || 3000;

app.listen(3000,()=>{
    console.log(`Server Running On PORT :${port}`)
})