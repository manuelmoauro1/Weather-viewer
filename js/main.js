document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  document.getElementById("obtener").addEventListener("click", obtenerSegunInput);
  userLocation();

  // All the lines below are to get te current weather, with the user location and with the input.
  async function obtenerSegunUbicacion(latitude, longitude) {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=667de518308564633d6ab9389577a4bf&units=metric";

    try {
      let response = await fetch(url);
      if (response.ok) {
        document.getElementById("hidden").classList.remove("hidden");
        document.getElementById("hidden").classList.add("wrapper");
        let json = await response.json();

        document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/" + json.weather[0].icon + "@4x.png";
        document.getElementById("title").innerHTML = json.name + ", " + json.sys.country;
        document.getElementById("temperature").innerHTML = json.main.temp + "°C";
        document.getElementById("thermalSensation").innerHTML = "TS " + json.main.feels_like + "°C";
        document.getElementById("liteDescription").innerHTML = json.weather[0].description;
        document.getElementById("pressure").innerHTML = json.main.pressure + " Hpa";
        document.getElementById("humidity").innerHTML = json.main.humidity + "%";
        document.getElementById("wind").innerHTML = json.wind.deg + "°, " + json.wind.speed + "km/h";

        let latitude = json.coord.lat;
        let longitude = json.coord.lon;
        sevenDaysWeather(latitude, longitude);
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  // Get user location coords.
  function userLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setTimeout(function() {mapa(latitude, longitude)}, 400);
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

        document.getElementById("imgWeather").src = "http://openweathermap.org/img/wn/" + json.weather[0].icon + "@4x.png";
        document.getElementById("title").innerHTML = json.name + ", " + json.sys.country;
        document.getElementById("temperature").innerHTML = json.main.temp + "°C";
        document.getElementById("thermalSensation").innerHTML = "TS " + json.main.feels_like + "°C";
        document.getElementById("liteDescription").innerHTML = json.weather[0].description;
        document.getElementById("pressure").innerHTML = json.main.pressure + " Hpa";
        document.getElementById("humidity").innerHTML = json.main.humidity + "%";
        document.getElementById("wind").innerHTML = json.wind.deg + "°, " + json.wind.speed + "km/h";

        let latitude = json.coord.lat;
        let longitude = json.coord.lon;
        sevenDaysWeather(latitude, longitude);
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  // I will get the weather for the next 7 days
  async function sevenDaysWeather(latitude, longitude) {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=667de518308564633d6ab9389577a4bf&units=metric";

    try {
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();

        for (let i = 1; i < 8; i++) {
          document.getElementById("sevenImg" + i).src = "http://openweathermap.org/img/wn/" + json.daily[i].weather[0].icon + "@4x.png";
          document.getElementById("sevenImg" + i).classList.add("imgSeven");
          document.getElementById("maxT" + i).innerHTML = "Max: " + json.daily[i].temp.max + "°C";
          document.getElementById("maxT" + i).classList.add("maxT");
          document.getElementById("minT" + i).innerHTML = "Min: " + json.daily[i].temp.min + "°C";
          document.getElementById("minT" + i).classList.add("minT");
          document.getElementById("liteDescriptionSeven" + i).innerHTML = json.daily[i].weather[0].description;
          document.getElementById("humiditySeven" + i).innerHTML = "Hum:<br>" + json.daily[i].humidity + "%";
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  function mapa(latitude, longitude) {
    var mymap = L.map('mapid').setView([latitude, longitude], 6);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFudWVsbW9hdXJvMSIsImEiOiJja2JmYXg4NjEwN2ZrMnRwdjRrcXhqZG95In0.Le_kSjcJI_74rOvbQiwZ_Q',{
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      subdomains:['mt0','mt1','mt2','mt3'],
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(mymap);
    L.marker([latitude, longitude]).addTo(mymap);
    mymap.on('click', onMapClick);
  }
  function onMapClick(e) {
    obtenerSegunUbicacion(e.latlng.lat, e.latlng.lng);
    sevenDaysWeather(e.latlng.lat, e.latlng.lng);
  }
});
