import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import {model } from "../utils/gemini.js"
import { z } from "zod";
const router = express.Router();

const proposalSchema = z.object({
  clientName: z.string().min(2),
  projectTitle: z.string().min(3),
  description: z.string().min(10),
  budget: z.number().optional(),
});

router.post("/generate-proposal", authMiddleware, async (req, res) => {
  try {
   
    const result = proposalSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        error: result.error,
      });
    }

    const { clientName, projectTitle, description, budget } = result.data;

    const prompt = `
You are a professional freelance developer.

Write a high-quality, client-winning proposal.

Client Name: ${clientName}
Project Title: ${projectTitle}
Project Description: ${description}
Budget: ${budget || "Not specified"}

Instructions:
- Keep tone professional and friendly
- Be concise but impactful
- Do not use bullet points
- Write in paragraph format
- End with a strong closing line

Return only the proposal text.
`;

    const resultAI = await model.generateContent(prompt);
    const proposal = resultAI.response.text();

    if (!proposal) {
      return res.status(500).json({
        message: "Failed to generate proposal",
      });
    }

    res.status(200).json({ proposal });

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate proposal",
      error: error.message,
    });
  }
});


export default router