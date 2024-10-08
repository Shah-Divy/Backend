
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        data: Buffer,
        contentType: String
    }],
    phoneNumber: {
        type: String,
        required: true
    },
    sqft: {
        type: Number,
        required: true
    },
    bed: {
        type: Number,
        required: true
    },
    bath: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    ownername: {
        type: String,
        required: true
    },
    FurnishedStatus: {
        type: String,
        required: true
    },
    Perferredfor: {
        type: String,
        required: true
    },
    ageofconstruction: {
        type: Number,
        required: true
    },
    deposit: {
        type: Number,
        required: true
    },
    Availability: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
