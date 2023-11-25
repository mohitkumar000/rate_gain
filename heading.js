const axios = require('axios');
const cheerio = require('cheerio');
const ExcelJS = require('exceljs');

const scrap = async () => {
  try {
    const data = [];
    const response = await axios.get('https://rategain.com/blog/');
    const $ = cheerio.load(response.data);

    // for fetching heading data
    const headingText = $('.heading').text();
    console.log("heading = " + headingText);

    // Store data in Excel file
    const outputFile = 'scraped_heading_data.xlsx';
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Scraped Heading Data');

    // Add headers
    worksheet.addRow(['heading']);

    // Add heading to the worksheet and store in Excel file
    worksheet.addRow([headingText]);

    // Save the workbook to a file
    await workbook.xlsx.writeFile(outputFile);

    console.log('Data saved to Excel file:', outputFile);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

scrap();
