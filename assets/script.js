var d = new Date();
document.getElementById("current-date").innerHTML = d.toDateString();

var dayContainerEl = document.querySelector(".card")
var citySearchFormEl = document.querySelector("#city-search-form")
var citySearchEl = document.querySelector("#city-search-term");

var searchCity = function(city) {
   var currentApiUrl = "https://api.weatherbit.io/v2.0/current?city=" + city + "&units=I&key=3ed02ab5fa2d4251bf19702f55c6f764";
   var forecastApiUrl = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + city + "&days=5&units=I&key=3ed02ab5fa2d4251bf19702f55c6f764";
   
   fetch(currentApiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
          console.log(data);
        document.getElementById("city").textContent = data.data[0].city_name;
        document.getElementById("temp").textContent = data.data[0].temp;
        document.getElementById("humidity").textContent = data.data[0].rh;
        document.getElementById("wind-speed").textContent = data.data[0].wind_spd;
        document.getElementById("uv-index").textContent = data.data[0].uv;
      });
    } else {
      alert("Error: " + response.statusText);
    }
    })

    var fiveDayForecast = function(day) {

    for (var i = 0; i < day.data.length; i++) {
        console.log(day.data[i].temp);
        var daynum = 'day' + (i+ 1);
        document.getElementById(daynum + '-date').textContent = day.data[i].valid_date;
        document.getElementById(daynum + '-temp').textContent = day.data[i].temp;
        document.getElementById(daynum + '-humidity').textContent = day.data[i].rh;
        document.getElementById(daynum + '-img').textContent = day.data[i].weather.icon;
        }
    }

    fetch(forecastApiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data);
           fiveDayForecast(data);
          });
        } else {
          alert("Error: " + response.statusText);
            }
        })
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