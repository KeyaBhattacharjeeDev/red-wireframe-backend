import { GoogleGenerativeAI } from "@google/generative-ai";
import http from 'http';

// 1. Configuration
const api_key = "AIzaSyB5PVnZ_a0qE3ojjv-wjnXdUZRAoeh8mOk";
const genAI = new GoogleGenerativeAI(api_key);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };

// 2. Initialise Model
const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });

// 3. Generate Content
async function generateContent() {

  try {
    const prompt = "Create a login page wireframe and convert to mermaid js code. return only the code.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // console.log(response.text());    
    return response.text;

  } catch (error) {
    console.error('Error generating content:', error);
  }
}

// Run the function
generateContent();
