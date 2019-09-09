var express = require('express');
var router = express.Router();
const client = require('../config/mqtt');

/* GET home page. */
router.get('/campainha', (req, res, next) => {
  client.opendoor()
  res.status(200).end()
});

module.exports = router;
