const User = require('../models/users');

var Users = module.exports;

//Devolve lista dos Users
Users.listar = () => {
    return User
        .find()
        .exec();
}

//Devolve User pelo email
Users.consultar = username => {
    return User
        .findOne({$or: [{ email: username}, { username: username }]})
        .exec();
}

//Insere um novo utilizador
Users.inserir = user => {
    var novo = new User(user);
    return User
        .findOneAndUpdate({ email: user.email}, novo, { upsert: true });
}