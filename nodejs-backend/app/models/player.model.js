const mongoose = require('mongoose');

// Define the schema for the Player model
const playerSchema = new mongoose.Schema({
    playerName: {
        type:String
    },
    fame:{
        type:Number
    },
  
    playerTag: {
        type: String,
        // unique:true,
        required: true,
        match: /[0-9A-Za-z]/ // Ensures the playerTag matches the format #123a
    },
    email: {
        type: String,
        required: true
    },
    paylink: {
        type: String,
        required: true
    },
    // paypalid: {
    //     type: String,
    //     required: true
    // }
    
},
{timestamps:true});

// Create the Player model
const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
