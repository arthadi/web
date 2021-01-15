    let pathAll = {};
    let allText;
    let id;
    let requestForFolder;
    let nameAndDate = {};
    let flag = true;
    let delay = false;
    let objectBoxes;
    let mainObj = {};
    let clickNumber = false;
    let seconds = 0;
    let language = 0;

    if (!flag) {
        language = 1;
    }
    else {
        language = 0;
    }

    let getFirstText = () => {
        getData('assets/text/nameFiles.txt');

        //функция задержки обращения к глобальной переменной pathAll
        let repetition = setInterval(() => {

            if (delay) {
                delay = false;
                separatorStringMain(allText, '||||');

                if (separatorStringMain(allText, '||||')) {
                    allText = '';
                    delay = true;
                    clearInterval(repetition);
                }}}, 5);
    };

    let getTooText = (firstText,) => {
        let timer = setInterval(() => {

            if(delay){
                delay = false;
                getData('assets/text/1.txt');

                let timer1 = setInterval(() => {

                    if (delay) {
                        buildFullMainObject();
                        margeObject();
                        clearInterval(timer1);

                        return margeObjectToo(separatorStringText(allText), mainObj);
                    }}, 5);
                    clearInterval(timer);
            }}, 5);
    };

    getTooText(getFirstText());

nameAndDate = {};

    let getNameAndDate = (mainObj) => {

        let iteration = 0;
        let pause = setTimeout(function tick () {

            if (Object.keys(mainObj).length > 0) {

                for (let century in mainObj) {

                    if (mainObj.hasOwnProperty(century)) {

                    for (let index in mainObj[century].names) {

                        if (mainObj[century].names.hasOwnProperty(index)) {

                            if (mainObj[century].names[index].date && mainObj[century].names[index].name[0][language]) {
                                nameAndDate[iteration] = {
                                        date: mainObj[century].names[index].date,
                                        name: mainObj[century].names[index].name[0][language],
                                        id: mainObj[century].names[index].id,
                                        century: mainObj[century].names[index].century,
                                    };

                                iteration++;
                            }}}}
                }
                clearTimeout(pause);
                return;
            }
            setTimeout(tick, 20);
        }, 20);
    };

    getNameAndDate(mainObj);


    let clickButtonFooterMenu = (arraySelectors, mainObj, id) => {
        for (let i = 0; i < arraySelectors.keyButtonFooterMenu.length; i++) {

            arraySelectors.keyButtonFooterMenu[i].addEventListener('click', (e) => {

                for (let j = 0; j < arraySelectors.keyButtonFooterMenu.length; j++) {

                    arraySelectors.keyButtonFooterMenu[j].classList.remove('footer__menu-elem_active');
                }
                let dataType = e.target.dataset.type;

                    for( let person in mainObj[id[0]].names ) {

                    if (mainObj[id[0]].names.hasOwnProperty(person)) {

                        if (mainObj[id[0]].names[person].id === id[1]) {

                            arraySelectors.keyTextHistoryBox.innerHTML =  mainObj[id[0]].names[person].history[dataType - 1][language];
                            arraySelectors.keyButtonFooterMenu[i].classList.add('footer__menu-elem_active');
                        }
                    }
                }
            });
        }
    };

