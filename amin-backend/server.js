import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Google GenAI ክላየንት ማዋቀር
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // ለሆስፒታል AI አማካሪ የሚሆን ትዕዛዝ (System Instruction)
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are a helpful and professional medical assistant for Amin Hospital in Addis Ababa, Ethiopia. Give polite, safe, and general health guidance, but always advise patients to consult real doctors for serious conditions. User message: ${message}`
            }
          ]
        }
      ]
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Error communicating with Gemini:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});