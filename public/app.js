// get a button here to wait on the city name
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("inputbutton");
    const input = document.getElementById("cityname");
    button.addEventListener("click", () => {
        const city = input.value;
        fetch("http://localhost:3000/api/getcity", {
            method: "POST",                     // sending data
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({city})
        })      // wrap it in an object
        .then(response => { return response.json();
        })
        .then(data => console.log("Backend responded:", data))
        .catch(err => console.error(err));
    });
});

