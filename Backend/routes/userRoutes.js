import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z, { email } from "zod";
import userModel from "../models/User.js";
const userRouter = express.Router();

// validations Schema's

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

userRouter.post("/signup", async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error,
      });
    }
    const { name, email, password } = result.data;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
  const user =   await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({
        message : "SignUp succesfull",
        userId : user._id,
    })



  } catch (error) {
    return res.status(500).json({
        message : "Internal Server Error",
    })
  }
});

userRouter.post("/signin",async(req,res)=>{
    try {
        const result = signinSchema.safeParse(req.body);
        if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }
    const { email , password } = result.data;
      const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = bcrypt.compare(password,user.password)
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Token

    

        
    } catch (error) {
        
    }
})


export default userRouter;
