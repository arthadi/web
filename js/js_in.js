    let pathAll = {};
    let allText;
    let id;
    let requestForFolder;
    let nameAndDate = {};
    let delay = false;
    let objectBoxes;
    let mainObj = {};
    let clickNumber = false;
    let seconds = 0;
    let language = 0;

    let flagData = () => {
        if (window.location.href.indexOf('?') !== -1) {
            let addressPage = window.location.href;

            return addressPage.slice(addressPage.indexOf('?') + 1);
        }
        else{
            return true;
        }
    };

    let flag = flagData();

    console.log(typeof flag);

    if (flag === 'false') {
        console.log(1111);
        language = 1;
    }
    else {
        language = 0;
    }

    console.log(language);

    // let locationAddress = window.location.href;
    // let onlyHref = locationAddress.slice(0,locationAddress.indexOf('?'));
    // let newHref = onlyHref + '?' + flag;




    let domLoaded = () => {

        let slider = new ParametersHtmlSlider('#slider_1');
        let mainMenu = new ParametersHtmlSlider('.nav-title__box');

        let mainMenuTitlePage = new CreatorMainMenu(mainMenu.objectSlider, pathAll, language);

        let headerTitle = document.querySelectorAll('.header__title');
        let footerTitle = document.querySelector('.footer__title');
        let mainBox = document.querySelector('.main');
        let textShortBio = document.querySelector('.main__short-biography');
        let imgMainBox = document.querySelector('.main__img-main');
        let textArticleBox = document.querySelector('.main__text');
        let textArticleWrapper = document.querySelector('.main__text-box_wrapper');
        let textHistoryBox = document.querySelector('.footer__text-box');
        let boxVerticalList = document.querySelector('.main-navigation__main_box');
        let bottomVerticalList = document.querySelectorAll('.wrapper-vertical-menu__button');
        let centuryButton = document.querySelectorAll('.main-navigation__button');
        let buttonAllTitle = document.querySelectorAll('.nav-title__button');
        let titlePageBox = document.querySelector('.title-page-box');
        let footerMenu = document.querySelector('.footer__menu');
        let buttonFooterMenu = document.querySelectorAll('.footer__menu-elem');
        let buttonGallery = document.querySelector('.button-gallery');
        let buttonLongText = document.querySelector('.button-long-text');
        let buttonHome = document.querySelector('.button-go-home');
        let footerMenuElem = document.querySelectorAll('.footer__menu-elem');
        let languageButton = document.querySelectorAll('.language-box__ru-button');


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
            keyFooterMenu: footerMenu,
            keyButtonLongText: buttonLongText,
            keyTextArticleWrapper: textArticleWrapper,
            keyButtonHome: buttonHome,
            keyHeaderTitle: headerTitle,
            keyFooterTitle: footerTitle,
            keyFooterMenuElem: footerMenuElem,
            keyLanguageButton: languageButton,
        };


        for (let i = 0; i < arraySelectors.keyLanguageButton.length; i++) {

            arraySelectors.keyLanguageButton[i].addEventListener('click', () => {

                if (arraySelectors.keyLanguageButton[i].value === 'true'){
                    flag = true;
                }
                if (arraySelectors.keyLanguageButton[i].value === 'false'){
                    flag = false;
                }

                let locationAddress = window.location.href;
                let onlyHref = locationAddress.slice(0,locationAddress.indexOf('?'));
                let newHref = onlyHref + '?' + flag;
                document.location.assign(newHref);
// document.location.reload();
                // begin(arraySelectors, mainObj, id);
                // console.log(flag);
            });
        }


        objectBoxes = arraySelectors;

        let showSlider = () => {

            let personData = getPersonData(arraySelectors.keyButtonGallery.dataset.century, arraySelectors.keyButtonGallery.dataset.id, mainObj);

            slider.removeHtml(slider.objectSlider.targetAllSlider.element);
            let sliderFull = new CreatorSlider (slider.objectSlider, personData.galleryImgData, language, 4);
            sliderFull.pastInPlace();
        };

        showLongText(arraySelectors);

        arraySelectors.keyButtonHome.addEventListener('click', () => {

            arraySelectors.keyBoxVerticalList.classList.remove('no-transition');
            arraySelectors.keyTitlePageBox.removeAttribute('style');
            arraySelectors.keyBoxVerticalList.removeAttribute('style');
        });
