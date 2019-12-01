var express = require('express');
var router = express.Router();
var { isLogged } = require('../helpers/passport');

/* GET homepage page. */
router.get('/homepage', isLogged, function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
