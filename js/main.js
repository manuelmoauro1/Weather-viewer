document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  document.getElementById("obtener").addEventListener("click", obtenerSegunInput);
  const userWeather = document.getElementById("card-body");
  userLocation();

  async function obtenerSegunUbicacion(latitude, longitude) {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=667de518308564633d6ab9389577a4bf&units=metric";

    try {
      let response = await fetch(url);
      if (response.ok) {
        document.getElementById("hidden").classList.remove("hidden");
        document.getElementById("hidden").classList.add("wrapper");
        let json = await response.json();
        document.getElementById("imgWeather").src = "";
        if (json.weather[0].description == "clear sky") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/01d@4x.png";
        } else if (json.weather[0].description == "overcast clouds") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/04d@4x.png";
        } else if (json.weather[0].description == "mist") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/50d@4x.png";
        } else if (json.weather[0].description == "broken clouds") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/04d@4x.png";
        } else if (json.weather[0].description == "few clouds") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/02d@4x.png";
        } else if (json.weather[0].description == "light intensity drizzle rain") {
          document.getElementById("imgWeather").src = "images/lightintensity.png";
        } else if (json.weather[0].description == "scattered clouds") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/03d@4x.png";
        } else if(json.weather[0].main == "Rain") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/10d@4x.png";
        } else if(json.weather[0].main == "Thunderstorm") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/011d@4x.png";
        } else if(json.weather[0].main == "Snow") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/013d@4x.png";
        } else if(json.weather.main == "Drizzle") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/09d@4x.png"
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
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + inputUser + "&appid=667de518308564633d6ab9389577a4bf&units=metric";
    try {
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
        document.getElementById("imgWeather").src = "";
        if (json.weather[0].description == "clear sky") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/01d@4x.png";
        } else if (json.weather[0].description == "overcast clouds") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/04d@4x.png";
        } else if (json.weather[0].description == "mist") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/50d@4x.png";
        } else if (json.weather[0].description == "broken clouds") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/04d@4x.png";
        } else if (json.weather[0].description == "few clouds") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/02d@4x.png";
        } else if (json.weather[0].description == "light intensity drizzle rain") {
          document.getElementById("imgWeather").src = "images/lightintensity.png";
        } else if (json.weather[0].description == "scattered clouds") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/03d@4x.png";
        } else if(json.weather[0].main == "Rain") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/10d@4x.png";
        } else if(json.weather[0].main == "Thunderstorm") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/011d@4x.png";
        } else if(json.weather[0].main == "Snow") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/013d@4x.png";
        } else if(json.weather.main == "Drizzle") {
          document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/09d@4x.png"
        }
        document.getElementById("title").innerHTML = json.name + ", " + json.sys.country;
        document.getElementById("temperature").innerHTML = json.main.temp + "°C";
        document.getElementById("thermalSensation").innerHTML = "TS " + json.main.feels_like + "°C";
        document.getElementById("liteDescription").innerHTML = json.weather[0].description;
        document.getElementById("pressure").innerHTML = json.main.pressure + " Hpa";
        document.getElementById("humidity").innerHTML = json.main.humidity + "%";
        document.getElementById("wind").innerHTML = json.wind.deg + "°, " + json.wind.speed + "km/h";
      }
    } catch (error) {
      console.log(error);
    }
  }
});
