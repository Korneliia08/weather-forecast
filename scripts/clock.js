class Clock {
    spanForHour;
    spanForMinutes;
    spanForSeconds;

    constructor(spanForHourParam, spanForMinutesParam, spanForSecondsParam) {
        this.spanForHour = spanForHourParam;
        this.spanForMinutes = spanForMinutesParam;
        this.spanForSeconds = spanForSecondsParam;

        this.createClock();
    }

    createClock() {
        this.spanHour = document.querySelector(this.spanForHour);
        this.spanMinutes = document.querySelector(this.spanForMinutes);
        this.spanSeconds = document.querySelector(this.spanForSeconds);

        this.updateTime();
        setInterval(() => {
            this.updateTime();
        }, 1000);
    }

    updateTime() {
        let time = new Date();
        this.spanHour.textContent = time.getHours();
        this.spanMinutes.textContent = time.getMinutes();
        this.spanSeconds.textContent = time.getSeconds();
    }
}
