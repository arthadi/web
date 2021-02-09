// const galleryImgData = {
//     0: {
//         0: 'Икона преподобного Кирилла Белозерского. Период создания XVI век. Относится к московской школе иконописи.',
//         1: 'Icon',
//         nameFile: 'Kirill.jpg',
//     },
//     1: {
//         0: 'Царские врата',
//         1: 'King gate',
//         nameFile: 'Icon_Kirill.jpg',
//     },
//     2: {
//         0: 'Царские врата',
//         1: 'King gate',
//         nameFile: 'Sen.jpg',
//     },
//     3: {
//         0: 'Царские врата',
//         1: 'King gate',
//         nameFile: 'Sen.jpg',
//     },
//     4: {
//         0: 'Царские врата',
//         1: 'King gate',
//         nameFile: 'Icon_Kirill.jpg',
//     },
//     5: {
//         0: 'Икона преподобного Кирилла Белозерского. Период создания XVI век. Относится к московской школе иконописи.',
//         1: 'Icon',
//         nameFile: 'Kirill.jpg',
//     },
    // 6: {
    //     0: 'Царские врата',
    //     1: 'King gate',
    //     nameFile: 'Sen.jpg',
    // },
    // 7: {
    //     0: 'Царские врата',
    //     1: 'King gate',
    //     nameFile: 'Icon_Kirill.jpg',
    // },
    // 8: {
    //     0: 'Царские врата',
    //     1: 'King gate',
    //     nameFile: 'Sen.jpg',
    // },
    // 9: {
    //     0: 'Икона преподобного Кирилла Белозерского. Период создания XVI век. Относится к московской школе иконописи.',
    //     1: 'Icon',
    //     nameFile: 'Kirill.jpg',
    // },
    // 10: {
    //     0: 'Икона преподобного Кирилла Белозерского. Период создания XVI век. Относится к московской школе иконописи.',
    //     1: 'Icon',
    //     nameFile: 'Kirill.jpg',
    // },
    // 11: {
    //     0: 'Царские врата',
    //     1: 'King gate',
    //     nameFile: 'Sen.jpg',
    // },
    // 12: {
    //     0: 'Царские врата',
    //     1: 'King gate',
    //     nameFile: 'Icon_Kirill.jpg',
    // },
    // 13: {
    //     0: 'Царские врата',
    //     1: 'King gate',
    //     nameFile: 'Sen.jpg',
    // },
    // 14: {
    //     0: 'Икона преподобного Кирилла Белозерского. Период создания XVI век. Относится к московской школе иконописи.',
    //     1: 'Icon',
    //     nameFile: 'Kirill.jpg',
    // },
// };

// language = 0;



class ParametersHtmlSlider {

    constructor(mainSelector) {
        this.selector = document.querySelector(mainSelector);
        this.objectSlider = this.getParamForSliderElement(this.selector);
        this.removeHtml(this.selector);
    }

    removeHtml = (selector) => {
        if(selector) {
            selector.remove();
        }
    };

    objectChildren = (knotDom) => {
        let children = knotDom.children;

            let keyChildren = {};

            for (let index in children) {

                if (children.hasOwnProperty(index)) {

                    if (children[index].dataset.js) {

                        keyChildren[children[index].dataset.js] = children[index];
                    }
                    else {
                        keyChildren[index] = children[index];
                    }
                }
            }
            return keyChildren;
    };

    getAttributes = (knotDom) => {
        let lengthArrayAttributes = knotDom.attributes.length;
        let objectAttributes = {};
        for (let i = 0; i < lengthArrayAttributes; i++) {
            if (knotDom.attributes[i].value.split(' ').length > 1) {
                objectAttributes[knotDom.attributes[i].name] = knotDom.attributes[i].value.split(' ');
            }
            else {
                objectAttributes[knotDom.attributes[i].name] = knotDom.attributes[i].value;
            }
        }
        return objectAttributes;
    };

    buildChildrenMap(knotSelector, objectDomElement) {

        let objChildren = this.objectChildren(knotSelector);

        if (Object.keys(objChildren).length !== 0) {

            objectDomElement.children = {};

            for (let index in objChildren) {

                if (objChildren.hasOwnProperty(index)) {

                    objectDomElement.children[index] = {
                        htmlTeg: objChildren[index].tagName.toLowerCase(),
                        attributes: this.getAttributes(objChildren[index]),
                        parent: objChildren[index].parentElement,
                    };
                }
            }
            for (let index in objChildren) {

                if (objChildren.hasOwnProperty(index)) {

                    if (Object.keys(this.objectChildren(objChildren[index])).length !== 0) {
                        this.buildChildrenMap(objChildren[index], objectDomElement.children[index]);
                    }
                }
            }
        }
    };

