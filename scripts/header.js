class Header {
    inputCity = document.querySelector("input[name='inputCity']");
    whichCity;
    weatherObj;


    constructor() {
        this.loadLocalStorage();
        this.inputCity.addEventListener("keypress", this.getCity.bind(this));
        document.querySelector("#search").addEventListener("click", this.getCityClick.bind(this))

        this.updateLocalStorage();
    }

    loadLocalStorage() {
        const arrayCities = JSON.parse(window.localStorage.getItem("titleCity"));
        if (arrayCities == null) {
            this.weatherObj = new Weather("Mostyska");
        } else {
            let lengthOfArray = arrayCities.length;
            let lastCity = arrayCities[lengthOfArray - 1];
            this.weatherObj = new Weather(lastCity);
        }
    }

    getCityClick() {
        if (this.weatherObj) {
            clearInterval(this.weatherObj.interval)
            this.weatherObj = new Weather(document.querySelector("[name=inputCity]").value);
        }
    }

    getCity(event) {
        if (event.code === "Enter") {
            if (this.weatherObj) {
                clearInterval(this.weatherObj.interval)
            }
            this.whichCity = event.target.value;
            this.weatherObj = new Weather(this.whichCity);
        }
    }

    selectCityFromHistory(event) {
        if (this.weatherObj) {
            clearInterval(this.weatherObj.interval)
        }
        this.weatherObj = new Weather(event.target.textContent);
    }

    createHistory() {
        const arrOfCities = JSON.parse(window.localStorage.getItem("titleCity"));
        let blockHistory = document.querySelector(".blockForLastCities");
        let ulHTML = blockHistory.querySelector("ul");
        if (ulHTML) {
            ulHTML.remove();
        }
        if (arrOfCities == null) {
            return;
        }
        blockHistory.style.display = "flex";
        let ul = document.createElement("ul");
        ul.classList.add("ulHistory");
        const lastCity = arrOfCities.slice(-10);
        lastCity.reverse();

        lastCity.forEach(city => {
            let li = document.createElement("li");
            li.classList.add("liHistory");
            li.textContent = city
            li.addEventListener('click', this.selectCityFromHistory.bind(this))
            ul.append(li);
        })
        blockHistory.append(ul);
    }

    updateLocalStorage() {
        window.addEventListener("storage", (event) => {
            this.createHistory();
        })
        this.createHistory();
    }
}
