// const axios = require('axios');

// let getWeather = async (req, res, next) => {
//   try{
//     let lat = req.query.lat;
//     let lon = req.query.lon;
//     let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3`;
//     let newWeather = await axios.get(weatherURL);
//     // console.log('here is weather data from api',stringify(newWeather.data));
//     let newWeatherArr = newWeather.data.data.map((day) => new Forecast(day));
//     res.status(200).send(newWeatherArr);

//   } catch (error) {
//     Promise.resolve().then(() => {
//       throw new Error(error.message);
//     }).catch(next);
//   }
// };



// class Forecast {
//   constructor(obj) {
//     this.date = obj.datetime;
//     this.high = obj.high_temp;
//     this.low = obj.low_temp;
//     this.description = obj.weather.description.toLowerCase();
//   }
// }

// module.exports = getWeather;
