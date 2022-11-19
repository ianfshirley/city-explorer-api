'use strict';

console.log('our first server');



// REQUIRE
// in our servers, we have to use 'require' instead of 'import'
// Here we will list the requirements for a server
const express = require('express');
// const data = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');
// const {parse, stringify} = require('flatted');
const getMovies = require('./components/movies');
const getWeather = require('./components/weather');


// we need to bring in our .env file
require('dotenv').config();

// USE
// once we have required something, we have to use it
// here is where we will assign the required file a variable
// React does this in one step with 'import', express takes 2 steps: require & use
const app = express();
// tell express to use cors
app.use(cors());

// define the PORT and validate that our .env file is working
const PORT = process.env.PORT || 3002;

// if we see our server running on 3002, then there is a problem with our .env file or how we are importing it

// ROUTES
// this is where we will write handlers for our endpoints

// create a basic default route
// app.get() correlates to axios.get()
// app.get() takes a parameter or a URL in quotes, and a callback function
app.get('/', (request, response) => {
  response.send('Hello from my server');
});

app.get('/weather', async (request, response) => {
  try{
    let lat = request.query.lat;
    let lon = request.query.lon;
    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3`;
    let newWeather = await axios.get(weatherURL);
    // console.log('here is weather data from api',stringify(newWeather.data));
    let newWeatherArr = newWeather.data.data.map((day) => new Forecast(day));
    response.status(200).send(newWeatherArr);

  } catch (error) {
    console.log(error);
    response.status(500).send('weather error');
  }
});

app.get('/movies', getMovies);


// this will run for any route not defined above (* is a catch-all)
app.get('*', (request, response) => {
  response.send('That route does not exist');
});

// ERRORS
// handle any errors
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

// CLASSES
class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.high = obj.high_temp;
    this.low = obj.low_temp;
    this.description = obj.weather.description.toLowerCase();
  }
}

// LISTEN
// start the server

// listen is an express method. it takes in a port value and a callback function
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


