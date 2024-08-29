const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page to scrape
const url = "https://www.cwstats.com/clan/PPLCV9G2/log";

// Function to scrape data from the page
async function scrapeData() {
  try {
    // Fetch the HTML from the page
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Initialize an array to store the participant data
    const participants = [];

    // Select the table containing the player data
    const table = $("table.mantine-Table-table");

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
      const participantData = {
        rank,
        playerName,
        playerLink,
        decksUsed,
        boatAttacks,
        avgElixir,
        fame,
      };

      // Add the object to the participants array
      participants.push(participantData);
    });

    // Log the extracted data
    return participants;
  } catch (error) {
    console.error("Error scraping data:", error);
    return [];
  }
}

// Run the scraper
module.exports = scrapeData;
