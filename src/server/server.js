const express = require('express');
const path = require('path');

const app = express();

// parse request to body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../views'));

// load assets
app.use('/css', express.static(path.resolve(__dirname, '../views/assets/css')));
app.use('/img', express.static(path.resolve(__dirname, '../views/assets/img')));
app.use('/js', express.static(path.resolve(__dirname, '../views/assets/js')));

// load fortawesome assets
app.use('/css', express.static(path.resolve(__dirname, '../../node_modules/@fortawesome/fontawesome-free/css')));
app.use('/js', express.static(path.resolve(__dirname, '../../node_modules/@fortawesome/fontawesome-free/js')));
app.use('/webfonts', express.static(path.resolve(__dirname, '../../node_modules/@fortawesome/fontawesome-free/webfonts')));

// load routers
app.use('/', require('../routes/cardsRoute'));

module.exports = app;
