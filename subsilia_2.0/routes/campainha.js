var express = require('express');
var mqtt = require('../helpers/mqtt')
var router = express.Router();

/* GET users listing. */
router.get('/open', function(req, res, next) {
  mqtt.open();
  res.send('Porta aberta.');
});

module.exports = router;
