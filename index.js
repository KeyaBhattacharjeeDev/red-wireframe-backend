const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add CORS middleware

const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const app = express();
const port = process.env.PORT || 3001;
console.log("hello");

// CORS middleware (adjust allowed origins as needed)
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your React app's origin

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle form submissions (changed to POST)
app.post('/text', async (req, res) => {
  // console.log(req.body);
  const prompt = req.body.prompt; // Assuming prompt is in the request body

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body'});
  }  
  const generationConfig = {temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096};

  // 2. Initialise Model
  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig });

  // 3. Generate Content
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Internal server error' }); // Handle errors gracefully
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});