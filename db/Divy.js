const mongoose = require('mongoose');

const divySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Divy = mongoose.model('Divy', divySchema);

module.exports = Divy;
