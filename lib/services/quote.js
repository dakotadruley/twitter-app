const request = require('superagent');

module.exports = (count = 1) => request
  .get(`https://ron-swanson-quotes.herokuapp.com/v2/quotes/${count}`)
  .then(res => res.body)
  .then(([{ quote }]) => quote);
