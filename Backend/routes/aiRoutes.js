import express from "express"
import authMiddleware from "../middlewares/authMiddleware"
import {model } from "../utils/gemini.js"

const router = express.Router;

router.post("/generate-proposal",authMiddleware,async (req,res)=>{
     try {
    const { clientName, projectTitle, description, budget } = req.body;

    const prompt = `
      Write a professional freelance project proposal with the following details:
      - Client Name: ${clientName}
      - Project Title: ${projectTitle}
      - Project Description: ${description}
      - Budget: ${budget}
      
      The proposal should include:
      1. Introduction
      2. Project Understanding
      3. Proposed Solution
      4. Timeline
      5. Pricing
      6. Closing
      
      Keep it professional and concise.
    `;

    const result = await model.generateContent(prompt);
    const proposal = result.response.text();

    res.status(200).json({ proposal });

  } catch (error) {
    res.status(500).json({ message: "Failed to generate proposal", error: error.message });
  }
})
