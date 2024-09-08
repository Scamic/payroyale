const axios = require('axios');

const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjYwOTg2MjYyLTE2YTgtNDc4NS05ZjNhLTMwZGQwNTMyOTUxYyIsImlhdCI6MTcyMzE1NzgwMywic3ViIjoiZGV2ZWxvcGVyLzA2YTAzYWZlLTE2ODUtZGExYi0zMzZjLTIzNDE2ZmE3NzQyNyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNS4yMjcuMTM4LjE2Il0sInR5cGUiOiJjbGllbnQifV19.4g_vVdvGko_W3NttMERQPvApcYkx5w0s-iHQbQFYzvkMOmW5HvHZSAgx72uu-jZRaXnxrGU6ubsBt9IgUkCLbA';
const playerTag = '#COG20PR2'; // Example player tag
const encodedTag = encodeURIComponent(playerTag);

async function fetchPlayerStats() {
  try {
    const response = await axios.get(`https://api.clashroyale.com/v1/players/${encodedTag}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const playerData = response.data;
    // console.log(playerData); // Player stats data

    // You can now send this data to your website
  } catch (error) {
    console.error('Error fetching player stats:', error);
  }
}

fetchPlayerStats();
