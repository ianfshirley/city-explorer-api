'use strict';

console.log('our first server');



// REQUIRE
// in our servers, we have to use 'require' instead of 'import'
// Here we will list the requirements for a server
const express = require('express');
const data = require('./data/weather.json');
const cors = require('cors');


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

app.get('/weather', (request, response) => {

  let cityName = request.query.city_name;
  let selectedCity = data.filter(city => city.city_name === cityName);
  let weatherArr = selectedCity[0].data;
  console.log('weather array',weatherArr);
  let weatherResults = [];
  weatherArr.forEach(day => {
    let updatedDescription = `Low of ${day.min_temp}, high of ${day.max_temp} with ${day.weather.description.toLowerCase()}`;
    let forecastInfoObj = {
      description: updatedDescription,
      date: day.datetime
    };

    weatherResults.push(new Forecast(forecastInfoObj));
  });

  weatherResults.length < 1 ? response.status(500).send('Error. No weather data for this city.') : response.status(200).send(weatherResults);
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
    this.description = obj.description;
    this.date = obj.date;
  }
}

// LISTEN
// start the server

// listen is an express method. it takes in a port value and a callback function
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


