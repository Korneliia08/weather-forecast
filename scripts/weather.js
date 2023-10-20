class Weather {
    city;
    redInput;

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
    imgHTML = document.querySelector(".imgDecribeWeather");
    localTimeTeg = document.querySelector(".localTimeTeg");

    interval;

    //localStorage
    arrayOfLastsCities = [];

    constructor(whichCityParam) {
        this.redInput = document.querySelector("input[name='inputCity']");
        this.city = whichCityParam;
        this.getLocation();
        let json = window.localStorage.getItem("titleCity");
        this.arrayOfLastsCities = JSON.parse(json);
        if (this.arrayOfLastsCities == null) {
            this.arrayOfLastsCities = [];
        }
    }

    getLocation() {
        this.redInput.placeholder = "Enter name of city";
        this.redInput.classList.remove('redPlaceholder')
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
                    throw new Error("city not found");
                } else {
                    this.nameOfCity = jsonArray[0].name;
                    this.lat = jsonArray[0].lat;
                    this.lon = jsonArray[0].lon;
                    this.getWeather();
                    this.redInput.value = "";
                    this.addToLocalStorage();
                }
            })
            .catch(error => {
                this.redInput.value = "";
                this.redInput.placeholder = "city not found, try again";
                this.redInput.classList.add('redPlaceholder')
                console.error(error);
            });
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
                    pressure: json.main.pressure,
                    nameOfIcon: json.weather[0].icon,
                    localTime: json.timezone
                }
                this.updateWeather();
            })
            .catch(error => {
                console.error(error)
            });
    }

    setTime() {
        const timeBetwenLocalAndUtc = Math.abs(new Date().getTimezoneOffset() * 1000 * 60);
        const actualTime = new Date().getTime();
        const utcTime = actualTime - timeBetwenLocalAndUtc;
        const localTime = utcTime + this.objWeather.localTime * 1000;
        const localTimeDate = new Date(localTime).toLocaleTimeString();
        this.localTimeTeg.textContent = localTimeDate
    }

    updateWeather() {
        this.interval = setInterval(() => {
            this.setTime()
        }, 1000)
        this.setTime()
        this.titleCityHTML.textContent = this.objWeather.nameOfCityWeather;
        this.tempSpanHTML.innerHTML = Math.round((this.objWeather.temp - 273.15) * 100) / 100 + "&#8451;";
        this.feelsLikeSpanHTML.innerHTML = Math.round((this.objWeather.feelsLike - 273.15) * 100) / 100 + "&#8451;";
        this.currentWeatherSpanHTML.textContent = this.objWeather.currentWeather;
        this.sunriseSpanHTML.textContent = new Date(this.objWeather.sunrise * 1000).toLocaleString().split(" ")[1];
        this.sunsetSpanHTML.textContent = new Date(this.objWeather.sunset * 1000).toLocaleString().split(" ")[1];
        this.humiditySpanHTML.textContent = this.objWeather.humidity + "%";
        this.windSpanHTML.textContent = this.objWeather.wind + "m/s";
        this.directionSpanHTML.style.transform = `rotate(${this.objWeather.windDirection}deg)`
        this.pressureSpanHTML.textContent = this.objWeather.pressure + "hPa";
        this.imgHTML.src = `https://openweathermap.org/img/wn/${this.objWeather.nameOfIcon}@2x.png`
        // this.localTimeTeg.textContent = this.objWeather.localTime;
    }


    addToLocalStorage() {
        if (this.arrayOfLastsCities[this.arrayOfLastsCities.length - 1] === this.nameOfCity) return
        this.arrayOfLastsCities = this.arrayOfLastsCities.slice(-5)
        if (this.arrayOfLastsCities.indexOf(this.nameOfCity) !== -1) {
            this.arrayOfLastsCities = this.arrayOfLastsCities.filter(k => k !== this.nameOfCity)
        }
        this.arrayOfLastsCities.push(this.nameOfCity);
        window.localStorage.setItem("titleCity", JSON.stringify(this.arrayOfLastsCities));
        window.dispatchEvent(new Event('storage'));
    }
}
