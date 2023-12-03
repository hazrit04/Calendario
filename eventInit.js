"use strict";

const mongoose = require('mongoose');

let MongoDB = 'mongodb://127.0.0.1:27017/UsersDB'
let options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MongoDB, options);

// Eventos del usuario
let eventSchema = mongoose.Schema({
    title: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    category: {
        type: String
    },
    description: String

})

const EventModel = mongoose.model('Event', eventSchema);
module.exports = EventModel;
