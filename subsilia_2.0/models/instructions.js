const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
    device: String,
    description: String,
    timestamp: String,
    user: String
});

module.exports = mongoose.model('Instructions', instructionSchema);