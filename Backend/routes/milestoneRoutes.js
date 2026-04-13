import express from "express";
import clientModel from "../models/Client.js";
import z from "zod";
import authMiddleware from "../middlewares/authMiddleware.js";
import milestoneModel from "../models/Milestone.js";
import projectModel from "../models/Project.js";
import mongoose from "mongoose";
const router = express.Router();


const mileStoneSchema = z.object({
  title: z.string().min(3).max(100).trim(),

  order: z.number().int().min(1),

  project: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid project ID"),

  amount: z.number().min(0).optional(),

  dueDate: z.coerce.date().optional(),

  status: z.enum(["pending", "in-progress", "completed"]).optional(),
});


router.post("/", authMiddleware, async (req, res) => {
  try {
    const result = mileStoneSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error,
      });
    }

    const { title, order, project, amount, dueDate, status } = result.data;

    const userId = req.user.id;

    
    const projectExist = await projectModel.findById(project);

    if (!projectExist) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (projectExist.user.toString() !== userId) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const milestoneExist = await milestoneModel.findOne({
      user: userId,
      project,
      title,
    });

    if (milestoneExist) {
      return res.status(400).json({
        message: "Milestone with same title already exists",
      });
    }
    const orderExists = await milestoneModel.findOne({
      project,
      order,
    });

    if (orderExists) {
      return res.status(400).json({
        message: "Milestone with same order already exists in this project",
      });
    }

    const milestone = await milestoneModel.create({
      title,
      order,
      project,
      amount,
      dueDate,
      status,
      user: userId,
    });

    res.status(201).json({
      message: "Milestone created successfully",
      milestone,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// ye get route uss project k saare milestones return krdega sorted form mai
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({
        message: "Project ID is required",
      });
    }

    const project = await projectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.user.toString() !== userId) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const milestones = await milestoneModel
      .find({ project: projectId })
      .sort({ order: 1 });

    res.status(200).json({
      milestones,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
});

// update a milestone

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const milestoneId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(milestoneId)) {
      return res.status(400).json({
        message: "Invalid milestone ID",
      });
    }

    const milestone = await milestoneModel.findById(milestoneId);

    if (!milestone) {
      return res.status(404).json({
        message: "Milestone not found",
      });
    }

    if (milestone.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const result = mileStoneSchema.partial().safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        error: result.error,
      });
    }

    const updateData = result.data;

    
    if (updateData.project) {
      const projectExist = await projectModel.findById(updateData.project);

      if (!projectExist) {
        return res.status(404).json({
          message: "Project not found",
        });
      }

      if (projectExist.user.toString() !== req.user.id) {
        return res.status(403).json({
          message: "Access denied",
        });
      }
    }
    if (updateData.order !== undefined) {
      const orderExists = await milestoneModel.findOne({
        project: milestone.project,
        order: updateData.order,
        _id: { $ne: milestoneId },
      });

      if (orderExists) {
        return res.status(400).json({
          message: "Milestone with same order already exists in this project",
        });
      }
    }

    const updatedMilestone = await milestoneModel.findByIdAndUpdate(
      milestoneId,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      updatedMilestone,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const milestoneId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(milestoneId)) {
      return res.status(400).json({
        message: "Invalid milestone ID",
      });
    }

    const milestone = await milestoneModel.findById(milestoneId);

    if (!milestone) {
      return res.status(404).json({
        message: "Milestone not found",
      });
    }

    if (milestone.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await milestoneModel.findByIdAndDelete(milestoneId);

    res.status(200).json({
      message: "Milestone deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
});



export default router;
