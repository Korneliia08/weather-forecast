class Weather {
    city;

    // parametres for Api
    nameOfCity;
    lat;
    lon;

    // dataOfCurrentWeather
    objWeather;
    titleCityHTML = document.querySelector(".titleCity");
    tempSpanHTML = document.querySelector(".tempSpan");
    feelsLikeSpanHTML = document.querySelector(".feelsLikeSpan");
    currentWeatherSpanHTML = document.querySelector(".currentWeatherSpan");
    sunriseSpanHTML = document.querySelector(".sunriseSpan");
    sunsetSpanHTML = document.querySelector(".sunsetSpan");
    humiditySpanHTML = document.querySelector(".humiditySpan");
    windSpanHTML = document.querySelector(".windSpan");
    pressureSpanHTML = document.querySelector(".pressureSpan");
    directionSpanHTML = document.querySelector(".directionSpan");

    constructor(whichCityParam) {
        this.city = whichCityParam;
        this.getLocation();
    }

    getLocation() {
        fetch('https://api.openweathermap.org/geo/1.0/direct?' + new URLSearchParams({
            q: this.city,
            appid: "470f5ba6ca749dbd45cbda178d735719"
        }))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error");
                }
            })
            .then(json => {
                let jsonArray = Array.from(json);
                if (jsonArray.length < 1) {
                    console.log("error");
                } else {
                    this.nameOfCity = jsonArray[0].name;
                    this.lat = jsonArray[0].lat;
                    this.lon = jsonArray[0].lon;
                    this.getWeather();
                }
            })
            .catch(error => console.error(error));
    }

    getWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=470f5ba6ca749dbd45cbda178d735719`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("error");
                }
            })
            .then(json => {
                this.objWeather = {
                    nameOfCityWeather: this.nameOfCity,
                    temp: json.main.temp,
                    feelsLike: json.main.feels_like,
                    currentWeather: json.weather[0].main,
                    sunrise: json.sys.sunrise,
                    sunset: json.sys.sunset,
                    humidity: json.main.humidity,
                    wind: json.wind.speed,
                    windDirection: json.wind.deg,
                    pressure: json.main.pressure
                }
                this.updateWeather();
            })
            .catch(error => console.error(error));
    }

    updateWeather() {
        this.titleCityHTML.textContent = this.objWeather.nameOfCityWeather;
        this.tempSpanHTML.innerHTML = Math.round((this.objWeather.temp - 273.15) * 100) / 100 + "&#8451;";
        this.feelsLikeSpanHTML.innerHTML = Math.round((this.objWeather.feelsLike - 273.15) * 100) / 100 + "&#8451;";
        this.currentWeatherSpanHTML.textContent = this.objWeather.currentWeather;
        this.sunriseSpanHTML.textContent = new Date(this.objWeather.sunrise);
        this.sunsetSpanHTML.textContent = new Date(this.objWeather.sunset);
        this.humiditySpanHTML.textContent = this.objWeather.humidity + "%";
        this.windSpanHTML.textContent = this.objWeather.wind + "m/s";
        this.directionSpanHTML.textContent = this.objWeather.windDirection;
        this.pressureSpanHTML.textContent = this.objWeather.pressure + "hPa";
        console.log(json);
    }
}