    getParamForSliderElement(knotSelector) {
        let keyObject;
        if (knotSelector.dataset.js) {
            keyObject = knotSelector.dataset.js;
        }
        let containSlider = {
            [keyObject]: {
                htmlTeg: knotSelector.tagName.toLowerCase(),
                attributes: this.getAttributes(knotSelector),
                parent: knotSelector.parentElement,
            },
        };
        let objectDomElement = containSlider[keyObject];
        this.buildChildrenMap(knotSelector, objectDomElement);
        return containSlider;
    };
}

class CreatorSlider {

    constructor (object, objectImgData, language = 0, countPictInTape = 3) {
        this.language = language;
        this.imgData = objectImgData;
        this.countPictInTape = countPictInTape;
        this.slider = this.mergeElement(this.cycleForeCreateElement (object, objectImgData));
        this.countPictures = Object.keys(this.imgData).length;
        this.widthPicture = 170;
        this.widthTapePict = this.widthPicture * this.countPictures;
        this.$tapePict = this.slider.targetAllSlider.children.targetBoxTape.children.targetTapePictures.children.targetTape.element;
        this.$buttonTapeRight = this.slider.targetAllSlider.children.targetBoxTape.children.buttonTapeRight.element;
        this.$buttonTapeLeft = this.slider.targetAllSlider.children.targetBoxTape.children.buttonTapeLeft.element;
        this.showPictInTape();
    }

    pastInPlace() {
        this.slider.targetAllSlider.parent.prepend(this.slider.targetAllSlider.element);
        this.slider.targetAllSlider.element.classList.remove('hide');
    }

    showPictInTape() {
        // let tapeBox =
        if (this.countPictInTape >= this.countPictures) {
            this.slider.targetAllSlider.children.targetBoxTape.children.targetTapePictures.element.style.width = this.widthPicture * this.countPictures + 'px';
        }
        else {
            this.slider.targetAllSlider.children.targetBoxTape.children.targetTapePictures.element.style.width = this.widthPicture * this.countPictInTape + 'px';
        }

    }

    addAttrClass = (pathToClass, pathToElem, index) => {

        if (typeof pathToClass === 'object') {

            for (let j = 0; j < pathToClass.length; j++) {

                pathToElem[index].classList.add(pathToClass[j]);
            }
        }
        else {
            pathToElem[index].classList.add(pathToClass);
        }
    };

    showHideButtonSlider = (numberPicture, buttonSliderLeft, buttonSliderRight, countPicture) => {

        if (numberPicture > 1 && numberPicture !== countPicture) {

            buttonSliderLeft.classList.remove('hide');
            buttonSliderRight.classList.remove('hide');
        }
        else if (numberPicture === 1) {

            buttonSliderLeft.classList.add('hide');
            buttonSliderRight.classList.remove('hide');
        }
        else if (numberPicture === countPicture) {

            buttonSliderRight.classList.add('hide');
            buttonSliderLeft.classList.remove('hide');
        }
    };

    getLeftPosition = (element) => {
        let tapePictCss = window.getComputedStyle(element);
        let positionTapePict = tapePictCss.getPropertyValue("left");
        return parseInt(positionTapePict);
    };

    clickMiniPict = (e) => {

        let pict = e.target;
        let allButtonPicture = pict.parentElement.parentElement.children;
        let allPictures = this.slider.targetAllSlider.children.targetForPictures.children.targetForPict.element;
        let buttonSliderLeft = this.slider.targetAllSlider.children.buttonLeft.element;
        let buttonSliderRight = this.slider.targetAllSlider.children.buttonRight.element;
        let numberPicture = +e.target.dataset.number;

        for(let i = 0; i < this.countPictures; i++) {

            allButtonPicture[i].disabled = true;

            if (Number(allPictures[i].dataset.number) === numberPicture) {
                let timer = setTimeout(() => {
                    allPictures[i].classList.remove('hide');
                    clearTimeout(timer);
                }, 800);
            }
            else if(!allPictures[i].classList.contains('hide')) {
                allPictures[i].style.left = '-2000px';
                let timer = setTimeout(() => {
                    allPictures[i].classList.add('hide');
                    allPictures[i].style.left = 0;
                    clearTimeout(timer);
                }, 800);
            }
             let timer = setTimeout(() => {
                 allButtonPicture[i].disabled = false;
                 clearTimeout(timer);
             }, 800);
        }
        for (let i = 0; i < Object.keys(this.$tapePict.children).length; i++) {
            this.$tapePict.children[i].classList.remove('activePict');
        }
        pict.parentElement.classList.add('activePict');

        this.showHideButtonSlider (numberPicture, buttonSliderLeft, buttonSliderRight, this.countPictures);
    };

