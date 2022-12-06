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

function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#maintemp");
  mainTemp.innerHTML = `${temperature} degrees`;
  let skyForecast = response.data.weather[0].description;
  weatherDescription.innerHTML = `${skyForecast}`;
}

function changeCity(event) {
  event.preventDefault();
  cityName.innerHTML = cityInput.value;
  let apiKey = "78d593e7c2325f46be1a26082cd196c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appID=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

searchForm.addEventListener("submit", changeCity);
