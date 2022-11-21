'use strict';

const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.send('Hello from my server');
});
app.get('/weather', getWeather);
app.get('/movies', getMovies);
app.get('*', (request, response) => {
  response.send('That route does not exist');
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