document.addEventListener('DOMContentLoaded', () => {

        let mainBox = document.querySelector('.main');
        let textShortBio = document.querySelector('.main__short-biography');
        let imgMainBox = document.querySelector('.main__img-main');
        let textArticleBox = document.querySelector('.main__text');
        let textHistoryBox = document.querySelector('.footer__text-box');
        let boxVerticalList = document.querySelector('.main-navigation__main_box');
        let bottomVerticalList = document.querySelectorAll('.wrapper-vertical-menu__button');
        let centuryButton = document.querySelectorAll('.main-navigation__button');
        let buttonAllTitle = document.querySelectorAll('.nav-title__button');
        let titlePageBox = document.querySelector('.title-page-box');
        let buttonFooterMenu = document.querySelectorAll('.footer__menu-elem');
        let buttonGallery = document.querySelector('.button-gallery');
        let sliderBox = document.getElementById('slider_1');
        let containerForPict = document.querySelector('.sliderBox__container-pict');
        let buttonGalleryNextPrev = document.querySelectorAll('.sliderBox__button-slider');
        let buttonGalleryRight = document.querySelector('.sliderBox__button-slider_right');
        let buttonGalleryLeft = document.querySelector('.sliderBox__button-slider_left');
        let buttonGalleryClose = document.querySelector('.close');


        let arraySelectors = {
            keyMainBox: mainBox,
            keyShortBio: textShortBio,
            keyImgMainBox: imgMainBox,
            keyTextArticleBox: textArticleBox,
            keyTextHistoryBox: textHistoryBox,
            keyBoxVerticalList: boxVerticalList,
            keyBottomVerticalList: bottomVerticalList,
            keyCenturyButton: centuryButton,
            keyTitlePageBox: titlePageBox,
            keyTitleButton: buttonAllTitle,
            keyButtonFooterMenu: buttonFooterMenu,
            keyButtonGallery: buttonGallery,
            keyContainerForPict: containerForPict,
            keyButtonGalleryNextPrev: buttonGalleryNextPrev,
            keySliderBox: sliderBox,
            keyButtonGalleryClose: buttonGalleryClose,
            keyButtonGalleryRight: buttonGalleryRight,
            keyButtonGalleryLeft: buttonGalleryLeft,
        };

        objectBoxes = arraySelectors;

let managementSliderRight = () => {

    let id = {
        0: arraySelectors.keyButtonGallery.dataset.century,
        1: arraySelectors.keyButtonGallery.dataset.id,
    };

    let pictObject = getElementSlider(id, mainObj);
    let countPicturesSlider = Object.keys(pictObject).length;
    let buttonLeft = arraySelectors.keyButtonGalleryLeft;
    let buttonRight =  arraySelectors.keyButtonGalleryRight;

    for (let i = 1; i <= countPicturesSlider; i++) {

        if (+pictObject[i - 1].dataset.number === i && !pictObject[i - 1].classList[2]) {

            buttonRight.disabled = true;
            buttonLeft.disabled = false;
            pictObject[i - 1].style.left = '-2000px';
            let delay = setTimeout(() => {
                pictObject[i - 1].classList.add('hide');
                pictObject[i - 1].style.left = '0px';
                pictObject[i].classList.remove('hide');
                buttonLeft.classList.remove('hide');
                buttonRight.disabled = false;
                if (i === countPicturesSlider - 1) {

                    buttonRight.disabled = true;
                    buttonLeft.disabled = false;
                    buttonRight.classList.add('hide');
                }
                clearTimeout(delay);
            }, 800);
        }
    }
};

let managementSliderLeft = () => {

    let id = {
        0: arraySelectors.keyButtonGallery.dataset.century,
        1: arraySelectors.keyButtonGallery.dataset.id,
    };

    let pictObject = getElementSlider(id, mainObj);
    let countPicturesSlider = Object.keys(pictObject).length;
    let buttonLeft = arraySelectors.keyButtonGalleryLeft;
    let buttonRight =  arraySelectors.keyButtonGalleryRight;

    for (let i = 1; i <= countPicturesSlider; i++) {

        if (+pictObject[i - 1].dataset.number === i && !pictObject[i - 1].classList[2]) {

            pictObject[i - 1].style.left = '1200px';
            buttonRight.disabled = false;
            buttonLeft.disabled = true;

            let delay = setTimeout(() => {
                pictObject[i - 1].classList.add('hide');
                pictObject[i - 1].style.left = '0px';
                pictObject[i - 2].classList.remove('hide');
                buttonRight.classList.remove('hide');
                buttonLeft.disabled = false;
                if (i - 1 === 1) {
                    buttonLeft.disabled = true;
                    buttonRight.disabled = false;
                    buttonLeft.classList.add('hide');
                }
                clearTimeout(delay);
            }, 800);
        }
    }
};

let showSlider = () => {
    let pictObject;

    id = [arraySelectors.keyButtonGallery.dataset.century, arraySelectors.keyButtonGallery.dataset.id];

    pictObject = getElementSlider(id, mainObj);
    arraySelectors.keySliderBox.classList.add('show');

    for(let i = 0; i < Object.keys(pictObject).length; i++) {

         if (i > 0) {
              pictObject[i].classList.add('hide');
         }
    }
    if (Object.keys(pictObject).length === 1) {

        arraySelectors.keyButtonGalleryLeft.classList.add('hide');
        arraySelectors.keyButtonGalleryRight.classList.add('hide');
    }
    else {
        arraySelectors.keyButtonGalleryLeft.classList.add('hide');
    }
    closeSlider (arraySelectors, mainObj);
};

//управление возвращением к первой странице
document.addEventListener('click', () => {
    clickNumber = true;
    if (clickNumber && seconds === 0) {

        let setName = setTimeout(function tick(){

            if (seconds < 60000 && +arraySelectors.keyTitlePageBox.style.left !== 0 && clickNumber) {

                seconds = 0;
                clickNumber = false;
                clearTimeout(setName);
            }
            if (seconds === 60000 && +arraySelectors.keyTitlePageBox.style.left !== 0 && !clickNumber) {
                arraySelectors.keyTitlePageBox.style.left = 0 + 'px';
                let timeSliderPage = setTimeout( () => {
                    arraySelectors.keySliderBox.classList.remove('show');
                    arraySelectors.keyButtonGalleryLeft.classList.remove('hide');
                    arraySelectors.keyButtonGalleryLeft.removeAttribute('disabled');
                    arraySelectors.keyButtonGalleryRight.classList.remove('hide');
                    arraySelectors.keyButtonGalleryRight.removeAttribute('disabled');
                    clearTimeout(timeSliderPage);
                }, 1000);
                seconds = 0;
                clickNumber = false;
                clearTimeout(setName);
                return;
            }
            if (seconds < 60000 && +arraySelectors.keyTitlePageBox.style.left !== 0 && !clickNumber) {
                let number = seconds;
                number = number + 1000;
                seconds = number;
            }
            setName = setTimeout(tick, 1000);
        }, 1000);
    }
});

        //переход на другую страницу с переменной id
let begin = (arraySelectors, mainObj, id) => {

    let $buttonSliderRight = document.createElement("button");
    $buttonSliderRight.className = 'sliderBox__button-slider';
    $buttonSliderRight.classList.add('sliderBox__button-slider_right');
    $buttonSliderRight.setAttribute('type', 'button');
    $buttonSliderRight.setAttribute('data-side', 'right');
    $buttonSliderRight.addEventListener('click', managementSliderRight);

    arraySelectors.keyButtonGalleryRight.remove();
    arraySelectors.keySliderBox.append($buttonSliderRight);
    arraySelectors.keyButtonGalleryRight = $buttonSliderRight;

    let $buttonSliderLeft = document.createElement("button");
    $buttonSliderLeft.className = 'sliderBox__button-slider';
    $buttonSliderLeft.classList.add('sliderBox__button-slider_left');
    $buttonSliderLeft.setAttribute('type', 'button');
    $buttonSliderLeft.setAttribute('data-side', 'left');
    $buttonSliderLeft.addEventListener('click', managementSliderLeft);

    arraySelectors.keyButtonGalleryLeft.remove();
    arraySelectors.keySliderBox.append($buttonSliderLeft);
    arraySelectors.keyButtonGalleryLeft = $buttonSliderLeft;

    let $buttonShowGallery = document.createElement("button");
    $buttonShowGallery.className = 'button-gallery';
    $buttonShowGallery.setAttribute('type', 'button');
    $buttonShowGallery.setAttribute('data-century', '');
    $buttonShowGallery.setAttribute('data-id', '');
    $buttonShowGallery.innerHTML = '<svg class="icon_gallery" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.92 452.83">\n' +
                '            <use xlink:href="assets/img/sprite-icon-svg.svg#icon_gallery"></use>\n' +
                '        </svg>';

    $buttonShowGallery.addEventListener('click', showSlider);

    arraySelectors.keyButtonGallery.remove();
    arraySelectors.keyMainBox.append($buttonShowGallery);
    arraySelectors.keyButtonGallery = $buttonShowGallery;

    for (let i = 0; i < arraySelectors.keyTitleButton.length; i++) {
        if(arraySelectors.keyTitleButton[i]) {

            arraySelectors.keyTitleButton[i].addEventListener('click', function() {
                let dataTape = this.value;
                id = stringDivider(dataTape,'|||');
                let statePage = false;
                arraySelectors.keyTitlePageBox.style.left = -1090 + 'px';

                if (arraySelectors.keyBoxVerticalList.innerHTML !== '' && !statePage) {
                    arraySelectors.keyBoxVerticalList.innerHTML = '';
                    arraySelectors.keyBoxVerticalList.style.left = 0;

                    for (let i = 0; i < arraySelectors.keyBottomVerticalList.length; i++ ) {
                        arraySelectors.keyBottomVerticalList[i].style.display = 'none';
                    }
                    for (let i = 0; i < arraySelectors.keyCenturyButton.length; i++) {
                        arraySelectors.keyCenturyButton[i].parentElement.classList.remove('active-element');
                        arraySelectors.keyCenturyButton[i].disabled = false;
                    }
                }
                statePage = true;
                let countListsBox = displayContent(id[0], mainObj, id[1], arraySelectors);
                let numberActiveBox = activateElementVerticalList (countListsBox, mainObj, id[0], id[1]);

                let timerAutoAnimate = setTimeout( () => {
                    autoAnimatePersonsList (arraySelectors.keyBottomVerticalList, numberActiveBox, id[0]);
                    clearTimeout(timerAutoAnimate);
                }, 800);

                if (statePage) {
                    clickToButtonList(arraySelectors, id[0]);
                    clickToButtonCentury(id[0], arraySelectors, mainObj);
                    clickButtonFooterMenu(arraySelectors, mainObj, id);
                    showHideMainSliderButton (arraySelectors, id, mainObj);
                }
            });
        }
    }
};
    begin(arraySelectors, mainObj, id);

});