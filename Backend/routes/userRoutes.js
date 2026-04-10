import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import z, { email } from "zod";
import userModel from "../models/User.js";
import authMiddleware from "../middlewares/authMiddleware.js";
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
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "SignUp succesfull",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const result = signinSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    const { email, password } = result.data;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
    });
  }
});

userRouter.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel
      .findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({ user });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});




export default userRouter;
