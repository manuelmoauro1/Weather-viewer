document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    document.getElementById("obtener").addEventListener("click", obtainithUserInput);

    /*
    userLocation();
    function userLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            obtainWithGps(latitude, longitude);
          });
        }
    }
    async function obtainWithGps(latitude, longitude) {
        const url = "https://avwx.rest/api/station/near/"+latitude+","+longitude+"?token=8NGTQ5GTkqvYvn0ejoL8r62_GMPvJoV9kNI6zSQiV64";
        
        try {
            let response = await fetch(url);
            if(response.ok) {
                let json = await response.json();

                document.getElementById("metarDescriptionWind").innerHTML = " "+json.wind_direction.repr+"°, "+ json.wind_speed.value+" Kt";
                document.getElementById("metarDescriptionTemperature").innerHTML = " "+json.temperature.repr+"°C";
                document.getElementById("metarDescriptionPressure").innerHTML = " "+json.altimeter.repr;
                document.getElementById("metarDescriptionVisibility").innerHTML = " "+json.visibility.repr;
                document.getElementById("metarDescriptionDew").innerHTML = " "+json.dewpoint.repr;
                if (json.wx_codes.length != 0) {
                    document.getElementById("metarDescriptionWx").innerHTML = " "+json.wx_codes[0].value;
                }
                document.getElementById("metar").innerHTML = json.raw;

            }
        }
        catch (error) {
            console.log(error);
            
        }
    }
    */

    async function obtainithUserInput() {
        const airportUser = document.getElementById("inputUser").value;
        const url = "https://avwx.rest/api/metar/"+airportUser+"?token=8NGTQ5GTkqvYvn0ejoL8r62_GMPvJoV9kNI6zSQiV64";
        const urlTaf = "https://avwx.rest/api/taf/"+airportUser+"?token=8NGTQ5GTkqvYvn0ejoL8r62_GMPvJoV9kNI6zSQiV64";
        const urlCity = "https://avwx.rest/api/station/"+airportUser+"?token=8NGTQ5GTkqvYvn0ejoL8r62_GMPvJoV9kNI6zSQiV64"

        try {
            let response = await fetch(url);
            if(response.ok) {
                let json = await response.json();

                document.getElementById("metarDescriptionWind").innerHTML = " "+json.wind_direction.repr+"°, "+ json.wind_speed.value+" Kt";
                document.getElementById("metarDescriptionTemperature").innerHTML = " "+json.temperature.repr+"°C";
                document.getElementById("metarDescriptionPressure").innerHTML = " "+json.altimeter.repr;
                document.getElementById("metarDescriptionVisibility").innerHTML = " "+json.visibility.repr;
                document.getElementById("metarDescriptionDew").innerHTML = " "+json.dewpoint.repr;
                if (json.wx_codes.length != 0) {
                    document.getElementById("metarDescriptionWx").innerHTML = " "+json.wx_codes[0].value;
                }
                document.getElementById("metar").innerHTML = json.raw;
            }
            /*
            let responseTaf = await fetch(urlTaf);
            if(responseTaf.ok) {
                let jsonTaf = await responseTaf.json();
                document.getElementById("taf").innerHTML = jsonTaf.raw;
            }
            */

            let responseCity = await fetch(urlCity);
            if(responseCity.ok) {
                let jsonCity = await responseCity.json();
                document.getElementById("airportICAO").innerHTML = jsonCity.city+", "+jsonCity.country+" ("+jsonCity.icao+")";

            }
            
        }
        catch (error) {
            console.log(error);
            
        }
    }


});