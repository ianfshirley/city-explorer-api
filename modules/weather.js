'use strict';

const axios = require('axios');
let cache = require('./cache.js');

function getWeather(lat, lon) {
  const key = 'weather-' + lat + lon;
  const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit - weather');
  } else {
    console.log('Cache miss - weather');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(weatherURL)
      .then(response => parseWeather(response.data));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.date = day.datetime;
    this.high = day.high_temp;
    this.low = day.low_temp;
    this.description = day.weather.description.toLowerCase();
  }
}

module.exports = getWeather;
