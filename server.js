'use strict';

console.log('our first server');

// REQUIRE
// in our servers, we have to use 'require' instead of 'import'
// Here we will list the requirements for a server
const express = require('express');
const data = require('./data/weather.json');

// we need to bring in our .env file
require('dotenv').config();

// USE
// once we have required something, we have to use it
// here is where we will assign the required file a variable
// React does this in one step with 'import', express takes 2 steps: require & use
const app = express();

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

app.get('/weather', (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let searchQuery = data.filter(city => (city.lat === lat && city.lon === lon));
  // response.send(searchQuery);
  let forecast = new Forecast(searchQuery);
  forecast.length < 1 ? response.status(500).send('Error. No weather data for this city.') : response.status(200).send(forecast);
});

// this will run for any route not defined above (* is a catch-all)
app.get('*', (request, response) => {
  response.send('That route does not exist');
});

// ERRORS
// handle any errors

// CLASSES
class Forecast {
  constructor(obj) {
    this.day1 = {
      date: obj[0].data[0].datetime,
      description: obj[0].data[0].description
    };
  }
}

// LISTEN
// start the server

// listen is an express method. it takes in a port value and a callback function
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

