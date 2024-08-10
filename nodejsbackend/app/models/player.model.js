const mongoose = require('mongoose');

// Define the schema for the Player model
const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    playerTag: {
        type: String,
        // unique:true,
        required: true,
        match: /^#[0-9A-Za-z]{7,}$/ // Ensures the playerTag matches the format #123a
    },
    score: {
        type: Number,
        required: true
    },
    rewardEarned: {
        type: Number,
        required: true
    }
},
{timestamps:true});

// Create the Player model
const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
