const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

app.post('/generate', async (req, res) => {
  const { username } = req.body;

  try {
    const prompt = `
      Create a humorous, creative analysis of the Instagram username "${username}". 
      Use cultural references, emojis, and a mix of playful critique and admiration.
    `;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 250,
    });

    res.json({ result: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating response.' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));