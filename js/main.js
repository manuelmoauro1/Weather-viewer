document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  document
    .getElementById("obtener")
    .addEventListener("click", obtenerSegunInput);
  const userWeather = document.getElementById("card-body");
  userLocation();

  async function obtenerSegunUbicacion(latitude, longitude) {
    const url =
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=667de518308564633d6ab9389577a4bf&units=metric";

    try {
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
        document.getElementById("imgWeather").src = "";
        if (json.weather[0].description == "clear sky") {
          document.getElementById("imgWeather").src = "sunny.png";
        } else if (json.weather[0].description == "overcast clouds") {
          document.getElementById("imgWeather").src = "overcast.png";
        } else if (
          json.weather[0].description == "light rain" ||
          json.weather[0].description == "light intensity shower rain"
        ) {
          document.getElementById("imgWeather").src = "lightrain.png";
        } else if (json.weather[0].description == "mist") {
          document.getElementById("imgWeather").src = "mist.png";
        } else if (json.weather[0].description == "broken clouds") {
          document.getElementById("imgWeather").src = "broken.png";
        } else if (json.weather[0].description == "few clouds") {
          document.getElementById("imgWeather").src = "few.png";
        } else if (
          json.weather[0].description == "light intensity drizzle rain"
        ) {
          document.getElementById("imgWeather").src = "lightintensity.png";
        } else if (json.weather[0].description == "scattered clouds") {
          document.getElementById("imgWeather").src = "scatered.png";
        }
        document.getElementById("title").innerHTML =
          json.name + ", " + json.sys.country;
        document.getElementById("temperature").innerHTML =
          json.main.temp + "°C";
        document.getElementById("thermalSensation").innerHTML =
          "TS " + json.main.feels_like + "°C";
        document.getElementById("liteDescription").innerHTML =
          json.weather[0].description;
        document.getElementById("pressure").innerHTML =
          json.main.pressure + " Hpa";
        document.getElementById("humidity").innerHTML =
          json.main.humidity + "%";
        document.getElementById("wind").innerHTML =
          json.wind.deg + "°, " + json.wind.speed + "km/h";
      }
    } catch (error) {
      console.log(error);
    }
  }
  function userLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        obtenerSegunUbicacion(latitude, longitude);
      });
    }
  }

  async function obtenerSegunInput() {
    let inputUser = document.getElementById("inputUser").value;
    const url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      inputUser +
      "&appid=667de518308564633d6ab9389577a4bf&units=metric";
    try {
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
        document.getElementById("imgWeather").src = "";
        if (json.weather[0].description == "clear sky") {
          document.getElementById("imgWeather").src = "sunny.png";
        } else if (json.weather[0].description == "overcast clouds") {
          document.getElementById("imgWeather").src = "overcast.png";
        } else if (json.weather[0].description == "light rain" ||json.weather[0].description == "light intensity shower rain") {
          document.getElementById("imgWeather").src = "lightrain.png";
        } else if (json.weather[0].description == "mist") {
          document.getElementById("imgWeather").src = "mist.png";
        } else if (json.weather[0].description == "broken clouds") {
          document.getElementById("imgWeather").src = "broken.png";
        } else if (json.weather[0].description == "few clouds") {
          document.getElementById("imgWeather").src = "few.png";
        } else if (
          json.weather[0].description == "light intensity drizzle rain"
        ) {
          document.getElementById("imgWeather").src = "lightintensity.png";
        } else if (json.weather[0].description == "scattered clouds") {
          document.getElementById("imgWeather").src = "scatered.png";
        }
        document.getElementById("title").innerHTML =
          json.name + ", " + json.sys.country;
        document.getElementById("temperature").innerHTML =
          json.main.temp + "°C";
        document.getElementById("thermalSensation").innerHTML =
          "TS " + json.main.feels_like + "°C";
        document.getElementById("liteDescription").innerHTML =
          json.weather[0].description;
        document.getElementById("pressure").innerHTML =
          json.main.pressure + " Hpa";
        document.getElementById("humidity").innerHTML =
          json.main.humidity + "%";
        document.getElementById("wind").innerHTML =
          json.wind.deg + "°, " + json.wind.speed + "km/h";
      }
    } catch (error) {
      console.log(error);
    }
  }
});
