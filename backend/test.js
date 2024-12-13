const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variables for security
});

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Chat model
      messages: [
        { role: "user", content: "Say Hello, World!" } // Chat-style input
      ],
      max_tokens: 5,
    });
    console.log(response.choices[0].message.content.trim()); // Correct output access
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
