const { Router } = require('express');
const Tweet = require('../models/Tweet.js');

module.exports = Router()
  .post('/', (req, res, next) => {
    Tweet
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .populate('comments')
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweets => res.send(tweets))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Tweet
      .findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  
  .delete('/:id', (req, res, next) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  });

// POST /api/v1/tweets to create a new tweet
// GET /api/v1/tweets to get all tweets
// GET /api/v1/tweets/:id to get a tweet by ID
// PATCH /api/v1/tweets/:id to update a tweets text ONLY
// DELETE /api/v1/tweets/:id to delete a tweet

// Update tweet routes
// GET /api/v1/tweets/:id to get a tweet by ID and all comments on the tweet










