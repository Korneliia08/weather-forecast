class Header {
    inputCity = document.querySelector("input[name='inputCity']");
    whichCity;
    wheatheObj;

    constructor() {
        this.inputCity.addEventListener("keypress", this.getCity.bind(this));
        this.wheatheObj = new Weather("Mostyska");
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
