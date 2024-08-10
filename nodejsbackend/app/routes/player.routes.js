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
    async (req, res) => {
      try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).send(player);
      } catch (error) {
        res.status(400).send(error);
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
      console.error(error);
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
  const { playerName } = req.query;

  try {
    const data = await scrapeClanMembersWithLogs();

    // Filter the data based on the playerName
    const filteredData = data.filter(member => 
      member.playerName.toLowerCase() === playerName.toLowerCase()
    );

    if (filteredData.length > 0) {
      res.json(filteredData[0]);
    } else {
      res.status(404).json({ message: 'Player not found', player:playerName });
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
