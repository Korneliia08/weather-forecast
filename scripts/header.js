class Header {
    inputCity = document.querySelector("input[name='inputCity']");
    whichCity;


    constructor() {
        this.inputCity.addEventListener("keypress", this.getCity.bind(this));
        new Weather("Mostyska");
    }

    getCity(event) {
        if (event.code === "Enter") {
            this.whichCity = event.target.value;
            let weatherInCityObj = new Weather(this.whichCity);
        }
    }
}
