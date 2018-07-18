const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');

app.use(express.static(publicDir));
app.use(express.json());

const burrito = require('./routes/burritos');
app.use('/api/burritos', burrito);

module.exports = app;