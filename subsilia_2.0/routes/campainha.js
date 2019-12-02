var express = require('express');
var mqtt = require('../helpers/mqtt')
var router = express.Router();
var instructions = require('../controllers/instructions')
var { isLogged } = require('../helpers/passport');

/* GET users listing. */
router.get('/open', isLogged, function(req, res, next) {
  var newInstruction = {
    device: 'campainha',
    description: 'open',
    timestamp: new Date(),
    user: req.user.email
  };
  mqtt.open();
  instructions.inserir(newInstruction)
    .then(dados => res.render('dashboard'))
    .catch(erro => res.send(erro));
});

module.exports = router;
