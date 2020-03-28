const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 280
  }
});

module.exports = mongoose.model('Tweet', tweetSchema);

// Update your model so if the text is empty you fetch a random quote from an API (e.g. the futurama API) and use that as text. Use mongoose middleware for this.

// { handle: 'ryan' } -> { handle: 'ryan', text: 'RANDOM QUOTE FROM API' }
