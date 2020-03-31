require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

port = process.env.PORT || 3000

app.use(require('./routes/usuarios.js'));

app.listen(port, () => console.log(`Escuchando el puerto ${port}`))