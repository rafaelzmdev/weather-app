import express from "express";
import cors from "cors";
const app = express()
app.use(express.json());
app.use(express.static('public'))
app.use(cors());
let weathercode, is_day, windspeed, temperature;
app.post("/api/getcity", (req, res) => {
  const { city } = req.body;       
  if (!city) {
    return res.sendStatus(400)
  }
  console.log("City received:", city);
  console.log(city)
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`)
   .then(response => response.json())
   .then (data => {
      const latitude = data.results[0].latitude;
      const longitude = data.results[0].longitude;
      if (!latitude || !longitude) {
        return res.status(404).json({ message: "City not found" });
      }
      console.log(latitude, longitude)
      fetch (`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&current_weather=true`)
        .then (response => response.json())
        .then(weatherData => {
          const { current_weather } = weatherData;
          const { weathercode, is_day, windspeed, temperature } = current_weather;
          res.json({
            city: city,
            weather: current_weather.weathercode,
            daynight: current_weather.is_day,
            wind: current_weather.windspeed,
            temp: current_weather.temperature
          })
          console.log(current_weather)
        })
    })
    .catch(error => console.error(error));
})
app.listen(3000, () => console.log("Server running on port 3000"));