    clickButton = (e) => {

        let button = e.target;
        let buttonName = button.dataset.js;
        let allPictures;
        let numberPict;
        let leftPosition;
        let newLeftPosition;
        let picturesObject = this.slider.targetAllSlider.children.targetForPictures.children.targetForPict.element;

        switch (buttonName) {

            case 'buttonLeft' :

                allPictures = button.nextElementSibling.children;

                let rightButton = this.slider.targetAllSlider.children.buttonRight.element;

                button.disabled = true;

                for (let i = 0; i < this.countPictures; i++) {

                    if (!allPictures[i].classList.contains('hide')) {
                        numberPict = +allPictures[i].dataset.number;

                        allPictures[i].style.left = '1000px';

                        let timer = setTimeout(() => {
                            allPictures[i].classList.add('hide');
                            allPictures[i].style.left = 0;
                            clearTimeout(timer);
                        }, 800);
                    }

                        let timer = setTimeout(() => {
                            allPictures[numberPict - 2].classList.remove('hide');
                            button.disabled = false;
                            clearTimeout(timer);
                        }, 800);
                }

                let prevNumberPict = +numberPict - 1;

                let resultOfDivision = prevNumberPict / this.countPictInTape;

                if(Number.isInteger(prevNumberPict / this.countPictInTape)) {

                    this.$buttonTapeRight.classList.remove('hide');

                    if (resultOfDivision === 1){
                        this.$tapePict.style.left = 0;
                        this.$buttonTapeLeft.classList.add('hide');
                    }
                    else {
                        this.$tapePict.style.left = -(resultOfDivision -1) * this.countPictInTape * this.widthPicture + 'px';
                    }
                }
                else {
                    let roundingValue = Math.ceil(prevNumberPict / this.countPictInTape);

                    if (roundingValue === 1) {
                        this.$tapePict.style.left = 0;
                    }
                    else {
                        this.$tapePict.style.left = -((roundingValue - 1) * this.countPictInTape)  * this.widthPicture + 'px';
                        this.$buttonTapeLeft.classList.remove('hide');
                        if (this.countPictures - numberPict > this.countPictInTape) {
                            this.$buttonTapeRight.classList.remove('hide');
                        }
                    }
                }

                for (let i = 0; i < Object.keys(this.$tapePict.children).length; i++) {
                    this.$tapePict.children[i].classList.remove('activePict');
                }
                this.$tapePict.children[[prevNumberPict] - 1].classList.add('activePict');

                this.showHideButtonSlider (prevNumberPict, button, rightButton, this.countPictures);

                break;

            case 'buttonRight' :

                allPictures = button.previousElementSibling.children;
                let leftButton = this.slider.targetAllSlider.children.buttonLeft.element;
                button.disabled = true;

                for (let i = 0; i < this.countPictures; i++) {

                    if (!allPictures[i].classList.contains('hide')) {
                        numberPict = +allPictures[i].dataset.number;

                        allPictures[i].style.left = '-1500px';
                        let timer = setTimeout(() => {
                            allPictures[i].classList.add('hide');
                            allPictures[i].style.left = 0;
                            clearTimeout(timer);
                        }, 800);
                    }
                    if (numberPict === i ) {
                        let timer = setTimeout(() => {
                            allPictures[i].classList.remove('hide');
                            button.disabled = false;
                            clearTimeout(timer);
                        }, 800);
                    }
                }

                let nextNumberPict = +numberPict + 1;

                if(Number.isInteger(numberPict / this.countPictInTape)) {

                    this.$tapePict.style.left = -this.widthPicture * numberPict + 'px';
                    this.$buttonTapeLeft.classList.remove('hide');

                    let delay = setTimeout(() => {

                        let positionTape = this.getLeftPosition(this.$tapePict);

                        if (this.widthTapePict + positionTape < this.widthPicture * this.countPictInTape) {

                            this.$buttonTapeRight.classList.add('hide');
                        }
                        clearTimeout(delay);
                    }, 800);
                }
                else if (nextNumberPict < this.countPictInTape + 1) {

                    this.$buttonTapeLeft.classList.add('hide');
                    this.$buttonTapeRight.classList.remove('hide');
                    this.$tapePict.style.left = 0;
                }
                else if (numberPict > this.countPictInTape && !Number.isInteger(numberPict / this.countPictInTape) && this.countPictures - numberPict >= this.countPictInTape - 1) {

                    this.$tapePict.style.left = (-this.widthPicture * this.countPictInTape) * Math.floor(numberPict / this.countPictInTape) + 'px';
                    this.$buttonTapeRight.classList.remove('hide');
                    this.$buttonTapeLeft.classList.remove('hide');
                }
                else if (this.countPictures - numberPict < this.countPictInTape - 1) {

                    this.$tapePict.style.left = (-this.widthPicture * this.countPictInTape) * Math.floor(numberPict / this.countPictInTape) + 'px';
                    this.$buttonTapeRight.classList.add('hide');
                }
                let indexRemoveButton = Number.isInteger(this.countPictures / this.countPictInTape) ? this.countPictInTape : Math.floor(this.countPictures / this.countPictInTape);

                if (this.countPictures - numberPict <= indexRemoveButton) {

                    this.$buttonTapeRight.classList.add('hide');
                }

                if (this.countPictures <= this.countPictInTape) {

                    this.$buttonTapeRight.classList.add('hide');
                }

                for (let i = 0; i < Object.keys(this.$tapePict.children).length; i++) {
                    this.$tapePict.children[i].classList.remove('activePict');
                }

                this.$tapePict.children[numberPict].classList.add('activePict');

                this.showHideButtonSlider (nextNumberPict, leftButton, button, this.countPictures);
                break;

            case 'buttonClose':

                for (let i = 0; i < this.countPictures; i++) {

                    picturesObject[i].removeAttribute('style');
                }

                button.parentElement.classList.add('hide');
                break;

            case 'buttonTapeLeft':
                leftPosition = this.getLeftPosition(this.$tapePict);
                newLeftPosition = leftPosition + this.widthPicture * this.countPictInTape;

                if (newLeftPosition <= 0) {
                    this.$buttonTapeLeft.disabled = true;
                    this.$tapePict.style.left = newLeftPosition + 'px';
                    this.$buttonTapeRight.classList.remove('hide');

                    if (newLeftPosition === 0) {
                        this.$buttonTapeLeft.classList.add('hide');
                    }
                    let timer = setTimeout(() => {
                        this.$buttonTapeLeft.disabled = false;
                        clearTimeout(timer);
                    }, 800);
                }
                break;

            case 'buttonTapeRight' :

                leftPosition = this.getLeftPosition(this.$tapePict);
                newLeftPosition = leftPosition + -this.widthPicture * this.countPictInTape;

                if (newLeftPosition > -this.widthTapePict - this.widthPicture) {
                    this.$buttonTapeRight.disabled = true;
                    this.$tapePict.style.left = newLeftPosition + 'px';
                    this.$buttonTapeLeft.classList.remove('hide');

                    if (newLeftPosition + -this.widthPicture * this.countPictInTape <= -this.widthTapePict) {
                        this.$buttonTapeRight.classList.add('hide');
                    }
                    let timer = setTimeout(() => {
                        this.$buttonTapeRight.disabled = false;
                        clearTimeout(timer);
                    }, 800);
                }
                break;
        }
    };

