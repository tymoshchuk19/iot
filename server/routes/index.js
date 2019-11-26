var express = require('express');
var mqtt = require('../mqtt');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* abrir campainha */
router.get('/open', (req, res, next) => {
  mqtt.open();
});

module.exports = router;
