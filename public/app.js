document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("inputbutton");
    const input = document.getElementById("cityname");
    let temp, weather, daynight, wind;
    let label;
    button.addEventListener("click", () => {
        const city = input.value;
        document.getElementById("loader").classList.remove("hidden"),
        document.getElementById("loader").classList.add("visible")
        fetch("http://localhost:3000/api/getcity", {
            method: "POST",                     
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({city})
        })      
        .then(response => { return response.json();
        })
        .then(data => {
            weather = data.weather,
            daynight = data.daynight,
            wind = data.wind,
            temp = data.temp
            fahrenheitemp = (temp * 9/5 +32)
            console.log(city, weather, daynight, wind, temp)
            document.getElementById("loader").classList.remove("visible"),
            document.getElementById("loader").classList.add("hidden")
            document.getElementById("panel").classList.remove("hidden");
            document.getElementById("panel").classList.add("visible");
            //copied this repetitive part of code from a stack overflow post; working fine lol (except for the label thing; had to do that manually)
            const weatherIconMapping = {
            0: { day: "wi-day-sunny", night: "wi-night-clear", label: "clear" },         
            1: { day: "wi-day-sunny-overcast", night: "wi-night-partly-cloudy", label:"partly cloudy" }, 
            2: { day: "wi-day-cloudy", night: "wi-night-cloudy", label: "cloudy"},       
            3: { day: "wi-cloudy", night: "wi-cloudy", label: "cloudy"},                 
            45: { day: "wi-fog", night: "wi-fog", label: "foggy" },                     
            48: { day: "wi-fog", night: "wi-fog", label: "foggy" },                     
            51: { day: "wi-sprinkle", night: "wi-sprinkle", label: "sprinkling" },            
            53: { day: "wi-sprinkle", night: "wi-sprinkle", label: "sprinkling" },
            55: { day: "wi-sprinkle", night: "wi-sprinkle", label: "sprinkling" },
            61: { day: "wi-rain", night: "wi-rain", label: "raining" },                  
            63: { day: "wi-rain", night: "wi-rain", label: "raining" },
            65: { day: "wi-rain", night: "wi-rain", label: "raining" },
            71: { day: "wi-snow", night: "wi-snow", label: "snowing" },                   
            73: { day: "wi-snow", night: "wi-snow", label: "snowing" },
            75: { day: "wi-snow", night: "wi-snow", label: "snowing" },
            80: { day: "wi-showers", night: "wi-showers", label: "showering" },              
            81: { day: "wi-showers", night: "wi-showers", label: "showering" },
            82: { day: "wi-showers", night: "wi-showers", label: "showering" },
            95: { day: "wi-thunderstorm", night: "wi-thunderstorm", label: "thundering" },    
            96: { day: "wi-storm-showers", night: "wi-storm-showers", label: "storming" },
            99: { day: "wi-storm-showers", night: "wi-storm-showers", label: "storming" }
            }
            const label = label
            const iconElement = document.getElementById("icon");
            const weatherCode = weather;
            const isDay = daynight === 1;
            const iconClass = weatherIconMapping[weatherCode]
                        ? weatherIconMapping[weatherCode][isDay ? "day" : "night"]
                        : "wi-na"; // fallback
            iconElement.className = `wi ${iconClass}`;
            document.getElementById("label").innerHTML = label;
            document.getElementById("city").innerHTML = city;
        }
        ) 
        .catch(err => console.error(err));
    });
});
