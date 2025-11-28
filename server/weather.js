import express from "express";
import cors from "cors";
const app = express()
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
app.post("/api/getcity", (req, res) => {
  const { city } = req.body;        // extract the data sent from frontend
  if (!city) {
    return res.sendStatus(400)
  }
  console.log("City received:", city);
  res.json({ message: "City received"}); 
  console.log(city)
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`)
  .then(response => response.json())
  .then(data => {
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        console.log(latitude, longitude)
    })
    .catch(error => console.error(error))
});
app.listen(5500, () => console.log("Server running on port 5500"));
//my code from here onwards


//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true

