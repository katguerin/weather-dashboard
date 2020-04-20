var d = new Date();
document.getElementById("current-date").innerHTML = d.toDateString();
 
var citySearchFormEl = document.querySelector("#city-search-form")
var citySearchEl = document.querySelector("#city-search-term");

var searchCity = function(city) {
   var currentApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=fa8e42eb3573f0b76fce94969c4e58b4";
   var forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=imperial&appid=fa8e42eb3573f0b76fce94969c4e58b4";
   
   fetch(currentApiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        document.getElementById("city").textContent = data.name;
        document.getElementById("temp").textContent = data.main.temp;
        document.getElementById("humidity").textContent = data.main.humidity;
        document.getElementById("wind-speed").textContent = data.wind.speed;
        // document.getElementById("uv-index").textContent = data.?;
      });
    } else {
      alert("Error: " + response.statusText);
    }
    })
    fetch(forecastApiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data);
            // document.getElementById("city").textContent = data.name;
            // document.getElementById("temp").textContent = data.main.temp;
            // document.getElementById("humidity").textContent = data.main.humidity;
            // document.getElementById("wind-speed").textContent = data.wind.speed;
            // document.getElementById("uv-index").textContent = data.?;
          });
        } else {
          alert("Error: " + response.statusText);
        }
        })
    
    



        // .catch(function(error) {
        //     alert("Unable to get weather at this time. Please try again later!");
        // })
}


var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var citySearched = citySearchEl.value;
    if (citySearched) {
        searchCity(citySearched);
        citySearchEl.value = "";
    } else {
        alert("Please search for a city");
    }

};






citySearchFormEl.addEventListener("submit", formSubmitHandler);