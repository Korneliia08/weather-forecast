class WeatherOn5Days {
    lat;
    lon;
    weatherArray = [];
    blockForFewDays;

    constructor(latParam, lonParam) {
        this.blockForFewDays = document.querySelector(".blockForFewDays");
        this.lat = latParam;
        this.lon = lonParam;
        this.getWeather();
    }

    getWeather() {
        fetch("https://api.openweathermap.org/data/2.5/forecast?" + new URLSearchParams({
            lat: this.lat,
            lon: this.lon,
            units: "metric",
            appid: "470f5ba6ca749dbd45cbda178d735719"
        }))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("error in load data");
                }
            })
            .then(json => {
                let weatherList = json.list;
                weatherList = weatherList.filter(weather => {
                    const onlyTime = weather.dt_txt.split(" ")[1];
                    const onlyDate = weather.dt_txt.split(" ")[0];
                    const todayDate = new Date().toLocaleString().split(",")[0].split(".");
                    const newTodayDate = todayDate[2] + '-' + todayDate[1] + "-" + todayDate[0];
                    if (onlyTime === "12:00:00" || onlyTime === "00:00:00") {
                        if (newTodayDate !== onlyDate) {
                            return true;
                        }
                    }
                    return false;
                })
                for (let index = 0; index < weatherList.length - 1; index += 2) {
                    this.weatherArray.push({night: weatherList[index], day: weatherList[index + 1]});
                }
                this.displayWeather();
            })
            .catch(error => console.error(error))
    }

    displayWeather() {
        this.blockForFewDays.innerHTML = '';
        this.weatherArray.forEach(objDayNight => {
            let blockForWeather = document.createElement("div");
            blockForWeather.classList.add("oneDay");
            let blockForDay = document.createElement("div");
            blockForDay.classList.add("day");
            let blockForNight = document.createElement("div");
            blockForNight.classList.add("night");

            const objOfData = this.updateDataForFewDays(objDayNight);

            blockForDay.append(objOfData.day.imgDay, objOfData.day.temperatureDay, objOfData.day.tempFeelsLikeDay);
            blockForNight.append(objOfData.night.imgNight, objOfData.night.temperatureNight, objOfData.night.tempFeelsLikeNight);

            blockForWeather.append(objOfData.time);
            blockForWeather.append(blockForDay, blockForNight);
            this.blockForFewDays.append(blockForWeather);
        })
    }


    updateDataForFewDays(objDayNightParam) {
        let time = document.createElement("time");
        time.textContent = objDayNightParam.day.dt_txt.split(" ")[0];
        time.classList.add("timeFevDays");

        // for day
        let temperatureDay = document.createElement("span");
        temperatureDay.className = "fiveDayText"
        temperatureDay.innerHTML = objDayNightParam.day.main.temp + "&#8451;";

        let windSpeedDay = document.createElement("span");
        windSpeedDay.className = "fiveDayText"
        windSpeedDay.innerHTML = "&nbsp;&nbsp;" + objDayNightParam.day.wind.speed + "m/s";

        let imgDay = document.createElement("img");
        imgDay.classList.add("iconImg");
        imgDay.src = `https://openweathermap.org/img/wn/${objDayNightParam.day.weather[0].icon}@2x.png`;


        //for night
        let temperatureNight = document.createElement("span");
        temperatureNight.className = "fiveDayText"
        temperatureNight.innerHTML = objDayNightParam.night.main.temp + "&#8451;";

        let windSpeedNight = document.createElement("span");
        windSpeedNight.className = "fiveDayText"
        windSpeedNight.innerHTML = "&nbsp;&nbsp;" + objDayNightParam.day.wind.speed + "m/s";


        let imgNight = document.createElement("img");
        imgNight.classList.add("iconImg");
        imgNight.src = `https://openweathermap.org/img/wn/${objDayNightParam.night.weather[0].icon}@2x.png`;


        return {
            time,
            day: {temperatureDay, tempFeelsLikeDay: windSpeedDay, imgDay},
            night: {temperatureNight, tempFeelsLikeNight: windSpeedNight, imgNight}
        }
    }
}