    cycleForeCreateElement(object, objectImgData){

        let countPictures = Object.keys(objectImgData).length;

        for (let indexKey in object) {

            if (object.hasOwnProperty(indexKey)) {

                object[indexKey].element = [];

                if (object[indexKey].htmlTeg === 'figure') {

                    for (let i = 0; i < countPictures; i++) {

                        object[indexKey].element[i] = document.createElement(object[indexKey].htmlTeg);

                        for (let nameAttr in object[indexKey].attributes) {

                            if (object[indexKey].attributes.hasOwnProperty(nameAttr)) {

                                if (nameAttr === 'class') {

                                    this.addAttrClass(object[indexKey].attributes[nameAttr], object[indexKey].element, i);
                                }
                                else if (nameAttr === 'data-number') {

                                    object[indexKey].element[i].setAttribute(nameAttr, i + 1);
                                }
                                else {
                                    object[indexKey].element[i].setAttribute(nameAttr, object[indexKey].attributes[nameAttr]);
                                }
                            }
                        }
                        if (i !== 0 ) {
                            object[indexKey].element[i].classList.add('hide');
                        }
                    }
                }
                else if (object[indexKey].htmlTeg === 'img') {

                    for (let i = 0; i < countPictures; i++) {

                        object[indexKey].element[i] = document.createElement(object[indexKey].htmlTeg);

                        for (let nameAttr in object[indexKey].attributes) {

                            if (object[indexKey].attributes.hasOwnProperty(nameAttr)) {

                                if (nameAttr === 'class') {

                                    this.addAttrClass(object[indexKey].attributes[nameAttr], object[indexKey].element, i);
                                }
                                else if (nameAttr === 'src') {

                                    object[indexKey].element[i].setAttribute(nameAttr, 'assets/img/' + objectImgData[i].nameFile);
                                }
                                else if(nameAttr === 'alt'){
                                    object[indexKey].element[i].setAttribute(nameAttr, objectImgData[i][this.language]);
                                }
                                else if (nameAttr === 'data-number'){
                                    object[indexKey].element[i].setAttribute(nameAttr, i + 1);
                                }
                                else {
                                    object[indexKey].element[i].setAttribute(nameAttr, object[indexKey].attributes[nameAttr]);
                                }
                            }
                        }
                    }
                }
                else if (object[indexKey].htmlTeg === 'figcaption') {

                    for (let i = 0; i < countPictures; i++) {

                        object[indexKey].element[i] = document.createElement(object[indexKey].htmlTeg);
                        object[indexKey].element[i].innerHTML =  objectImgData[i][this.language];

                        for (let nameAttr in object[indexKey].attributes) {

                            if (object[indexKey].attributes.hasOwnProperty(nameAttr)) {

                                if (nameAttr === 'class') {

                                    this.addAttrClass(object[indexKey].attributes[nameAttr], object[indexKey].element, i);
                                }
                                else {
                                    object[indexKey].element[i].setAttribute(nameAttr, object[indexKey].attributes[nameAttr]);
                                }
                            }
                        }
                    }
                }
                else if (indexKey === 'buttonPicture') {

                    for (let i = 0; i < countPictures; i++) {

                        object[indexKey].element[i] = document.createElement(object[indexKey].htmlTeg);

                        for (let nameAttr in object[indexKey].attributes) {

                            if (object[indexKey].attributes.hasOwnProperty(nameAttr)) {

                                if (nameAttr === 'class') {

                                    if (typeof object[indexKey].attributes[nameAttr] === 'object') {

                                        for (let j = 0; j < object[indexKey].attributes[nameAttr].length; j++) {

                                            object[indexKey].element[i].classList.add(object[indexKey].attributes[nameAttr][j]);
                                        }
                                    }
                                    else {
                                        object[indexKey].element[i].classList.add(object[indexKey].attributes[nameAttr]);
                                    }

                                    if(i === 0){

                                        object[indexKey].element[i].classList.add('activePict');
                                    }
                                }
                                else if (nameAttr === 'data-number'){
                                    object[indexKey].element[i].setAttribute(nameAttr, i + 1);
                                }
                                else {
                                    object[indexKey].element[i].setAttribute(nameAttr, object[indexKey].attributes[nameAttr]);
                                }
                            }
                        }
                        object[indexKey].element[i].addEventListener('click', this.clickMiniPict);
                    }
                }
                else if (object[indexKey].htmlTeg === 'button' && indexKey !== 'buttonPicture') {

                        object[indexKey].element = document.createElement(object[indexKey].htmlTeg);

                        for (let nameAttr in object[indexKey].attributes) {

                            if (object[indexKey].attributes.hasOwnProperty(nameAttr)) {

                                if (nameAttr === 'class') {

                                    if (typeof object[indexKey].attributes[nameAttr] === 'object') {

                                        for (let j = 0; j < object[indexKey].attributes[nameAttr].length; j++) {

                                        object[indexKey].element.classList.add(object[indexKey].attributes[nameAttr][j]);
                                    }
                                }
                                else {
                                    object[indexKey].element.classList.add(object[indexKey].attributes[nameAttr]);
                                }
                            }
                            else {
                                object[indexKey].element.setAttribute(nameAttr, object[indexKey].attributes[nameAttr]);
                            }
                        }
                    }

                    object[indexKey].element.addEventListener('click', this.clickButton);

                    if (object[indexKey].element.dataset.side === 'left' && this.imgData[1]) {

                        object[indexKey].element.classList.add('hide');
                    }
                    if (!this.imgData[1]) {

                        object[indexKey].element.classList.add('hide');
                    }
                    if (!this.imgData[this.countPictInTape] && object[indexKey].element.dataset.js === 'buttonTapeRight') {

                        object[indexKey].element.classList.add('hide');
                    }
                }
                else {
                    object[indexKey].element = document.createElement(object[indexKey].htmlTeg);

                    for (let nameAttr in object[indexKey].attributes) {

                        if (object[indexKey].attributes.hasOwnProperty(nameAttr)) {

                            if (nameAttr === 'class') {

                                if (typeof object[indexKey].attributes[nameAttr] === 'object') {

                                    for (let j = 0; j < object[indexKey].attributes[nameAttr].length; j++) {

                                        object[indexKey].element.classList.add(object[indexKey].attributes[nameAttr][j]);
                                    }
                                }
                                else {
                                    object[indexKey].element.classList.add(object[indexKey].attributes[nameAttr]);
                                }
                            }
                            else {
                                object[indexKey].element.setAttribute(nameAttr, object[indexKey].attributes[nameAttr]);
                            }
                        }
                    }
                }
                for (let indexKeyToo in object[indexKey]) {

                    if (object[indexKey].hasOwnProperty(indexKeyToo)) {

                        if (indexKeyToo === 'children'){

                            this.cycleForeCreateElement(object[indexKey][indexKeyToo], objectImgData);
                        }
                    }
                }
            }
        }
        return object;
    };

