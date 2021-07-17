const desc = document.querySelector("#weather-desc");
const temp = document.querySelector("#weather-temp");
const loc = document.querySelector("#weather-loc");

const LS_COORDS = "coords";
const API_KEY = "363928dabc4c124ae84dcf3ffb1577b9";

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    const description = json.weather[0].description;
    const temperature = json.main.temp;
    const location = json.name;
    temp.innerText = `${Math.floor(temperature)}°C`;
    desc.innerText = `${description}`
    loc.innerText = `${location}`;
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(LS_COORDS, JSON.stringify(coordsObj));
}

function handelGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handelGeoError() {
  console.log("Can't get current position")
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handelGeoSuccess, handelGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(LS_COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    const latitude = parseCoords.latitude;
    const longitude = parseCoords.longitude;
    getWeather(latitude, longitude);
  }
}

function init() {
  loadCoords();
}

init();