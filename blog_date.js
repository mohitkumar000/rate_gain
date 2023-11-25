//this is for the image links and links are store in imageLinks.txt
// Web Scrapping using Node js and Cherio Request
// npm install cherio
// npm install request

// Imports 
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

// Create a Write Stream 
var WriteStream  = fs.createWriteStream("ImagesLink.txt", "UTF-8");



request('https://rategain.com/blog/', (err, resp, html)=>{

    if(!err && resp.statusCode == 200){
        console.log("Request was success ");
        
        // Define Cherio or $ Object 
        const $ = cheerio.load(html);

        $("img").each((index, image)=>{

            var img = $(image).attr('src');
            var baseUrl = 'https://rategain.com/blog/';
            var Links = baseUrl + img;
            WriteStream.write(Links);
            WriteStream.write("\n");
        });

    }else{
        console.log("Request Failed ");
    }

});