    cycleInElement = (knot, parentTemp) => {

        for (let index in knot.children) {

            if (knot.children.hasOwnProperty(index)) {

                if (Object.keys(knot.children[index].element).length !== 0) {

                    for (let i = 0; i < Object.keys(knot.children[index].element).length; i++) {

                        if (Object.keys(parentTemp).length > 0) {

                                parentTemp[i].append(knot.children[index].element[i]);
                        }
                        else {

                            parentTemp.append(knot.children[index].element[i]);
                        }
                            this.cycleInElement(knot.children[index], knot.children[index].element);
                        }
                    }
                    else {

                    parentTemp.append(knot.children[index].element);

                    if(knot.children[index].children) {

                        this.cycleInElement(knot.children[index], knot.children[index].element);
                    }
                }
            }
        }
    };

    mergeElement = (parametersElementsSlider) => {

        let parentElement = parametersElementsSlider.targetAllSlider.element;
        let parentTemp = parentElement;
        let tempObject;
        for (let index in parametersElementsSlider.targetAllSlider.children) {

            if (parametersElementsSlider.targetAllSlider.children.hasOwnProperty(index)) {

                parentElement.append(parametersElementsSlider.targetAllSlider.children[index].element);
                if (parametersElementsSlider.targetAllSlider.children[index].children) {
                    parentTemp = parametersElementsSlider.targetAllSlider.children[index].element;
                    tempObject = parametersElementsSlider.targetAllSlider.children[index];

                    this.cycleInElement(tempObject, parentTemp);
                }
            }
        }
        return parametersElementsSlider
    };
}

