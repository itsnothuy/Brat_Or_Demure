const OpenAI = require('openai');
const dotenv = require('dotenv');


dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateResponse = async (username, bio, posts) => {
  const prompt = `
    You are a humorous social media expert tasked with analyzing Instagram accounts. 
    Your goal is to determine whether the account's personality aligns more with being "Brat" or "Demure." 
    Here are the criteria:

    - Brat: Bold, cheeky, rebellious, and confident. This type of account often uses sassy captions, daring aesthetics, or playful emojis like ⚡😏🔥.
    - Demure: Subtle, elegant, soft, and reserved. This type of account often uses poetic captions, pastel aesthetics, or calming emojis like 🌸✨🌙.

    Analyze the Instagram account based on:
    - Username: "${username}"
    - Bio: "${bio}"
    - Recent Post Descriptions: "${posts.join(' ')}"

    Give a humorous and creative analysis of the account and conclude whether it is "Brat" or "Demure" based on the above criteria. Explain why in 2-3 sentences. Use emojis and cultural references to make the critique engaging.
  `;

  try {
    console.log('Sending request to OpenAI...');
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.8,
        top_p: 0.9,
    });
      
    // Log the entire response to debug
    console.log('Response from OpenAI:', JSON.stringify(response, null, 2));

    // Safely access the message content
    const message = response.choices[0].message.content;

    // Log the extracted message
    console.log('Extracted Message:', message);
    
    return message.trim();
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Could not generate response.');
  }
};

module.exports = { generateResponse };
