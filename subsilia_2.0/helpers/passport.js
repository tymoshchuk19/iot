var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var users = require('../controllers/users');

//Configuração da estrategia local
passport.use(new LocalStrategy(
    { usernameField:'email' },
    (email,password, done) => { 
      users.consultar(email)
        .then(user => {
          if(!user) { return done(null, false, { message: 'Credenciais inválidas!\n' }) }
          if(password != user.password) { return done(null, false, {message: 'Credenciais inválidas!\n'})}
          return done(null, user)
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