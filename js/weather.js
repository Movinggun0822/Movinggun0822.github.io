const weather = document.querySelector(".js-weather"),
    weatherTemp = weather.querySelector(".js-weather_temperature"),
    weatherLocation = weather.querySelector(".js-weather_location"),
    weatherIcon = document.querySelector(".weather-icon");

const COORDS = 'coords';
const API_KEY = "a1d9f12abbe2e549a2ddbe0b1e7f884e";

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        const icon = json.weather[0].icon;
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" />`
        weatherTemp.innerText = `${temperature} ℃`;
        weatherLocation.innerText = place;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();