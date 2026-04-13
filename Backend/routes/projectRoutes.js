import express from "express";
import clientModel from "../models/Client.js";
import z from "zod";
import authMiddleware from "../middlewares/authMiddleware.js";
import milestoneModel from "../models/Milestone.js";
import projectModel from "../models/Project.js";
import mongoose from "mongoose";
const router = express.Router();

const projectSchema = z.object({
  title: z.string().min(3).trim(),

  description: z.string().trim().optional(),

  client: z.string().min(1),

  budget: z.number().min(0).optional(),

  deadline: z.coerce.date().optional(),

  status: z.enum(["active", "completed"]).optional(),
});

// create project
router.post("/", authMiddleware, async (req, res) => {
  try {
    const result = projectSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error,
      });
    }

    const { title, description, client, budget, deadline, status } =
      result.data;

    const userId = req.user.id;

    //  validate client
    const clientExists = await clientModel.findById(client);

    if (!clientExists) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    if (clientExists.user.toString() !== userId) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    
    const existingProject = await projectModel.findOne({
      user: userId,
      client,
      title,
    });

    if (existingProject) {
      return res.status(400).json({
        message: "Project with same title already exists",
      });
    }

    const project = await projectModel.create({
      title,
      description,
      client,
      budget,
      deadline,
      status,
      user: userId,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Return freelancer all projects
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await projectModel.find({ user: userId });
    if (projects.length === 0) {
      return res.status(200).json({
        message: "You don't have any Projects yet",
        projects: [],
      });
    }
    res.status(200).json({
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
});

// return a single project
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const projectId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const project = await projectModel
      .findById(projectId)
      .populate("client", "name email");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.status(200).json({
      project,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
});


// updae a project
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const projectId = req.params.id;

  
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const project = await projectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const result = projectSchema.partial().safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        error: result.error,
      });
    }

    const updateData = result.data;

  
    if (updateData.client) {
      const clientExists = await clientModel.findById(updateData.client);

      if (!clientExists) {
        return res.status(404).json({
          message: "Client not found",
        });
      }

      if (clientExists.user.toString() !== req.user.id) {
        return res.status(403).json({
          message: "Access denied",
        });
      }
    }

    const updatedProject = await projectModel.findByIdAndUpdate(
      projectId,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      updatedProject,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
});

// Delete  project 

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const projectId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        message: "Invalid project ID",
      });
    }

    const project = await projectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await milestoneModel.deleteMany({ project: projectId });

    // delete project
    await projectModel.findByIdAndDelete(projectId);

    res.status(200).json({
      message: "Project and related data deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
});



export default router;
