var express = require('express');
var router = express.Router();
var { isLogged } = require('../helpers/passport');
var instructions = require('../controllers/instructions')

/* GET homepage page. */
router.get('/dashboard', isLogged, function(req, res, next) {
  instructions.listar()
    .then(data => res.render('dashboard', { list: data }))
    .catch(error => res.send(error));
});

module.exports = router;
