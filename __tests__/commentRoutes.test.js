require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Comment = require('../lib/models/Comment');
const Tweet = require('../lib/models/Tweet');

describe('comment routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new comment', () => {
    return request(app)
      .post('/api/v1/comments')
      .send({
        tweetId: new mongoose.Types.ObjectId(),
        handle: '@test',
        text: 'test comment'
      })

      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tweetId: expect.any(String),
          handle: '@test',
          text: 'test comment',
          __v: 0
        });
      });
  });

  // it('gets a comment by id', async() => {
  //   const comment = await Comment.findById().populate('tweetId');
    
  //   return request(app)
  //     .get(`/api/v1/comments/${comment._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         _id: expect.any(String),
  //         tweetId: {
  //           ...comment.tweetId.toJSON(),
  //           _id:comment.tweetID.id
  //         },
  //         handle: comment.handle, 
  //         text: comment.text,  
  //         __v: 0
  //       });
  //     });
  // });

  it('updates comment by id', async() => {
    const tweet = await Tweet.create({ 
      handle: '@testing1', text: 'testing1' 
    });

    const comment = await Comment.create({
      tweetId: tweet._id,
      handle: '@comment',
      text: 'test comment' 
    });

    return request(app)
      .patch(`/api/v1/comments/${comment._id}`)
      .send({ text: 'test comment 2' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tweetId: expect.any(String),
          handle: '@comment', 
          text: 'test comment 2',  
          __v: 0
        });
      });
  });
  
  it('deletes comment by id', async() => {
    const tweet = await Tweet.create({ 
      handle: '@testing1', text: 'testing1' 
    });

    const comment = await Comment.create({
      tweetId: tweet._id,
      handle: '@comment',
      text: 'test comment'
    });

    return request(app)
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tweetId: expect.any(String),
          handle: '@comment', 
          text: 'test comment',  
          __v: 0
        });
      });
  });
});

