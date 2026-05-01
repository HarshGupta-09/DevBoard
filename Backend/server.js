import dotenv from "dotenv"
dotenv.config();
import express from "express"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import clientRouter from "./routes/clientRoutes.js"
import projectRouter from "./routes/projectRoutes.js"
import milestoneRouter from "./routes/milestoneRoutes.js"
import aiRouter from "./routes/aiRoutes.js"
import cors from 'cors'


const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://dev-board-gules.vercel.app"
  ],
  credentials: true
}));

//Middlwares
app.use(express.json());



// Routes

app.use("/api/auth/users",userRouter);
app.use("/api/clients",clientRouter);
app.use("/api/projects",projectRouter);
app.use("/api/milestones",milestoneRouter);
app.use("/api/ai",aiRouter);








connectDB();
const PORT = process.env.PORT || 3000;

app.listen(3000,()=>{
    console.log(`Server Running On PORT :${PORT}`)
})