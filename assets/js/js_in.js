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



//     let buildButtonTitlePage = (nameAndDate) => {
//
//         let pause = setTimeout(function tick () {
//
//             if (Object.keys(nameAndDate).length > 0) {
//
//                 for (let index in nameAndDate) {
//
//                     let LiTitle  = document.createElement('li');
//                     LiTitle.className = 'main-navigation__elem';
//                     LiTitle.classList.add('main-navigation__elem_vertical');
//                     LiTitle.setAttribute('data-id', mainObject[century].names[i].id);
//                     let buttonTitle = document.createElement('button');
//
//
//
// console.log (mainObj);
//                     console.log(nameAndDate[index].name);
//                     console.log(nameAndDate[index].id);
//                     console.log(nameAndDate[index].date);
//                     console.log(nameAndDate[index].century);
//
//
//                 }
//                 clearTimeout(pause);
//                 return;
//             }
//             setTimeout(tick, 20);
//         }, 20);
//     };

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


        let arraySelectors = {
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
        };

        objectBoxes = arraySelectors;


//управление возвращением к первой странице
        document.addEventListener('click', () => {
            clickNumber = true;

            if (clickNumber && seconds === 0) {

                let setName = setTimeout(function tick(){

                    if (seconds < 120000 && +arraySelectors.keyTitlePageBox.style.left !== 0 && clickNumber) {

                        seconds = 0;
                        clickNumber = false;
                        clearTimeout(setName);
                    }

                    if (seconds === 120000 && +arraySelectors.keyTitlePageBox.style.left !== 0 && !clickNumber) {
                        arraySelectors.keyTitlePageBox.style.left = 0 + 'px';
                        seconds = 0;
                        clickNumber = false;
                        clearTimeout(setName);
                        return;
                    }
                    if (seconds < 120000 && +arraySelectors.keyTitlePageBox.style.left !== 0 && !clickNumber) {
                        let number = seconds;
                        number = number + 1000;
                        seconds = number;
                    }
                    setName = setTimeout(tick, 1000);
                }, 1000);
            }
        });

// buildButtonTitlePage(nameAndDate);

        //переход на другую страницу с переменной id
        let begin = (arraySelectors, mainObj, id) => {

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
                        //TODO если делать галерею из произвольного числа картинок добавить очистку галереи
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
                    }
                });
            }
        }
        };
        begin(arraySelectors, mainObj, id);
    });
