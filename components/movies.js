const axios = require('axios');

let getMovies = async (req, res, next) => {
  try {
    let selectedCity = req.query.selectedCity;
    console.log(req.query.name);
    let movieResults = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${selectedCity}&page=1include_adult=false`);
    let movies = movieResults.data.results.map(obj => new Movie(obj));
    console.log(movies);
    let topTenMovies = movies.slice(0, 10);
    res.send(topTenMovies);
    // console.log(topTenMovies);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
};

class Movie {
  constructor(movie) {
    console.log(movie);
    this.releaseDate = movie.release_date;
    this.title = movie.title;
    this.overview = movie.overview;
    this.url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }
}

module.exports = getMovies;