class CreatorMainMenu {

    constructor (paramHtml, pathAll) {
        this.elementObject = this.cycleForeCreateElement(paramHtml, pathAll);
        this.htmlObject = this.mergeElement(this.elementObject);
        this.pastInPageHtml();
    }

    pastInPageHtml = () => {
        for (let i in this.htmlObject.columnList.element) {
            this.htmlObject.columnList.parent.append(this.htmlObject.columnList.element[i]);
        }

    };

    addAttrClass = (pathToClass, pathToElem, index) => {

        if (typeof pathToClass === 'object') {

            for (let j = 0; j < pathToClass.length; j++) {

                pathToElem[index].classList.add(pathToClass[j]);
            }
        }
        else {
            pathToElem[index].classList.add(pathToClass);
        }
    };

    cycleForeCreateElement(objectHtml, objectPersonData){

        let countElement = Object.keys(objectPersonData).length;

        for (let indexKey in objectHtml) {

            if (objectHtml.hasOwnProperty(indexKey)) {

                objectHtml[indexKey].element = [];

                if (objectHtml[indexKey].htmlTeg === 'ul') {

                    for (let i = 0; i < Math.ceil(countElement / 39); i++) {

                        objectHtml[indexKey].element[i] = document.createElement(objectHtml[indexKey].htmlTeg);

                        for (let nameAttr in objectHtml[indexKey].attributes) {

                            if (objectHtml[indexKey].attributes.hasOwnProperty(nameAttr)) {

                                if (nameAttr === 'class') {

                                    this.addAttrClass(objectHtml[indexKey].attributes[nameAttr], objectHtml[indexKey].element, i);
                                }
                                else if (nameAttr === 'data-number') {

                                    objectHtml[indexKey].element[i].setAttribute(nameAttr, i + 1);
                                }
                                else {
                                    objectHtml[indexKey].element[i].setAttribute(nameAttr, objectHtml[indexKey].attributes[nameAttr]);
                                }
                            }
                        }
                    }
                }
                else if (objectHtml[indexKey].htmlTeg === 'li') {


                    objectHtml[indexKey].element = { 0 : [],
                                                     1 : [],
                                                    };
                    let number;
                    let y = '';

                    for (let i = 0; i < countElement; i++) {

                        if (i <= 38) {
                            number = 0;
                            y = i;
                        }
                        else {
                            number = 1;
                            y = i - 39;
                        }

                        objectHtml[indexKey].element[number][y] = document.createElement(objectHtml[indexKey].htmlTeg);

                        for (let nameAttr in objectHtml[indexKey].attributes) {

                            if (objectHtml[indexKey].attributes.hasOwnProperty(nameAttr)) {

                                if (nameAttr === 'class') {

                                    this.addAttrClass(objectHtml[indexKey].attributes[nameAttr], objectHtml[indexKey].element[number], y);
                                }
                                else {
                                    objectHtml[indexKey].element[number][y].setAttribute(nameAttr, objectHtml[indexKey].attributes[nameAttr]);
                                }
                            }
                        }
                    }
                }
                else if (objectHtml[indexKey].htmlTeg === 'button') {

                    objectHtml[indexKey].element = { 0 : [],
                        1 : [],
                    };

                    let number;
                    let y = '';

                    for (let i = 0; i < countElement; i++) {

                        if (i <= 38) {
                            number = 0;
                            y = i;
                        }
                        else {
                            number = 1;
                            y = i - 39;
                        }

                        objectHtml[indexKey].element[number][y] = document.createElement(objectHtml[indexKey].htmlTeg);

                        for (let nameAttr in objectHtml[indexKey].attributes) {

                            if (objectHtml[indexKey].attributes.hasOwnProperty(nameAttr)) {

                                if (nameAttr === 'class') {

                                    this.addAttrClass(objectHtml[indexKey].attributes[nameAttr], objectHtml[indexKey].element[number], y);
                                }
                                else if (nameAttr === 'value') {

                                    objectHtml[indexKey].element[number][y].setAttribute(nameAttr, objectPersonData[i + 1].century + '|||' + (i + 1));
                                }
                                else {
                                    objectHtml[indexKey].element[number][y].setAttribute(nameAttr, objectHtml[indexKey].attributes[nameAttr]);
                                }
                            }
                        }
                    }
                }
                else if (objectHtml[indexKey].htmlTeg === 'span') {

                    objectHtml[indexKey].element = { 0 : [],
                        1 : [],
                    };

                    let number;
                    let y = '';

                    for (let i = 0; i < countElement; i++) {

                    if (i <= 38) {
                        number = 0;
                        y = i;
                    }
                    else {
                        number = 1;
                        y = i - 39;
                    }

                    objectHtml[indexKey].element[number][y] = document.createElement(objectHtml[indexKey].htmlTeg);

                    for (let nameAttr in objectHtml[indexKey].attributes) {

                        if (objectHtml[indexKey].attributes.hasOwnProperty(nameAttr)) {

                            if (nameAttr === 'class') {

                                this.addAttrClass(objectHtml[indexKey].attributes[nameAttr], objectHtml[indexKey].element[number], y);
                                }
                                if (nameAttr === 'data-indent') {

                                    if (objectHtml[indexKey].attributes[nameAttr]  === 'name') {
                                        objectHtml[indexKey].element[number][y].setAttribute(nameAttr, 'name');
                                        objectHtml[indexKey].element[number][y].innerHTML = objectPersonData[i + 1].name[0][language];
                                    }
                                    if (objectHtml[indexKey].attributes[nameAttr]  === 'date') {
                                        objectHtml[indexKey].element[number][y].setAttribute(nameAttr, 'date');
                                        objectHtml[indexKey].element[number][y].innerHTML = objectPersonData[i + 1].date;
                                    }

                                }
                                else {
                                    objectHtml[indexKey].element[number][y].setAttribute(nameAttr, objectHtml[indexKey].attributes[nameAttr]);
                                }
                            }
                        }
                    }
                }
                else {

                    objectHtml[indexKey].element = document.createElement(objectHtml[indexKey].htmlTeg);

                    for (let nameAttr in objectHtml[indexKey].attributes) {

                        if (objectHtml[indexKey].attributes.hasOwnProperty(nameAttr)) {

                            if (nameAttr === 'class') {

                                if (typeof objectHtml[indexKey].attributes[nameAttr] === 'object') {

                                    for (let i = 0; i < objectHtml[indexKey].attributes[nameAttr].length; i++) {

                                        objectHtml[indexKey].element.classList.add(objectHtml[indexKey].attributes[nameAttr][i]);
                                    }
                                }
                                else {
                                    objectHtml[indexKey].element.classList.add(objectHtml[indexKey].attributes[nameAttr]);
                                }
                            }
                            else {
                                objectHtml[indexKey].element.setAttribute(nameAttr, objectHtml[indexKey].attributes[nameAttr]);
                            }
                        }
                    }
                }
                for (let indexKeyToo in objectHtml[indexKey]) {

                    if (objectHtml[indexKey].hasOwnProperty(indexKeyToo)) {

                        if (indexKeyToo === 'children'){

                            this.cycleForeCreateElement(objectHtml[indexKey][indexKeyToo], objectPersonData);
                        }
                    }
                }
            }
        }
        return objectHtml;
    };

