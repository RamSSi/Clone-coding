// https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
// 

const API_KEY = "962f8b6b6cfad0728c32939691af7250";

function printWeatherIcon(weather) {
  if (weather === "Clear") {
    return "clear_day";
  } 
  else if (weather === "Clouds") {
    return "cloudy";
  }
//    else if (weather === "Cloudy") {
//     return "cloudy"
//   } else if (weather === "Rain" || weather === "") {
    
//   } else if (weather === "") {
    
//   } else if (weather === "") {
    
//   } else if (weather === "") {
    
//   } else if () {
    
//   } else if () {
    
//   } else if () {
    
//   } else if () {
    
//   }
  else 
    return weather;
}

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = document.querySelector(".weather-container span:first-child");
      const temperature = document.querySelector(".weather-container span:nth-child(2)");
      const city = document.querySelector("#weather > span");
      city.innerText = data.name;
      // weather.innerText = `${data.weather[0].main}/${data.main.temp}`;
      weather.innerText = `${printWeatherIcon(data.weather[0].main)}`;
      console.log(weather.innerText);
      temperature.innerText = `${data.main.temp}`;
    });  
}

function onGeoError() {
  
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);   // 현재 사용자의 위치를 알려주는 메서드