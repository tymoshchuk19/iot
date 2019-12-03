var express = require('express');
var mqtt = require('../helpers/mqtt')
var router = express.Router();
var instructions = require('../controllers/instructions')
var { isLogged } = require('../helpers/passport');

/* GET users listing. */
router.get('/open', isLogged, function(req, res, next) {
  var date = new Date();
  date = (date.getDay()+1) + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + 'h';
  var newInstruction = {
    device: 'campainha',
    description: 'open',
    timestamp: date,
    user: req.user.username
  };

  mqtt.open();
  instructions.inserir(newInstruction)
    .then(dados => {
      instructions.listar()
        .then(data => res.render('dashboard', { list: data.reverse() }))
        .catch(erro => res.jsonp(erro));
    })
    .catch(erro => res.send(erro));
});

module.exports = router;
