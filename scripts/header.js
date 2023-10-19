class Header {
    inputCity = document.querySelector("input[name='inputCity']");
    whichCity;
    wheatheObj;


    constructor() {
        this.loadLocalStorage();
        this.inputCity.addEventListener("keypress", this.getCity.bind(this));
    }

    loadLocalStorage() {
        let arrayCities = JSON.parse(window.localStorage.getItem("titleCity"));
        if (arrayCities == null) {
            this.wheatheObj = new Weather("Mostyska");
        } else {
            let lengthOfArray = arrayCities.length;
            let lastCity = arrayCities[lengthOfArray - 1];
            this.wheatheObj = new Weather(lastCity);
        }
    }

    getCity(event) {
        if (event.code === "Enter") {
            if (this.wheatheObj) {
                clearInterval(this.wheatheObj.interval)
            }
            this.whichCity = event.target.value;
            this.wheatheObj = new Weather(this.whichCity);
        }
    }
}
