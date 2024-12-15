// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const OpenAI = require('openai');
// const puppeteer = require('puppeteer');


// require('dotenv').config();

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// });
// // Function to scrape Instagram profile
// const scrapeInstagram = async (username) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   const url = `https://www.instagram.com/${username}/`;
  
//   try {
//     await page.goto(url, { waitUntil: 'domcontentloaded' });
    
//     // Scrape bio
//     const bio = await page.$eval('meta[name="description"]', (element) => element.content);
    
//     // Example: Scrape posts (requires more logic for full data)
//     const posts = await page.$$eval('article div div div div a', (links) =>
//       links.map((link) => link.textContent || link.href).slice(0, 10) // Fetch up to 10 post descriptions
//     );
    
//     await browser.close();
//     return { bio, posts };
//   } catch (error) {
//     await browser.close();
//     console.error('Error scraping Instagram:', error);
//     throw new Error('Could not fetch Instagram data.');
//   }
// };

// app.post('/generate', async (req, res) => {
//   const { username } = req.body;

//   // Validate username
//   if (!username || typeof username !== 'string' || username.trim() === '') {
//     return res.status(400).json({ error: 'Invalid username.' });
//   }

//   try {
//     // Scrape Instagram profile
//     const { bio, posts } = await scrapeInstagram(username);

//     // Limit input tokens to 250
//     // const limitedBio = limitTokens(bio, 50); // Reserve 100 tokens for the bio
//     // const limitedPosts = limitTokens(posts.join(' '), 250); // Reserve 150 tokens for the posts


//     const prompt = `
//       Create a humorous, creative analysis of the Instagram account with the following details:
//       - Username: "${username}"
//       - Bio: "${bio}"
//       - Post Descriptions: "${posts.join(' ')}"
//       Use cultural references, emojis, and a mix of playful critique and admiration to analyze this information.
//     `;

//     const response = await openai.createCompletion({
//       model: 'gpt-4o-mini',
//       prompt: prompt,
//       max_tokens: 300,
//     });

//     res.json({ result: response.data.choices[0].text.trim() });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error generating response.' });
//   }
// });

// // app.listen(5000, () => console.log('Server running on http://localhost:5000'));

// module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { scrapeInstagram } = require('./utils/scraper'); // Move scraper logic to a utility file
const { generateResponse } = require('./services/openai'); // Move OpenAI logic to a service file

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/generate', async (req, res) => {
  const { username } = req.body;

  // Validate username
  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({ error: 'Invalid username.' });
  }

  try {
    // Scrape Instagram profile
    const { bio, posts } = await scrapeInstagram(username);

    // Generate a creative analysis using OpenAI
    const result = await generateResponse(username, bio, posts);

    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating response.' });
  }
});

const path = require('path');
console.log('Static files path:', path.join(__dirname, './brat-or-demure-frontend/build'));

app.use(express.static(path.join(__dirname, './brat-or-demure-frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../brat-or-demure-frontend/build', 'index.html'));
});

module.exports = app;
