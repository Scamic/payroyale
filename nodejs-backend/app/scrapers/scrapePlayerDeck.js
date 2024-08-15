const axios = require('axios');
// Function to fetch and parse battle data
async function fetchBattleData(playerTag) {
  try {
    // Append the '#' symbol to the player tag
    const fullPlayerTag = `#${playerTag}`;

    // Make the request with the dynamic player tag
    const response = await axios.post('https://www.cwstats.com/spy', [fullPlayerTag, true], {
      headers: {
        'accept': 'text/x-component',
        'accept-language': 'en-US,en;q=0.6',
        'content-type': 'text/plain;charset=UTF-8',
        'next-action': '90e907408d87f8c053ade732df5844960fd8271c',
        'next-router-state-tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22spy%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2C%22%2Fspy%22%2C%22refresh%22%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
        'sec-ch-ua': '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'Referer': 'https://www.cwstats.com/spy',
        'Referrer-Policy': 'same-origin'
      }
    });

    // Log the raw response data
    // console.log('Raw response data:', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Throw error so it can be caught in the route handler
  }
}

module.exports = fetchBattleData;
