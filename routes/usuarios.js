require('dotenv').config();
const express = require('express');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
const app = express();

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.get('/usuario', (req, res) => {
    res.json('GET usuario')
})

app.post('/usuario', (req, res) => {
    const { body } = req;
    const { nombre, edad } = body;
    const db = firebase.firestore();

    if(nombre == undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    } else {
        // res.json('POST usuario')
        db.collection('usuarios')
        .add({
            nombre,
            edad
        })
        .then(ref => {
            return res.json({
                ok: true,
                message: 'Usuario dado de alta con éxito.',
                id: ref.id,
            });
        })
        .catch(err => {
            console.log(err);
            return res.satatus(500).json({
                ok: false,
                err,
            });
        });
    }

    
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id
    res.json({
        id
    })
})
app.delete('/usuario', (req, res) => {
    res.json('DELETE usuario')
})

module.exports = app;