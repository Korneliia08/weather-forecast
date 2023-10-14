class StartPanel {
    startPanel = document.querySelector(".startPanel");
    arrayClouds = [];


    constructor() {
        this.createClouds();
        document.querySelector(".titleBtn")
            .addEventListener("click", this.showWeatherPanel.bind(this));
    }

    showWeatherPanel() {
        let startPanel = document.querySelector(".startPanel");
        let wrapper = document.querySelector(".wrapper");
        let header = document.querySelector("header");
        let main = document.querySelector("main");
        let footer = document.querySelector("footer");

        startPanel.style.display = "none";
        header.style.display = "block";
        main.style.display = "flex";
        footer.style.display = "flex";
        wrapper.style.padding = "0";
        this.createClock();
    }

    createClock() {
        const clockObj = new Clock(".spanForHour", ".spanForMinutes", ".spanForSekunds");
    }

    createClouds() {
        for (let index = 0; index < 40; index++) {
            this.arrayClouds.push(new Cloud("../assets/images/chmurka.png", this.startPanel));
        }
        for (let index = 0; index < 10; index++) {
            this.arrayClouds.push(new Cloud("../assets/images/rain.png", this.startPanel));
        }
        //   for (let index = 0; index < 1; index++) {
        this.arrayClouds.push(new Cloud("../assets/images/sun.png", this.startPanel, {sun: true}));
        //      }
        for (let index = 0; index < 10; index++) {
            this.arrayClouds.push(new Cloud("../assets/images/cloud.png", this.startPanel));
        }
    }
}