    cycleInElement = (knot, parentTemp, indexElement) => {

        for (let index in knot.children) {

            if (knot.children.hasOwnProperty(index)) {

                if (Object.keys(knot.children[index].element[indexElement]).length !== 0) {

                    for (let i = 0; i < Object.keys(knot.children[index].element[indexElement]).length; i++) {

                        if (Object.keys(parentTemp).length > 0) {

                            parentTemp[i].append(knot.children[index].element[indexElement][i]);
                        }
                        else {

                            parentTemp.append(knot.children[index].element[indexElement][i]);
                        }

                        this.cycleInElement(knot.children[index], knot.children[index].element[indexElement], indexElement);
                    }
                }
            }
        }
    };

    mergeElement = (parametersElementsSlider) => {

        let parentElement = parametersElementsSlider.columnList.element;
        let parentTemp = parentElement;
        let tempObject;

        for (let indexElement in parametersElementsSlider.columnList.element) {

            if (parametersElementsSlider.columnList.element.hasOwnProperty(indexElement)) {

                for (let index in parametersElementsSlider.columnList.children) {

                    if (parametersElementsSlider.columnList.children.hasOwnProperty(index)) {
                        for(let i = 0; i < parametersElementsSlider.columnList.children[index].element[indexElement].length; i++) {
                            parentElement[indexElement].append(parametersElementsSlider.columnList.children[index].element[indexElement][i]);
                        }

                        if (parametersElementsSlider.columnList.children[index].children) {
                            parentTemp = parametersElementsSlider.columnList.children[index].element[indexElement];
                            tempObject = parametersElementsSlider.columnList.children[index];

                            this.cycleInElement(tempObject, parentTemp, indexElement);
                        }
                    }
                }
            }
        }
        return parametersElementsSlider
    };
}



// let contentLoaded = () => {
//
//     let slider = new ParametersHtmlSlider('#slider_1');
//     slider.removeHtml();
//
//     let btn = document.querySelector('.enter');
//     btn.addEventListener('click', () => {
//         slider.removeHtml();
//         let sliderFull = new CreatorSlider (slider.objectSlider, galleryImgData, language, 4);
//         sliderFull.pastInPlace();
//     });
// };

// document.addEventListener('DOMContentLoaded', contentLoaded);