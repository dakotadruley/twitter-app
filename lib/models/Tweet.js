const mongoose = require('mongoose');
const getQuote = require('../services/quote');

const schema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 280
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.pre('validate', function(next) {
  if(this.text) return next();

  getQuote()
    .then(quote => this.text = quote)
    .then(() => next());
});

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'tweetId'
});

module.exports = mongoose.model('Tweet', schema);

// Update your model so if the text is empty you fetch a random quote from an API (e.g. the futurama API) and use that as text. Use mongoose middleware for this.

// { handle: 'ryan' } -> { handle: 'ryan', text: 'RANDOM QUOTE FROM API' }
