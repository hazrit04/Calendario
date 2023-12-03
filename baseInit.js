"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let MongoDB = 'mongodb://127.0.0.1:27017/UsersDB'
let options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(MongoDB, options);

let userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String, 
        require: true
    },
    email: {
        type: String, 
        unique: true,
        require: true
    },
    password: {
        type: String, 
        require: true
    },
    date: Date,
    role: {
        type: String, 
        enum: ['ADMIN', 'USER'], 
        require: true
    }

});


// Middleware para hashear la contraseña antes de guardar en la base de datos
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

