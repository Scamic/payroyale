const mongoose = require("mongoose");

// Define the schema for the Player model
const linkedAccountsSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
    },

    playerLink: {
      type: String,
      // unique:true,
      // required: true,
      match: /[0-9A-Za-z]/, // Ensures the playerTag matches the format #123a
    },
    playerAccounts: [
      {
        linkedAccountsTag: {
          type: String,
          required: true,
        },
      },
    ],
    securedTags: [
      {
        tag: String,
        playerId: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

// Create the Player model
const linkedAccounts = mongoose.model("LinkedAccounts", linkedAccountsSchema);
module.exports = linkedAccounts;
