// const dashboard = document.getElementById(dashboard);
// CURRENT INFO
console.log("If this is logged, script.js is linked correctly.");
var currentDateEl = document.getElementById("date");
var currentImgEl = document.getElementById("weather-icon");
var currentTempEl = document.getElementById("temperature");
var currentWindEl = document.getElementById("wind");
var currentHumEl = document.getElementById("humidity");
// SEARCH SECTION
var searchBtn = document.getElementById("button");
var searchInput = document.getElementById("searchInput");
var searchDiv = document.getElementById("search-div");
// HISTORY BOX
var history = document.getElementById("history-box");
var currentCityEl = document.getElementById("city");
// 5 DAYS WEATHER
var dateBox = document.getElementById("dateBox");
var weatherImg = document.getElementById("weather-img");
var tempFiveDays = document.getElementById("tempFiveDays");
var windFiveDays = document.getElementById("windFiveDays");
var humidFiveDays = document.getElementById("humidFiveDays");
var fivedayContainer = document.getElementById("fiveday-weather");

// let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
// console.log(searchHistory);
// API KEY
var keyApi = "851d8dc7ff88812ec5f09a19967a38aa";

// CURRENT WEATHER
// var dayOne = moment().add('L', 1);
// $('#dateBox').text(todayDate);

function getApi(cityName) {
  console.log("getApi FIRED!");
  var callApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${keyApi}`;
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
      var name = data[0].name;
      getWeather(lat, lon, name);
      fiveDayForcast(lat, lon);
    });
}
// CURRENT WEATHER API WITH  DATE, AND WEATHER INFO
function getWeather(lat, lon, name) {
  // scoped
  // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  var callApi2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}&units=imperial`;
  fetch(callApi2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayWeather(data, name);
    });
}

function displayWeather(data, name) {
  if (!data) {
    return;
  }

  var todayDate = moment().format("L");
  currentDateEl.textContent = todayDate;
  // currentCityEl.innerHTML = searchInput.value;
  currentCityEl.textContent = name;
  console.log(data);
  currentTempEl.textContent = data.main.temp;
  currentHumEl.textContent = data.main.humidity;
  currentWindEl.textContent = data.wind.speed;
  currentImgEl.setAttribute(
    "src",
    "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
  );
  // finish adding up information for current weather
}
// weather for 5 days box
// 5 DAY WEATHER FORECAST
function fiveDayForcast(lat, lon) {
  var callApi3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${keyApi}&units=imperial`;
  fetch(callApi3)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      

      fivedayContainer.innerHTML = "";
      for (var i = 0; i < 5; i++) {
        console.log(`Iteration ${i * 8}`);
        var card = document.createElement("div");
        var h4 = document.createElement("h4");
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        var p3 = document.createElement("p");
        var imgEl = document.createElement("img");

        card.setAttribute("class", "day-1");
        h4.setAttribute("class", "date-box text-light");
        p1.setAttribute("class", "pt-1 pl-2 text-light");
        p2.setAttribute("class", "pt-1 pl-2 text-light");
        p3.setAttribute("class", "pt-1 pl-2 text-light");

        h4.textContent = data.list[i * 8].dt_txt;
        p1.textContent = "Temp: " + data.list[i * 8].main.temp + "°F";
        p2.textContent = `Wind: ${data.list[i * 8].wind.speed} mph`;
        p3.textContent = "Humidity: " + data.list[i * 8].main.humidity;
        imgEl.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" +
            data.list[i * 8].weather[0].icon +
            ".png"
        );
        
        fivedayContainer.appendChild(card);
        card.appendChild(h4);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(p3);
        card.appendChild(imgEl);
      }
    });
}

function InitiateSearch() {
  console.log("InitiateSearch FIRED!");
  let cityName = searchInput.value;
  console.log(cityName);

  getApi(cityName);
}

searchBtn.addEventListener("click", InitiateSearch);


// API call



// date-stamp for 5 days forcast
// const date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
