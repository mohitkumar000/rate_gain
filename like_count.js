const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTotalLikes(url) {
  try {
    // Fetch HTML content using Axios
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML content into Cheerio
    const $ = cheerio.load(html);

    // Select the innermost <span> element (containing the number) and extract its text content
    const likesNumberText = $('span').first().text();

    // Extract numerical value from the text (assuming it contains a number)
    const likesNumber = parseInt(likesNumberText);

    // Check if the conversion was successful
    if (!isNaN(likesNumber)) {
      // Print the extracted likes number
      console.log('Likes Number:', likesNumber);
    } else {
      console.log('Unable to extract valid likes number.');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Specify the URL to scrape
const targetUrl = 'https://rategain.com/blog/';  // Replace with the actual URL

// Call the function with the target URL
scrapeTotalLikes(targetUrl);
