const express = require('express');
const router = express.Router();
const https = require('https');

router.get('/', (req, res) => {
  var { searchString } = req.body;

  https
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchString}`,
      (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          res.status(200).json(JSON.parse(data));
        });
      }
    )
    .on('error', (err) => {
      console.log('Error: ' + err.message);
    });
});

module.exports = router;
