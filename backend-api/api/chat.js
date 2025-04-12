<<<<<<< HEAD
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config(); // For local development, if you use .env

// Ensure API key is set properly
if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY is missing in environment variables.");
  process.exit(1); // Exit if no key is found
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
=======
// backend-api/api/chat.js

const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
>>>>>>> 5faf698c7b8865be35e61b9cacf91f8aad384292
