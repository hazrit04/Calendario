"use strict";

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserModel = require('./baseInit');
const EventModel = require('./eventInit');
const cors = require('cors');

const app = express();
const port = 3000
app.use(cors());

app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());

const registro = express.Router();
app.use('/registro', registro);



// Endpoint para registrar nuevos usuarios
registro.post('/signup', async (req, res) => {
    console.log(req.body.firstName);
    try {
            const newUser = new UserModel({firstName:req.body.firstName , lastName: req.body.lastName , email:req.body.email, password:req.body.password, role: 'USER'});
            await newUser.save();
    
            // Enviar una respuesta exitosa
            res.status(201).json({message: 'Usuario registrado con éxito'});
    }catch(error) {
        console.error(error);
        res.status(500).json({message: 'Error interno del servidor'});
    }
});

// Ruta para el inicio de sesión
registro.post('/login', async(req, res) => {

    try {
        // Buscar el usuario en la base de datos  , password :req.body.password 
        const user = await UserModel.findOne({email:req.body.email});
        console.log(req.body.password);
        if (user) {
            //Usuario autenticado con éxito
            res.status(200).json({message: 'Inicio de sesión exitoso'});
        }else {
            // Credenciales inválidas
            res.status(401).json({message: 'Credenciales incorrectas'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error interno del servidor'});
    }
});

// Endpoint para agregar eventos
registro.post('/saveEvent', async (req, res) => {
    try {
            const newEvent = new EventModel({title:req.body.title, location:req.body.location, date:req.body.date, time:req.body.time, category:req.body.category, description:req.body.description});
            await newEvent.save();
    
            // Enviar una respuesta exitosa
            res.status(201).json({message: 'Evento registrado con éxito'});
    }catch(error) {
        console.error(error);
        res.status(500).json({message: 'Error interno del servidor'});
    }
});


// Manejar errores 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Recurso no encontrado' });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  });
  
  // Conectar a la base de datos y luego iniciar el servidor
mongoose.connect('mongodb+srv://Seokjinnie:120304249203@cluster0.gaml5pm.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
        console.log('Conexión exitosa a la base de datos');
        app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
        });
})
        .catch((err) => console.error('Error al conectar a la base de datos', err));
