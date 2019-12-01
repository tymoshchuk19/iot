var express = require('express');
var router = express.Router();
const Users = require('../controllers/users')
var passport = require('passport');
var bcrypt = require('bcrypt');

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
  var user = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      Users.inserir(user)
        .then((dados) => res.render('login-form'))
        .catch((erro) => res.send(erro));
    })
  });
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
