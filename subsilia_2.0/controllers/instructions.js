const Instruction = require('../models/instructions');

var Instructions = module.exports;

//Devolve lista dos Users
Instructions.listar = () => {
    return Instruction
        .find()
        .exec();
}

//Devolve User pelo email
Instructions.consultar = id => {
    return Instruction
        .findOne({_id: id})
        .exec();
}

//Insere um novo utilizador
Instructions.inserir = instruction => {
    var newInstruction = new Instruction(instruction);
    return newInstruction.save();
}