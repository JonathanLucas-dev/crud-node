require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conexão ao banco de dados
mongoose.connect(process.env.DATABASE_STRING);
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => { console.log('Database Connected')});

// Comando para aceitar json
app.use(express.json());

// Rotas
const userRouter = require('./routes/users.js');
app.use('/users', userRouter);

// Porta
app.listen(3000, () => { console.log('Server running'); });