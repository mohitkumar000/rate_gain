const axios = require('axios');
const cheerio = require('cheerio');
const ExcelJS = require('exceljs');
const fs = require('fs');

const scrap = async () => {
  try {
    const data = [];
    const response = await axios.get('https://rategain.com/blog/');
    const $ = cheerio.load(response.data);

    // For fetching all the dates
    const blog_date = $('.blog-detail .bd-item');

    // Store data in Excel file
    const outputFile = 'date.xlsx';
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('date');

    // Add headers
    worksheet.addRow(['Date Info']);

    // Add data to the worksheet and store in Excel file
    await blog_date.each((idx, el) => {
      const blogDate_data = {
        date_info: $(el).text()
      };
      data.push(blogDate_data);

      // Add data to the Excel worksheet
      worksheet.addRow([blogDate_data.date_info]);

      // Save the workbook to a file after each iteration
      workbook.xlsx.writeFile(outputFile)
        .then(() => console.log('Data saved to Excel file:', outputFile))
        .catch(error => console.error('Error saving to Excel file:', error));
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
};

scrap();
