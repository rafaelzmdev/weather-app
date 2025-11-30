document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("inputbutton");
    const input = document.getElementById("cityname");
    let temp, weather, daynight, wind;
    button.addEventListener("click", () => {
        const city = input.value;
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
            console.log(city, weather, daynight, wind, temp, "These variables should now be perfectly assigned and separated so I can use them in a bigger scope")
        }
    )
        .catch(err => console.error(err));
    });
});

