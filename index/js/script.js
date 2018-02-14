window.onload = function () {

    let jsItem = [];
    let popupItem = [];
    let activeItem;
    let headerCarouselItem = [];
    let carouselArrowRight;
    let carouselArrowLeft;
    let headerCarouselItemIndex = 0;
    let navToggle;
    let navToggleVisible = false;

    function init(){
        if (document.getElementsByClassName("active-item")){
            activeItem = document.getElementsByClassName("active-item")[0];
        }

        if (document.getElementsByClassName("js-item")){
            jsItem = document.getElementsByClassName("js-item");

            for(let i = 0; i < jsItem.length; i++){
                jsItem[i].onclick = function () {
                    activeItem.classList.remove("active-item");
                    this.classList.add("active-item");
                    activeItem = this;
                    smoothScroll((this.getAttribute("href")).slice(1));
                    navToggleClick();
                };
            }
        }

        if (document.getElementsByClassName("header-carousel-item")){
            headerCarouselItem = document.getElementsByClassName("header-carousel-item");
        }

        if(document.getElementById("carousel-arrow-right") && document.getElementById("carousel-arrow-left")){
            carouselArrowRight = document.getElementById("carousel-arrow-right");
            carouselArrowLeft = document.getElementById("carousel-arrow-left");
            carouselArrowLeft.onclick = leftClick;
            carouselArrowRight.onclick = rightClick;
        }

        if(document.getElementById("nav-toggle")){
            navToggle = document.getElementById("nav-toggle");
            navToggle.onclick = navToggleClick;
        }

    }

    init();

    function navToggleClick() {
        navToggleRotate();
        if (navToggleVisible === false){
            document.getElementById("popup-menu").style.height = "550px";
            navToggleVisible = true;
            return false;
        }
        document.getElementById("popup-menu").style.height = "0px";
        navToggleVisible = false;
        return false;
    }

    function navToggleRotate() {
        let element = document.getElementsByClassName("popup-menu-button")[0];

        if (element.classList) {
            element.classList.toggle("rotate");
        } else {
            // IE9
            let classes = element.className.split(" ");
            let i = classes.indexOf("rotate");

            if (i >= 0)
                classes.splice(i, 1);
            else
                classes.push("rotate");
            element.className = classes.join(" ");
        }

    }

    function leftClick() {
        headerCarouselItem[headerCarouselItemIndex].style.left = "-5000px";
        setTimeout(function () {
            headerCarouselItem[headerCarouselItemIndex++].style.display = "none";
            headerCarouselItem[headerCarouselItemIndex].style.left = "0px";
            headerCarouselItem[headerCarouselItemIndex].style.display = "inline";
        }, 100);

        if(headerCarouselItemIndex === headerCarouselItem.length - 2){
            carouselArrowLeft.style.display = "none";
        }else{
            carouselArrowRight.style.display = "block";
        }
    }

    function rightClick() {
        headerCarouselItem[headerCarouselItemIndex].style.left = "5000px";
        setTimeout(function () {
            headerCarouselItem[headerCarouselItemIndex--].style.display = "none";
            headerCarouselItem[headerCarouselItemIndex].style.left = "0px";
            headerCarouselItem[headerCarouselItemIndex].style.display = "inline";
        }, 300);

        if(headerCarouselItemIndex === 1){
            carouselArrowRight.style.display = "none";
        }else{
            carouselArrowLeft.style.display = "block";
        }
    }

    function getCurrentYPosition() {
        //ff, chrome, opera, safari
        if (self.pageYOffset)
            return self.pageYOffset;

        //ie6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;

        //ie 6, 7, 8
        if (document.body.scrollTop)
            return document.body.scrollTop;

        return 0;
    }

    function getElemYPosition(eID){
        let elem = document.getElementById(eID);
        let y = elem.offsetTop;
        let node = elem;
        while (node.offsetParent && node.offsetParent !== document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }
        return y;
    }

    function smoothScroll(eID){
        let startY = getCurrentYPosition();
        let stopY = getElemYPosition(eID);
        let distance = (stopY > startY) ? (stopY - startY) : (startY - stopY);

        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }

        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = (stopY > startY) ? (startY + step) : (startY - step);
        let timer = 0;

        if (stopY > startY){
            for (let i = startY; i < stopY; i += step){
                setTimeout("window.scrollTo(0, " + (leapY - 49) + ")", timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        }

        for (let i = startY; i > stopY; i -= step){
            setTimeout("window.scrollTo(0, " + (leapY - 49)+ ")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
    }

    window.onscroll = function() {
        let pageScrolled = window.pageYOffset || document.documentElement.scrollTop;
        let header = getComputedStyle(document.getElementsByTagName('header')[0]);
        let nav = getComputedStyle(document.getElementsByClassName('nav-wrap')[0]);

        if (pageScrolled <= (parseInt(header.height) - parseInt(nav.height))){
            (document.getElementsByClassName('nav-wrap')[0]).style.background = '';
        }
        else{
            //(document.getElementsByClassName('nav-wrap')[0]).style.background = 'linear-gradient(rgba(38, 38, 38, 0.9), rgba(38, 38, 38, 0.9))';
            (document.getElementsByClassName('nav-wrap')[0]).style.background = 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))';
        }
    }
};