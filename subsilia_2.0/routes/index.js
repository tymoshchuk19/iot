var express = require('express');
var router = express.Router();
const Users = require('../controllers/users')
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login-form');
});

/* POST registation form. */
router.post('/register', function(req, res, next) {
  Users.inserir(req.body)
    .then((dados) => res.render('login-form'))
    .catch((erro) => res.send(erro));
});

/* POST registation form. */
router.post('/login', passport.authenticate('local',
                        {
                          successRedirect: '/users/homepage',
                          failureRedirect: '/login'
                        })
);

/* GET registation page. */
router.get('/register', function(req, res, next) {
  res.render('registration-form');
});

module.exports = router;