//управление возвращением к первой странице
        document.addEventListener('click', (e) => {



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

                            slider.removeHtml(slider.objectSlider.targetAllSlider.element);
                            arraySelectors.keyBoxVerticalList.removeAttribute('style');
                            arraySelectors.keyBoxVerticalList.classList.remove('no-transition');
                            clearTimeout(timeSliderPage);
                        }, 800);

                        seconds = 0;
                        clickNumber = false;
                        clearTimeout(setName);
                        return;
                    }
                    if (seconds === 60000 && +arraySelectors.keyTitlePageBox.style.left === 0 && !clickNumber) {
                        arraySelectors.keyTitlePageBox.style.left = 0 + 'px';
                        let timeSliderPage = setTimeout( () => {

                            slider.removeHtml(slider.objectSlider.targetAllSlider.element);
                            arraySelectors.keyBoxVerticalList.removeAttribute('style');
                            arraySelectors.keyBoxVerticalList.classList.remove('no-transition');
                            clearTimeout(timeSliderPage);
                        }, 800);

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

            let $buttonShowGallery = document.createElement("button");
            $buttonShowGallery.className = 'button-gallery';
            $buttonShowGallery.setAttribute('type', 'button');
            $buttonShowGallery.setAttribute('data-century', '');
            $buttonShowGallery.setAttribute('data-id', '');
            $buttonShowGallery.innerHTML = '<svg class="icon_gallery" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 453.92 452.83">\n' +
                '            <use xlink:href="assets/img/sprite-icon-svg.svg#icon_gallery"></use>\n' +
                '        </svg>';


            for (let i = 0; i < arraySelectors.keyHeaderTitle.length; i++) {
                arraySelectors.keyHeaderTitle[i].innerHTML = language === 0 ? 'Настоятели Кирилло-Белозерского монастыря' : 'Abbot of the Kirillo-Belozersky Monastery';
            }
            arraySelectors.keyFooterTitle.innerHTML = language === 0 ? 'СОБЫТИЯ ЭТОГО ПЕРИОДА' : 'EVENTS OF THIS PERIOD';

            for (let i = 0; i < arraySelectors.keyFooterMenuElem.length; i++) {

                if (+arraySelectors.keyFooterMenuElem[i].dataset.type === 1) {
                    arraySelectors.keyFooterMenuElem[i].innerHTML = language === 0 ? 'в монастыре' : 'in the monastery';
                }
                else if (+arraySelectors.keyFooterMenuElem[i].dataset.type === 2) {
                    arraySelectors.keyFooterMenuElem[i].innerHTML = language === 0 ? 'в российской истории' : 'in Russian history';
                }
                else if (+arraySelectors.keyFooterMenuElem[i].dataset.type === 3) {
                    arraySelectors.keyFooterMenuElem[i].innerHTML = language === 0 ? 'в мировой истории' : 'in world history';
                }
            }

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
                        arraySelectors.keyButtonGallery.setAttribute('data-century', id[0]);
                        arraySelectors.keyButtonGallery.setAttribute('data-id', id[1]);
                        arraySelectors.keyBoxVerticalList.classList.add('no-transition');

                        for (let i = 0; i < arraySelectors.keyBottomVerticalList.length; i++ ) {
                            arraySelectors.keyBottomVerticalList[i].dataset.century = id[0];
                        }

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

                        let numberListsBox = displayContent(id[0], mainObj, id[1], arraySelectors);

                        let numberActiveBox = activateElementVerticalList (numberListsBox, mainObj, id[0], id[1]);

                        let timerAutoAnimate = setTimeout( () => {
                            autoAnimatePersonsList (arraySelectors.keyBottomVerticalList, numberActiveBox, id[0]);
                            clearTimeout(timerAutoAnimate);
                        }, 800);

                        if (statePage) {

                            clickToButtonList(arraySelectors, id[0]);
                            clickToButtonCentury(id[0], arraySelectors, mainObj);
                            clickButtonFooterMenu(arraySelectors, mainObj);
                        }
                    });
                }
            }
        };
        begin(arraySelectors, mainObj, id);
    };

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
                        let mergeAll = margeObjectToo(separatorStringText(allText), mainObj);
                        document.addEventListener('DOMContentLoaded', domLoaded());
                        return mergeAll;
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


    let clickButtonFooterMenu = (arraySelectors, mainObj) => {
        for (let i = 0; i < arraySelectors.keyButtonFooterMenu.length; i++) {

            arraySelectors.keyButtonFooterMenu[i].addEventListener('click', (e) => {

                let id = e.target.parentElement.dataset.id;
                let century = e.target.parentElement.dataset.century;

                for (let j = 0; j < arraySelectors.keyButtonFooterMenu.length; j++) {

                    arraySelectors.keyButtonFooterMenu[j].classList.remove('footer__menu-elem_active');
                }
                let dataType = e.target.dataset.type;

                    for( let person in mainObj[century].names ) {

                    if (mainObj[century].names.hasOwnProperty(person)) {

                        if (mainObj[century].names[person].id === id) {

                            arraySelectors.keyTextHistoryBox.innerHTML =  mainObj[century].names[person].history[dataType - 1][language];

                            arraySelectors.keyButtonFooterMenu[i].classList.add('footer__menu-elem_active');
                        }
                    }
                }
            });
        }
    };