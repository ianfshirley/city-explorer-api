'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

const app = express();
app.use(cors());
app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);

const PORT = process.env.PORT || 3002;

function weatherHandler(request, response) {
  // const { lat, lon } = request.query;
  const lat = request.query.lat;
  const lon = request.query.lon;
  getWeather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong with weatherHandler!');
    });
}

function movieHandler(req, res) {
  const selectedCity = req.query.selectedCity;
  getMovies(selectedCity)
    .then(movies => res.send(movies))
    .catch((error) => {
      console.log(error);
      res.status(500).send('Sorry. Something went wrong with movieHandler!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
