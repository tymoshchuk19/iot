var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var users = require('../controllers/users');
var bcrypt = require('bcrypt');

//Configuração da estrategia local
passport.use(new LocalStrategy(
    { usernameField:'username' },
    (username,password, done) => { 
      users.consultar(username)
        .then(user => {
          if(!user) { return done(null, false, { message: 'Credenciais inválidas!\n' }) }
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {message: 'Credenciais inválidas!\n'});
            }
          })
        })
        .catch(erro => done(erro))
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  
  passport.deserializeUser((email, done) => {
    users.consultar(email)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

module.exports.isLogged = (req, res, next) => {
  if(req.isAuthenticated()) next();
  else res.redirect('/login')
}