const express = require("express");
const bodyParser = require('body-parser');
const axios = require('axios');
const { authJwt } = require("../middlewares");

const Player = require("../models/player.model");
const scrapeClanMembers = require('../scrapers/scraper');
const scrapeBattleLogs = require('../scrapers/scrapeData');
const scrapeClanMembersWithLogs = require('../scrapers/scraper3');
const fetchBattleData = require("../scrapers/scrapePlayerDeck")

module.exports = (app) => {
  // Create a new player
  app.post(
    "/admin/createplayers",
    [authJwt.verifyToken, authJwt.isAdmin],
    async function getPlayerData(req,res) {
      try {
        const { playerTag, email,paylink } = req.body;
  
        // Find player data from the API based on playerTag
        const response = await axios.get('http://localhost:8080/battle-logs');
        const apiPlayers = response.data;
  
        // Find the specific player in the API response
        const playerData = apiPlayers.find(player =>
          player.playerLink.replace('/player/', '').toUpperCase() === playerTag.toUpperCase()
        );
  
        if (!playerData) {
          return res.status(404).json({ message: 'Player not found in API data' });
        }
        const PlayerName = playerData.playerName;
        const Fame = playerData.fame
  
        // Find or create player in the MongoDB database
        let player = await Player.findOne({ playerTag });
  
        if (!player) {
          player = new Player({  playerTag, email,paylink, playerName: playerData.playerName,fame:playerData.fame });
        } else {
          player.email = email,
          player.name = PlayerName; // Update name
        player.fame = Fame; // Update email if player already exists
        player.paylink = paylink
        }
  
        // Save the player to the database
        await player.save();
  
        return res.status(200).json({ message: 'Player information saved successfully', player });
      } catch (error) {
        return res.status(500).json({ errormsg: 'Internal Server Error, Error creating or updating player',error:error });
      }
    }
  );
  
  // Get all players
  app.get("/allplayers", async (req, res) => {
    try {
      const players = await Player.find();
      res.status(200).send(players);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Get a player by playerTag
  app.get("/bytagplayers/", async (req, res) => {
    try {
      const player = await Player.findOne({ playerTag: req.body.playerTag });
      if (!player) {
        return res.status(404).send();
      }
      res.status(200).send(player);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Ensure middleware is used before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


  // Define the route
  app.post('/player', async (req, res) => {
    const { tag } = req.body; // Extract the tag from the request body
  
    if (!tag) {
      return res.status(400).send({ error: 'Tag is required' });
    }
  
    const options = {
      method: 'GET',
      url: `https://id-game-checker.p.rapidapi.com/clash-royale/${tag}`,
      headers: {
        'x-rapidapi-key': 'b94b632529msh3b23831cf2fdbe7p1a143ajsn995ceb94de1f',
        'x-rapidapi-host': 'id-game-checker.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      return res.status(200).send(response.data);
    } catch (error) {
      return res.status(error.response ? error.response.status : 500).send({
        error: 'An error occurred while fetching player data'
      });
    }
  });

  // Update a player by playerTag
  app.patch(
    "/admin/updateplayers/",
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res) => {
      try {
        const player = await Player.findOneAndUpdate(
          { playerTag: req.body.playerTag },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!player) {
          return res.status(404).send();
        }
        res.status(200).send(player);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  );

  // Delete a player by playerTag
  app.delete(
    "/admin/deleteplayers/",
    [authJwt.verifyToken, authJwt.isAdmin],
    async (req, res) => {
      try {
        const player = await Player.findOneAndDelete({
          playerTag: req.body.playerTag,
        });
        if (!player) {
          return res.status(404).send();
        }
        res.status(200).send(player);
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );

// scrapers

app.get('/clan-members', async (req, res) => {
  try {
    const data = await scrapeClanMembers();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/battle-logs', async (req, res) => {
  try {
    const data = await scrapeBattleLogs();
    return res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/clan-members-with-logs', async (req, res) => {
  try {
    const data = await scrapeClanMembersWithLogs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/clan-members-with-logs-playerinfo', async (req, res) => {
  const { playerLink } = req.query;

  try {
    const data = await scrapeBattleLogs();
    const data2 = await scrapeClanMembers();

    // Filter the data based on the playerName
    const filteredData = data.filter(member => 
      member.playerLink.toLowerCase().replace("/player/","") === playerLink.toLowerCase()
    );
    const filteredData2 = data2.filter(member => 
      member.playertag.toLowerCase() === playerLink.toLowerCase()
    );

    if (filteredData.length > 0 || filteredData2.length > 0) {
      // Merge the objects while removing the 'rank' property
      const mergedData = {
        ...filteredData[0],
        ...filteredData2[0]
      };

      // Remove the 'rank' property from the merged object
      delete mergedData.rank; 

      // console.log(mergedData);
      res.json(mergedData);
    } else {
      res.status(404).json({ message: 'Player not found', player: playerLink });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// app.get('/api/battle-data', async (req, res) => {
//   try {
//     const data = await fetchBattleData();
    
//     res.send(data);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

app.get('/api/battle-data', async (req, res) => {
  const playerTag = req.query.tag;

  if (!playerTag) {
    return res.status(400).json({ error: 'Player tag is required' });
  }

  try {
    const data = await fetchBattleData(playerTag);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


};
