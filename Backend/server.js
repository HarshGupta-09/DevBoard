import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

dotenv.config();
const app = express();


connectDB();


const port = process.env.PORT || 3000;

app.listen(3000,()=>{
    console.log(`Server Running On PORT :${port}`)
})