const puppeteer = require('puppeteer');

const scrapeInstagram = async (username) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://www.instagram.com/${username}/`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Scrape bio
    const bio = await page.$eval('meta[name="description"]', (element) => element.content);

    // Example: Scrape posts (requires more logic for full data)
    const posts = await page.$$eval('article div div div div a', (links) =>
      links.map((link) => link.textContent || link.href).slice(0, 10) // Fetch up to 10 post descriptions
    );

    await browser.close();
    return { bio, posts };
  } catch (error) {
    await browser.close();
    console.error('Error scraping Instagram:', error);
    throw new Error('Could not fetch Instagram data.');
  }
};

module.exports = { scrapeInstagram };
