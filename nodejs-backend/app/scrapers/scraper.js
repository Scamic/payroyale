const axios = require("axios");
const cheerio = require("cheerio");

// URL of the page to scrape
const url = "https://www.cwstats.com/clan/PPLCV9G2";

// Function to fetch and scrape data
async function scrapeClanMembers() {
  try {
    // Fetch the HTML of the page
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Array to store clan members' details
    const members = [];

    // Scrape each member's details
    $("table tbody tr").each((index, element) => {
      const member = {};

      // Extract data from each column
      member.rank = $(element).find("td:nth-child(1)").text().trim();
      member.name = $(element).find("td:nth-child(4)").text().trim();
      member.trophies = $(element).find("td:nth-child(3)").text().trim();
      member.role = $(element).find("td:nth-child(7)").text().trim();
      member.lastseen = $(element).find("td:nth-child(6)").text().trim();
      member.level = $(element).find("td:nth-child(8)").text().trim();
      member.playertag = $(element).find("td:nth-child(4) a").attr("href").split("/").pop().trim();

      // Add member details to the array
      members.push(member);
    });

    // Output the details
    return members;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Run the scraper
module.exports = scrapeClanMembers;
