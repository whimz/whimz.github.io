window.onload = function () {
    var hideBtn = [];
    var pHiding = [];
    var jsOrder = [];//order buttons
    var formID; //order form
    var selectTools; //dropdown-list in order form
    var jsSendBtn;
    var smoothScrollMarginTop = 170;
    var tooltips = {};

    (function initVars(){

        var i = 0;

        if(document.getElementsByClassName('js-hide-btn')){
            hideBtn = document.getElementsByClassName('js-hide-btn');
            for(i = 0; i < hideBtn.length; i++){
                hideBtn[i].onclick = hideContent;
            }
        }

        if(document.getElementsByClassName('p-hidden')){
            pHiding = document.getElementsByClassName('p-hiding');
        }

        if(document.getElementById('select-tools')){
            selectTools = document.getElementById('select-tools');
            tooltips[selectTools.getAttribute('name')] = selectTools.parentElement.previousElementSibling;
            selectTools.parentElement.addEventListener('click', function (e) {
                var event = e || window.event;
                event.preventDefault();
                tooltips['devices'].classList.remove('tooltip-visible');
            });
        }

        if(document.getElementById('formID')){
            formID = document.getElementById('formID');
            for(i = 1; i < formID.elements.length; i++) {
                if (formID.elements[i].getAttribute('name') !== 'send') {
                    tooltips[formID.elements[i].getAttribute('name')] = formID.elements[i].previousElementSibling;
                    formID.elements[i].addEventListener('focus', function () {
                        tooltips[this.getAttribute('name')].classList.remove('tooltip-visible');
                    });
                }
            }
            formID.elements['agree'].addEventListener('change', function () {
                if(this.checked === true)
                    tooltips['agree'].classList.remove('tooltip-visible');
            });
        }

        if(document.getElementsByClassName('js-send-btn')){
            jsSendBtn = document.getElementsByClassName('js-send-btn')[0];
            jsSendBtn.addEventListener('click', sendRequest);
        }

        if(document.getElementsByClassName('js-order')){
            jsOrder = document.getElementsByClassName('js-order');
            for(i = 0; i < jsOrder.length; i++){
                if(formID !== undefined && selectTools !== undefined) {
                    jsOrder[i].addEventListener('click', selectItem);
                    jsOrder[i].addEventListener('click', function () {
                        smoothScroll(formID);
                    });
                }
            }
        }

    }).call(this);


    function validateForm(){

        if(formID.elements['devices'].value === 'js-none')
            tooltips['devices'].classList.add('tooltip-visible');
        else if(formID.elements['contact-name'].value.length === 0)
            tooltips['contact-name'].classList.add('tooltip-visible');
        else if(formID.elements['delivery-address'].value.length === 0)
            tooltips['delivery-address'].classList.add('tooltip-visible');
        else if(formID.elements['phone'].value.length === 0)
            tooltips['phone'].classList.add('tooltip-visible');
        else if(formID.elements['message'].value.length === 0)
            tooltips['message'].classList.add('tooltip-visible');
        else if(formID.elements['e-mail'].value.length === 0)
            tooltips['e-mail'].classList.add('tooltip-visible');
        else if(formID.elements['quantity'].value.length === 0)
            tooltips['quantity'].classList.add('tooltip-visible');
        else if(formID.elements['agree'].checked === false)
            tooltips['agree'].classList.add('tooltip-visible');
        else
            return true;

        return false;
    }

    function getParams() {

        var params = '';

        params += 'product=' + selectTools.options[selectTools.selectedIndex].text;

        for(var i = 1; i < formID.elements.length; i++)
        {
            if(formID.elements[i].getAttribute('name') !== 'send' &&
                formID.elements[i].getAttribute('name') !== ('agree'))
            {
                params += '&' + formID.elements[i].getAttribute('name') + '=' + formID.elements[i].value;
            }
        }
	    return params;
    }

    function sendRequest() {

        if (validateForm()){
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'ajax.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(getParams());
            xhr.onreadystatechange = function(){
                if (this.readyState === 4)
                {
                    if (this.status === 200){
                        if(typeof xhr.responseText !== undefined && ~xhr.responseText.indexOf('Ok')){
                            alert('Данные успешно отправлены.');
                        } else {
                            alert('При отправке данных произошла ошибка.');
                        }
                    }
                }
            };
            formID.reset();
            return true;
        }
        return false;
    }

    function hideContent() {
        for(var i = 0; i < pHiding.length; i++){
            if(this.parentNode === pHiding[i].parentNode){
                pHiding[i].classList.toggle('hide');
                break;
            }
        }
    }

    function selectItem() {
        for(var i = 0; i < selectTools.options.length; i++){
            if(selectTools.options[i].value === this.id){
                selectTools.options[i].selected = true;
                break;
            }
        }
    }

    /*-- smooth scroll--*/

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
        //var elem = document.getElementById(eID);
        var elem = eID;
        var y = elem.offsetTop;
        var node = elem;
        while (node.offsetParent && node.offsetParent !== document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }
        return y;

    }

    function smoothScroll(eID){

        var i = 0;
        var startY = getCurrentYPosition();
        var stopY = getElemYPosition(eID);

        var distance = (stopY > startY) ? (stopY - startY) : (startY - stopY);

        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }

        var speed = Math.round(distance / 100);
        if (speed >= 10) speed = 10;
        var step = Math.round(distance / 25);
        var leapY = (stopY > startY) ? (startY + step) : (startY - step);
        var timer = 0;

        if (stopY > startY){
            for (i = startY; i < stopY; i += step){
                setTimeout("window.scrollTo(0, " + (leapY - smoothScrollMarginTop) + ")", timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        }

        for (i = startY; i > stopY; i -= step){
            setTimeout("window.scrollTo(0, " + (leapY - smoothScrollMarginTop)+ ")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
    }
};

