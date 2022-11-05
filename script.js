// const dashboard = document.getElementById(dashboard);
// CURRENT INFO
var currentCityEl = document.getElementById("city");
var currentDateEl = document.getElementById("date");
var currentImgEl = document.getElementById("weather-icon");
var currentTempEl = document.getElementById("temperature");
var currentWindEl = document.getElementById("wind");
var currentImgEl = document.getElementById("humidity");
// SEARCH SECTION
var searchBtn = document.getElementById("button");
var searchInput = document.getElementById("searchInput");
var searchDiv = document.getElementById("search-div");
// HISTORY BOX
var history = document.getElementById("history-box");
// 5 DAYS WEATHER
var dateBox = document.getElementById("dateBox");
var weatherImg = document.getElementById("weather-img");
var tempFiveDays = document.getElementById("tempFiveDays");
var windFiveDays = document.getElementById("windFiveDays");
var humidFiveDays = document.getElementById("humidFiveDays");

let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);
// API KEY
var keyApi = "851d8dc7ff88812ec5f09a19967a38aa";

// DATE GOES INFRONT OF CITY
var todayDate = moment().format("L");
currentDateEl.textContent = todayDate;
// DATE FOR DAY-1
// var dayOne = moment().add('L', 1);
// $('#dateBox').text(todayDate);

function getApi(cityName) {
  console.log("getApi FIRED!");
  var callApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${keyApi}`;
  console.log(callApi);
  fetch(callApi)
    .then(function (response) {
      console.log(callApi);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // return data.city;

      var lat = data[0].lat;
      var lon = data[0].lon;

      getWeather(lat, lon);
    });


}

function getWeather(lat, lon) {
  // scoped
    // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  var callApi2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keyApi}`;
  fetch(callApi2)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    displayWeather(data);
  })
}

function displayWeather(data) {
  currentTempEl.textContent = data.list[0].main.temp;
  // finish adding up information for current weather
}
// 


// getApi("Montreal");
function InitiateSearch() {
  console.log("InitiateSearch FIRED!");
  let cityName = searchInput.value;
  console.log(cityName);

  getApi(cityName);
}

searchBtn.addEventListener("click", InitiateSearch);

// 5 DAY WEATHER FORECAST
// API call


// Coordinates by location name
// API call
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// $('#search-btn').on('click', function (event) {
// Preventing the button from trying to submit the form
// event.preventDefault();
// API KEY 851d8dc7ff88812ec5f09a19967a38aa
