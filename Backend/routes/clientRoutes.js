import express from "express";
import clientModel from "../models/Client.js";
import z from "zod";
import authMiddleware from "../middlewares/authMiddleware.js";
import milestoneModel from "../models/Milestone.js"
import projectModel from "../models/Project.js";
const router = express.Router();

const clientSchema = z.object({
  name: z.string().min(3).trim(),

  email: z.string().email().trim(),

  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

  company: z.string().min(3).trim().optional(),

  address: z.string().min(3).trim().optional(),

  notes: z.string().min(6).trim().optional(),
});
// create a new clinet
router.post("/", authMiddleware, async (req, res) => {
  try {
    const result = clientSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error,
      });
    }

    const { name, email, phone, company, address, notes } = result.data;

    const userId = req.user.id;

    const existingClient = await clientModel.findOne({
      user: userId,
      email,
    });

    if (existingClient) {
      return res.status(400).json({
        message: "Client with this email already exists",
      });
    }

    const client = await clientModel.create({
      user: userId,
      name,
      email,
      phone,
      company,
      address,
      notes,
    });

    res.status(201).json({
      message: "Client created successfully",
      client,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// return all clients(vo saare clinets return krdo jo iss frelancer k hai)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const clients = await clientModel.find({ user: userId });

    if (clients.length === 0) {
      return res.status(200).json({
        message: "You don't have any clients yet",
        clients: [],
      });
    }

    res.status(200).json({
      clients,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
});


// Return a particular client
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const clientId = req.params.id;

    const client = await clientModel.findById(clientId);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }
    if (client.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.status(200).json({
      client,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
});

//Update client
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const clientId = req.params.id;

    const client = await clientModel.findById(clientId);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    if (client.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    
    const result = clientSchema.partial().safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        error: result.error,
      });
    }

    const updatedClient = await clientModel.findByIdAndUpdate(
      clientId,
      { $set: result.data }, // only update provided fields
      { new: true } 
    );

    res.status(200).json({
      updatedClient,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
});

// Delete

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const clientId = req.params.id;

    // 1. Find client
    const client = await clientModel.findById(clientId);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    // 2. Ownership check
    if (client.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // 3. Get all projects of this client
    const projects = await projectModel.find({ client: clientId });

    // 4. Check if any project is NOT completed
    const hasActiveProjects = projects.some(
      (project) => project.status !== "completed"
    );

    if (hasActiveProjects) {
      return res.status(400).json({
        message: "Cannot delete client with active projects",
      });
    }

    // 5. Extract project IDs
    const projectIds = projects.map((p) => p._id);

    // 6. Delete all milestones related to these projects
    await milestoneModel.deleteMany({
      project: { $in: projectIds },
    });

    // 7. Delete all projects
    await projectModel.deleteMany({
      client: clientId,
    });

    // 8. Delete client
    await clientModel.findByIdAndDelete(clientId);

    res.status(200).json({
      message: "Client and related data deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
});




export default router;
