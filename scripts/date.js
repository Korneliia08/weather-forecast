class DateTime {
    dateTimeHTML;

    constructor(dateTimeParam) {
        this.dateTimeHTML = document.querySelector(dateTimeParam);
        this.createDate();
    }

    createDate() {
        let date = new Date();
        let day = date.getDay();
        let month = date.getMonth();
        let numberDay = date.getDate();
        var monthArr = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.dateTimeHTML.textContent = days[day] + ' ' + numberDay + ', ' + ' ' + monthArr[(month)];
    }
}
