document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    document.getElementById("obtener").addEventListener("click", obtainithUserInput);

    async function obtainithUserInput() {
        let airportUser = document.getElementById("inputUser").value;
        const url = "https://avwx.rest/api/metar/" + airportUser + "?token=8NGTQ5GTkqvYvn0ejoL8r62_GMPvJoV9kNI6zSQiV64";
        const urlTaf = "https://avwx.rest/api/taf/" + airportUser + "?token=8NGTQ5GTkqvYvn0ejoL8r62_GMPvJoV9kNI6zSQiV64";
        const urlStationInformation = "https://avwx.rest/api/station/" + airportUser + "?token=8NGTQ5GTkqvYvn0ejoL8r62_GMPvJoV9kNI6zSQiV64"

        try {
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();

                document.getElementById("trVisibility").classList.remove("trAviation")
                document.getElementById("metarDescriptionWx").innerHTML = " ";
                document.getElementById("metarDescriptionWind").innerHTML = " " + json.wind_direction.repr + "°/" + json.wind_speed.value + " Kt";
                document.getElementById("metarDescriptionTemperature").innerHTML = " " + json.temperature.repr + "°C";
                document.getElementById("metarDescriptionPressure").innerHTML = " " + json.altimeter.repr;
                document.getElementById("metarDescriptionVisibility").innerHTML = " " + json.visibility.repr;
                document.getElementById("metarDescriptionDew").innerHTML = " " + json.dewpoint.repr;
                if (json.wx_codes.length != 0) {
                    document.getElementById("metarDescriptionWx").innerHTML = " " + json.wx_codes[0].value;
                    document.getElementById("trVisibility").classList.add("trAviation");

                }
                document.getElementById("metar").innerHTML = json.raw;
            }

            let responseTaf = await fetch(urlTaf);
            if (responseTaf.ok) {
                let jsonTaf = await responseTaf.json();

                document.getElementById("tafDate").innerHTML = " from " + jsonTaf.start_time.repr + "Z to " + jsonTaf.end_time.repr + "Z";
                document.getElementById("tafWind").innerHTML = jsonTaf.forecast[0].wind_direction.repr + "°/" + jsonTaf.forecast[0].wind_speed.repr + " Kt";
                document.getElementById("tafVisibility").innerHTML = " " + jsonTaf.forecast[0].visibility.repr;
                document.getElementById("maxTemp").innerHTML = " " + jsonTaf.max_temp;
                document.getElementById("minTemp").innerHTML = " " + jsonTaf.min_temp;
                document.getElementById("taf").innerHTML = jsonTaf.raw;
            }


            let responseCity = await fetch(urlStationInformation);
            if (responseCity.ok) {
                let jsonCity = await responseCity.json();
                document.getElementById("airportICAO").innerHTML = jsonCity.city + ", " + jsonCity.country;
                document.getElementById("elevation").innerHTML = "Airport elevation: " + jsonCity.elevation_ft + "ft";
                document.getElementById("name").innerHTML = "Airport name: " + jsonCity.name;
                document.getElementById("icao").innerHTML = "ICAO: " + jsonCity.icao;
                document.getElementById("iata").innerHTML = "IATA: " + jsonCity.iata;
                document.getElementById("type").innerHTML = "Type: " + jsonCity.type;
                document.getElementById("runwaysClass").classList.remove("hidden");
                for (let i = 0; i < jsonCity.runways.length; i++) {
                    document.getElementById("runways").innerHTML += " " + jsonCity.runways[i].ident1 + "/" + jsonCity.runways[i].ident2 + " - " + "Surface: " + jsonCity.runways[i].surface + " Length: " + jsonCity.runways[i].length_ft + "Ft";
                }
            }

        }
        catch (error) {
            console.log(error);

        }
    }


});