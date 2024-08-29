const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page to scrape
const url = "https://www.cwstats.com/clan/PPLCV9G2/race";

// Function to scrape data from the page
async function scrapeRaceData() {
  try {
    // Fetch the HTML from the page
    const { data } = await axios.get(url, {
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Brave\";v=\"127\", \"Chromium\";v=\"127\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1"
      },
      referrerPolicy: "same-origin",
      method: "GET"
    });

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Initialize an array to store the data
    const raceData = [];

    // Select the table containing the relevant data
    const table = $("table.mantine-Table-table"); // Adjust this selector to the correct one based on the HTML structure

    // Select all rows in the tbody (ignoring the header)
    const rows = table.find("tbody tr");

    // Iterate through each row to extract data
    rows.each((index, row) => {
      const columns = $(row).find("td");

      const rank = $(columns[0]).text().trim();
      const playerName = $(columns[1]).find("a").text().trim();
      const playerLink = $(columns[1]).find("a").attr("href");

      const decksUsed = $(columns[2]).text().trim();
      const boatAttacks = $(columns[3]).text().trim();
      const avgElixir = $(columns[4]).text().trim();
      const fame = $(columns[5]).text().trim();

      // Create an object with the extracted data
      const raceParticipantData = {
        rank,
        playerName,
        playerLink,
        decksUsed,
        boatAttacks,
        avgElixir,
        fame,
      };

      // Add the object to the raceData array
      raceData.push(raceParticipantData);
    });

    // Log the extracted data
    // console.log(raceData) ;
  } catch (error) {
    console.error("Error scraping data:", error);
    return [];
  }
}

// Run the scraper
scrapeRaceData();