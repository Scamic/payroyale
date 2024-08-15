const axios = require("axios");
const cheerio = require("cheerio");

// URLs of the pages to scrape
const clanUrl = "https://www.cwstats.com/clan/PPLCV9G2";
const logUrl = "https://www.cwstats.com/clan/PPLCV9G2/log";

// Function to fetch and scrape clan members
async function scrapeClanMembers() {
  try {
    const { data } = await axios.get(clanUrl);
    const $ = cheerio.load(data);
    const members = [];

    $("table tbody tr").each((index, element) => {
      const member = {};
      member.role = $(element).find("td:nth-child(4)").text().trim();
      member.trophies = $(element).find("td:nth-child(3)").text().trim();
      members.push(member);
    });

    return members;
  } catch (error) {
    console.error("Error fetching clan members:", error);
    return [];
  }
}

// Function to fetch and scrape battle logs
async function scrapeBattleLogs() {
  try {
    const { data } = await axios.get(logUrl);
    const $ = cheerio.load(data);
    const battleLogs = [];

    const table = $("table.mantine-Table-table");
    const rows = table.find("tbody tr");

    rows.each((index, row) => {
      const columns = $(row).find("td");
      const logData = {
        playerName: $(columns[1]).find("a").text().trim(),
        decksUsed: $(columns[2]).text().trim(),
        boatAttacks: $(columns[3]).text().trim(),
        avgElixir: $(columns[4]).text().trim(),
        fame: $(columns[5]).text().trim(),
      };

      battleLogs.push(logData);
    });

    return battleLogs;
  } catch (error) {
    console.error("Error fetching battle logs:", error);
    return [];
  }
}

// Function to merge clan members with their battle logs
async function scrapeClanMembersWithLogs() {
  try {
    const [members, battleLogs] = await Promise.all([
      scrapeClanMembers(),
      scrapeBattleLogs(),
    ]);

    const logsByPlayerName = {};
    battleLogs.forEach((log) => {
      logsByPlayerName[log.playerName.toLowerCase()] = log;
    });

    const membersWithLogs = members
      .map((member) => {
        const log = logsByPlayerName[member.role.toLowerCase()] || null;
        if (log) {
          return {
            role: member.role,
            trophies : member.trophies,
            playerName: log.playerName,
            decksUsed: log.decksUsed,
            boatAttacks: log.boatAttacks,
            avgElixir: log.avgElixir,
            fame: log.fame,
          };
        } else {
          return null;
        }
      })
      .filter((member) => member !== null);

    // Output the combined data
    return membersWithLogs;
  } catch (error) {
    console.error("Error merging data:", error);
    return [];
  }
}

// Run the scraper
module.exports = scrapeClanMembersWithLogs;
