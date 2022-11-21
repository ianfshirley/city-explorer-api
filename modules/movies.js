'use strict';

const axios = require('axios');
let cache = require('./cache.js');


function getMovies(selectedCity) {
  let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${selectedCity}&page=1include_adult=false`;
  let key = `movies-${selectedCity}`;
  if (cache[key] && (Date.now() - cache[key].timestamp < 10000)) {
    console.log('Cache hit - movies');
  } else {
    console.log('Cache miss - movies');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(movieURL)
      .then(res => {
        return parseMovies(res.data);
      });
  }
  return cache[key].data;
}

function parseMovies(movieData) {
  try {
    const movieResults = movieData.results.map(movie => {
      return new Movie(movie);
    });
    let topTenMovies = movieResults.slice(0, 10);
    return Promise.resolve(topTenMovies);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movie {
  constructor(movie) {
    this.releaseDate = movie.release_date;
    this.title = movie.title;
    this.overview = movie.overview;
    this.url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }
}

module.exports = getMovies;
