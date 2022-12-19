let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let dayofweek = document.querySelector("#dayofweek");
let time = document.querySelector("#timeofday");

dayofweek.innerHTML = day;
time.innerHTML = hours + ":" + minutes;

let searchForm = document.querySelector("#search-form");

let cityName = document.querySelector("#cityname");
let cityInput = document.querySelector("#city-input");

let weatherDescription = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity-percentage");
let windElement = document.querySelector("#wind-speed");
let iconElement = document.querySelector("#icon");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);

  let forecast = response.data.daily[0, 1, 2, 3, 4, 5, 6];

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row text-center">`;

  days.forEach(function (forecastDay, index) {  
    if (index < 6) {
    forecastHTML = forecastHTML + `
  <div class="col-2">
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}" width="20px">
    <br />
   <span class="weather-forecast-day">
    ${formatDay(forecastDay.time)}
    </span>
    <br />
    <span class="weather-forecast-temperatures">
    <span class="weather-forecast-temp-max">
      ${Math.round(forecastDay.temperature.maximum)}°
      </span>
    <br />
    <span class="weather-forecast-temp-min">
      ${Math.round(forecastDay.temperature.minimum)}°

    </span>
    </span>
  </div>

`;
}}
);
forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  apiKey = `3fa1c42a0146db1776t473f0do8a7e9c`;
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#maintemp");
  mainTemp.innerHTML = `${temperature}°`;
  let skyForecast = response.data.weather[0].description;
  weatherDescription.innerHTML = `${skyForecast}`;
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `${humidity}`;
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${windSpeed}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  getForecast(response.data.coord);
}

function changeCity(event) {
  event.preventDefault();
  cityName.innerHTML = cityInput.value;
  let apiKey = "78d593e7c2325f46be1a26082cd196c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appID=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

searchForm.addEventListener("submit", changeCity);


