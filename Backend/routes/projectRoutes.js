import express from "express";
import clientModel from "../models/Client.js";
import z from "zod";
import authMiddleware from "../middlewares/authMiddleware.js";
import milestoneModel from "../models/Milestone.js"
import projectModel from "../models/Project.js";

const router = express.Router();


const projectSchema = z.object({
  title: z.string().min(3).trim(),

  description: z.string().trim().optional(),

  client: z.string().min(1),

  budget: z.number().min(0).optional(),

  deadline: z.coerce.date().optional(),

  status: z.enum(["active", "completed"]).optional(),
});



router.post("/",authMiddleware,(req,res)=>{

    try {
        const result = z.safeParse(req.body);
      if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error,
      });
    }
    const { title , description , client, budget,deadline,status} = result.data;
    

        
    } catch (error) {
        
    }
})















export default router;


