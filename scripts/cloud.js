class Cloud {
    linkToImg;
    divElement;
    randomTime
    leftLocation;
    topLocation;
    imgCloud
    lastDirection
    scale
    opacity
    option

    constructor(linkToImgParam, divElementParam, sun) {
        this.linkToImg = linkToImgParam;
        this.divElement = divElementParam;
        const randomTime = Math.floor(Math.random() * 5000) + 3000

        this.opacity = (Math.floor(Math.random() * 7) / 7) + 0.1
        this.scale = 3000 * 1.8 / randomTime
        this.scale = Math.floor(this.scale * 10) / 10
        this.randomTime = 17000 - randomTime
        if (sun) {
            this.scale = 1.3
            this.opacity = 0.9

        }
        this.createCloud();

        setTimeout(() => {
            this.move()
        }, 1)


        setInterval(() => {
            this.move()
        }, this.randomTime)
    }


    move() {
        this.generateLocation()
        this.updateLocation()
        this.checkWall()
    }

    checkWall() {
        if (parseInt(this.imgCloud.style.left) < 0) {
            this.leftLocation += 380
        }
        if (parseInt(this.imgCloud.style.top) < 0) {
            this.topLocation += 380

        }
        if (parseInt(this.imgCloud.style.left) > this.divElement.clientWidth) {
            this.leftLocation -= 380
        }
        if (parseInt(this.imgCloud.style.top) > this.divElement.clientHeight) {
            this.topLocation -= 380
        }
    }

    generateLocation() {
        const direction = Math.floor(Math.random() * 361)
        this.lastDirection = direction
        const radianDirection = (direction * Math.PI) / 180
        this.leftLocation += 300 * Math.sin(radianDirection)
        this.topLocation += 300 * Math.cos(radianDirection)

    }

    updateLocation() {
        this.imgCloud.style.left = this.leftLocation + "px"
        this.imgCloud.style.top = this.topLocation + "px"
    }

    createCloud() {
        let imgCloud = document.createElement("img");
        imgCloud.src = this.linkToImg;
        imgCloud.style.width = "150px";
        imgCloud.style.position = "absolute";
        this.leftLocation = this.createPosition().left;
        imgCloud.style.left = this.leftLocation + "px"
        this.topLocation = this.createPosition().top;
        imgCloud.style.top = this.topLocation + "px"
        imgCloud.style.zIndex = "1";
        imgCloud.style.opacity = this.opacity
        imgCloud.style.transition = this.randomTime + "ms linear"
        //  const randomSize = Math.floor((Math.random() + 0.3) * 10) / 10
        imgCloud.style.scale = this.scale
        this.imgCloud = imgCloud
        this.divElement.append(imgCloud);
    }


    createPosition() {
        let minForHeight = Math.ceil(5 - 300)
        let maxForHeight = Math.floor(this.divElement.clientHeight - 150 + 450);
        let randomValueForHeight = Math.floor(Math.random() * (maxForHeight - minForHeight) + minForHeight);
        let minForWidth = Math.ceil(5 - 300);
        let maxForWidth = Math.floor(this.divElement.clientWidth - 150 + 450);
        let randomValueForWidth = Math.floor(Math.random() * (maxForWidth - minForWidth) + minForWidth);

        return {left: randomValueForWidth, top: randomValueForHeight}
    }
}
