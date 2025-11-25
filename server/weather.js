const { name } = require("ejs");
const { response } = require("express");
fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true
