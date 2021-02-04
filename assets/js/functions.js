let getData = (addres) => {

    if(navigator.appName.search('Microsoft')>-1) {
        requestForFolder = new ActiveXObject('MSXML2.XMLHTTP');
    }
    else {
        requestForFolder = new XMLHttpRequest();
    }
    requestForFolder.open('get', addres, true);
    requestForFolder.onreadystatechange = () => {

        if(requestForFolder.readyState === 4) {
            allText = requestForFolder.responseText;
            delay = true;
        }
    };
    requestForFolder.send(null);
};
// убираем перенос строк
let deleteLineBreak = (string) => {
    return string.replace(/\r?\n/g, "");
};
// разбиваем на подразделы по делителю
let stringDivider = (string, divider) => {
    return string.split(divider);
};
//получение выборки контента для персоны
let getPersonData = (century, index2, mainObj) => {
    let personContent = {};

    for (let indexKey in mainObj[century].names) {

        if (mainObj[century].names.hasOwnProperty(indexKey)) {

            for (let valuePerson in mainObj[century].names[indexKey]) {

                if (mainObj[century].names[indexKey].hasOwnProperty(valuePerson)) {

                    if (valuePerson === 'id' && mainObj[century].names[indexKey][valuePerson] === index2) {

                        personContent.shortBio = mainObj[century].names[indexKey].shortBio;
                        personContent.mainText = mainObj[century].names[indexKey].mainText;
                        personContent.history = mainObj[century].names[indexKey].history;
                        personContent.mainImgData = mainObj[century].names[indexKey].mainImgData[0];
                        personContent.galleryImgData = mainObj[century].names[indexKey].galleryImgData;
                        personContent.name = mainObj[century].names[indexKey].name;
                        personContent.date = mainObj[century].names[indexKey].date;
                        personContent.index = indexKey;

                        return personContent;
                    }
                }
            }
        }
    }
};

//функция работы с полученной строкой и создание объекта имен файлов
let separatorStringMain = (string, divider) => {

//убираем перенос строк и разбиваем на основные подразделы убираем нумерацию строк
let arrayFromString = stringDivider(deleteLineBreak(string), divider);

    // создаем объект для всех ссылок на картинки и текст
    for (let i = 0; i < arrayFromString.length; i++) {
        pathAll[i+1] = {};

        let arrayDataPict = arrayFromString[i].split('|||');
        pathAll[i+1].id = arrayDataPict[0];
        pathAll[i+1].century = arrayDataPict[1];
        let arrayFromStringMainAndGallery = arrayDataPict[2].split('&&');
        let arrayPictMain = arrayFromStringMainAndGallery[0].split('///');
        let arrayPictGallery = arrayFromStringMainAndGallery[1].split('///');
        pathAll[i+1].mainImgData = {};
        pathAll[i+1].galleryImgData = {};

        for (let j = 0; j < arrayPictMain.length; j++) {
            let dataPictMain = arrayPictMain[j].split('|&|');

            pathAll[i+1].mainImgData[j] = {
                    nameFile: '',
                    0: '',
                    1: '',
                };
            pathAll[i+1].mainImgData[j].nameFile = dataPictMain[0];
            pathAll[i+1].mainImgData[j][0] = dataPictMain[2];
            pathAll[i+1].mainImgData[j][1] = dataPictMain[1];
        }

        for (let q = 0; q < arrayPictGallery.length; q++) {
            let dataPictGallery = arrayPictGallery[q].split('|&|');

            if (dataPictGallery[0]) {

                pathAll[i + 1].galleryImgData[q] = {
                    nameFile: '',
                    0: '',
                    1: '',
                };
                pathAll[i + 1].galleryImgData[q].nameFile = dataPictGallery[0];
                pathAll[i + 1].galleryImgData[q][0] = dataPictGallery[1];
                pathAll[i + 1].galleryImgData[q][1] = dataPictGallery[2];
            }
        }
    }
    return true;
};

//сепаратор строки с текстом и создание объекта
let separatorStringText = (allText) => {

    let firstArray = stringDivider(deleteLineBreak(allText), '||||');
    let textArray = [];
    let textObject = {};

    for (let i = 0; i < firstArray.length; i++) {
        textArray[i] = firstArray[i].split('|||');
    }

    for (let i = 0; i < textArray.length; i++) {

        for (let j = 0; j < textArray[i].length; j++) {

                textArray[i][j] = textArray[i][j].split('||');

            for (let r = 0; r < textArray[i][j].length; r++) {
                textArray[i][j][r] = textArray[i][j][r].split('&&');
            }
        }
    }
    let keyArray = ['id', 'name', 'date', 'century', 'shortBio', 'mainText', 'history'];

    for (let i = 0; i < textArray.length; i++) {

        textObject[i] = {};

        for (let j = 0; j < textArray[i].length; j++) {

            textObject[i][keyArray[j]] = '';

            if (j !== 1 && j < 4) {
                textObject[i][keyArray[j]] = textArray[i][j][0][0];
            }
            else {
                textObject[i][keyArray[j]] = textArray[i][j];
            }
        }
    }
    // console.log(textObject);
    // return;
    return textObject;
};

let displayContent = (century, mainObj, id, selectorsObject) => {

    let countListsBox = personsListCreator(century, mainObj);
    let personObject = getPersonData(century, id, mainObj);

    selectorsObject.keyShortBio.innerHTML = personObject.shortBio[0][language];
    selectorsObject.keyTextArticleBox.innerHTML = personObject.mainText[0][language];
    $(selectorsObject.keyTextArticleBox).hyphenate();
    selectorsObject.keyTextHistoryBox.innerHTML = personObject.history[0][language];
    selectorsObject.keyImgMainBox.setAttribute('src', 'assets/img/' + personObject.mainImgData.nameFile);
    selectorsObject.keyFooterMenu.dataset.id = id;
    selectorsObject.keyFooterMenu.dataset.century = century;

    let heightWrapperTextArticle = selectorsObject.keyTextArticleWrapper.offsetHeight;
    let heightBoxTextArticle = selectorsObject.keyTextArticleWrapper.parentElement.offsetHeight;

    selectorsObject.keyTextArticleWrapper.classList.add('no-transition');
    selectorsObject.keyTextArticleWrapper.removeAttribute('style');
    selectorsObject.keyButtonLongText.classList.remove('long-text-after');
    selectorsObject.keyButtonLongText.classList.add('long-text-before');
    selectorsObject.keyButtonLongText.innerHTML = language === 0 ? 'читать далее' : 'read more';

    if (heightWrapperTextArticle > heightBoxTextArticle) {

        selectorsObject.keyButtonLongText.classList.remove('hide');
    }
    else {
        selectorsObject.keyButtonLongText.classList.add('hide');
    }

    if (selectorsObject.keyBoxVerticalList.children.length === 0) {
        for (let i = 0; i < countListsBox; i++) {

            selectorsObject.keyBoxVerticalList.append(mainObj[century].tegForPersonList[i]);
        }
    }
    if (countListsBox > 1) selectorsObject.keyBottomVerticalList[1].style.display="block";
    if (countListsBox === 1)  {
        selectorsObject.keyBottomVerticalList[1].style.display="none";
        selectorsObject.keyBottomVerticalList[0].style.display="none";
    }
    for (let i = 0; i < selectorsObject.keyCenturyButton.length; i++) {

        if (selectorsObject.keyCenturyButton[i].value === century) {

            selectorsObject.keyCenturyButton[i].parentElement.classList.add('active-element');
            selectorsObject.keyCenturyButton[i].setAttribute('disabled', 'true');
        }
    }
    return countListsBox;
};

// Меню клик по векам
let clickToButtonCentury = (currentCentury, selectorsObject, mainObject) => {

    for (let i = 0; i < selectorsObject.keyCenturyButton.length; i++) {

        selectorsObject.keyCenturyButton[i].addEventListener('click', (e) => {

            selectorsObject.keyBoxVerticalList.classList.add('no-transition');

            let heightWrapperTextArticle = selectorsObject.keyTextArticleWrapper.offsetHeight;
            let heightBoxTextArticle = selectorsObject.keyTextArticleWrapper.parentElement.offsetHeight;

            selectorsObject.keyTextArticleWrapper.classList.add('no-transition');
            selectorsObject.keyTextArticleWrapper.removeAttribute('style');
            selectorsObject.keyButtonLongText.classList.remove('long-text-after');
            selectorsObject.keyButtonLongText.classList.add('long-text-before');
            selectorsObject.keyButtonLongText.innerHTML = language === 0 ? 'читать далее' : 'read more';

            if (heightWrapperTextArticle > heightBoxTextArticle) {

                selectorsObject.keyButtonLongText.classList.remove('hide');
            }
            else {
                selectorsObject.keyButtonLongText.classList.add('hide');
            }

            selectorsObject.keyBoxVerticalList.innerHTML = '';
            selectorsObject.keyBoxVerticalList.style.left = 0;

            let newCentury = e.target.value;

            id = {
                0: newCentury,
                1: mainObj[newCentury].names[0].id,
            };

            selectorsObject.keyButtonGallery.dataset.century = id[0];
            selectorsObject.keyButtonGallery.dataset.id = id[1];

            for (let i = 0; i < selectorsObject.keyBottomVerticalList.length; i++ ) {

                if (selectorsObject.keyBottomVerticalList[i].value === 'left') {

                    selectorsObject.keyBottomVerticalList[i].style.display = 'none';
                }
                selectorsObject.keyBottomVerticalList[i].dataset.century = id[0];
            }

            for (let i = 0; i < selectorsObject.keyCenturyButton.length; i++) {

                selectorsObject.keyCenturyButton[i].parentElement.classList.remove('active-element');
                selectorsObject.keyCenturyButton[i].disabled = false;
            }

            selectorsObject.keyFooterMenu.dataset.id = id[1];
            selectorsObject.keyFooterMenu.dataset.century = id[0];

            let countListsBox = displayContent (id[0], mainObject, id[1], selectorsObject);

            activateElementVerticalList (countListsBox, mainObj, id[0], id[1]);

            for (let j = 0; j < selectorsObject.keyButtonFooterMenu.length; j++) {

                selectorsObject.keyButtonFooterMenu[j].classList.remove('footer__menu-elem_active');
            }
            selectorsObject.keyButtonFooterMenu[0].classList.add('footer__menu-elem_active');
        });
    }
};

let getDataForPerson = (id, mainObject, century, index, objectSelector) => {

    let personObject = getPersonData(century, id, mainObject);

    objectSelector.keyTextArticleBox.innerHTML = personObject.mainText[0][language];
    $(objectSelector.keyTextArticleBox).hyphenate();
    objectSelector.keyTextHistoryBox.innerHTML = personObject.history[0][language];
    objectSelector.keyShortBio.innerHTML = personObject.shortBio[0][language];
    objectSelector.keyImgMainBox.src = 'assets/img/' + personObject.mainImgData.nameFile;

    if (Object.keys(personObject.galleryImgData).length === 0) {
        objectSelector.keyButtonGallery.classList.add('hide');
        objectSelector.keyButtonGallery.dataset.century = " ";
        objectSelector.keyButtonGallery.dataset.id = " ";
    }
    else {
        objectSelector.keyButtonGallery.classList.remove('hide');
        objectSelector.keyButtonGallery.dataset.century = century;
        objectSelector.keyButtonGallery.dataset.id = id;
    }
};

let showLongText = (arraySelectors) => {

    arraySelectors.keyButtonLongText.addEventListener('click', function () {

        let heightTextBox = this.previousElementSibling.offsetHeight;
        let $textWrapper = this.previousElementSibling.children[0];
        let heightWrapper = $textWrapper.offsetHeight;
        let heightDifference = (heightWrapper) - heightTextBox;
        $textWrapper.classList.remove('no-transition');

        if (heightDifference > 0 && heightDifference < heightTextBox && !$textWrapper.style.top) {

            $textWrapper.style.top = -heightDifference + 'px';

            if (heightDifference < heightTextBox) {

                toggleButtonForText($textWrapper, this);
            }
        }
        else if (heightDifference > 0 && heightDifference > heightTextBox && !$textWrapper.style.top){

            $textWrapper.style.top = -heightTextBox + 'px';

            if (heightDifference < heightTextBox) {

                toggleButtonForText($textWrapper, this);
            }
        }
        else if (heightDifference > 0 && heightDifference > heightTextBox && $textWrapper.style.top){

            let currentTop = Number($textWrapper.style.top.replace(/[^0-9]/g, ''));
            let differenceTop = heightWrapper - (currentTop + heightTextBox);

            if (differenceTop > 0 && differenceTop < heightTextBox) {

                $textWrapper.style.top = -(currentTop + differenceTop) + 'px';
            }
            else if (differenceTop > 0 && differenceTop > heightTextBox) {

                $textWrapper.style.top = -(currentTop + heightTextBox) + 'px';
            }
            if (differenceTop < heightTextBox) {

                toggleButtonForText($textWrapper, this);
            }
        }
        else if (heightDifference > 0 && heightDifference < heightTextBox && $textWrapper.style.top){

                toggleButtonForText($textWrapper, this);
        }

    });
};

let toggleButtonForText = ($textWrapper, button) => {

    if (button.classList.contains('long-text-after')) {
        $textWrapper.removeAttribute('style');
        button.classList.remove('long-text-after');
        button.classList.add('long-text-before');
        button.innerHTML = language === 0 ? 'читать далее' : 'read more';
    }
    else {
        button.innerHTML = language === 0 ? 'к началу' :'by the start';
        button.classList.remove('long-text-before');
        button.classList.add('long-text-after');
    }
};

let clickToPersonList = (e) => {

    let target = e.target.value ? e.target : e.target.parentElement;

    let id = target.value;

    let elementFooterMenu = target.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[1].children;

    let footerMenuUl = target.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].children[1];

    for (let j = 0; j < elementFooterMenu.length; j++) {

        elementFooterMenu[j].classList.remove('footer__menu-elem_active');
    }
    elementFooterMenu[0].classList.add('footer__menu-elem_active');

// поиск персоны и вывод её контента
    for( let thisCentury in mainObj) {

        if (mainObj.hasOwnProperty(thisCentury)) {

            for( index in mainObj[thisCentury].names) {

                if (mainObj[thisCentury].names.hasOwnProperty(index)) {

                    if(mainObj[thisCentury].names[index].id === id) {
                        footerMenuUl.dataset.century = thisCentury;
                        footerMenuUl.dataset.id = id;
                        getDataForPerson(id, mainObj, thisCentury, index, objectBoxes);
                    }
                }
            }
        }
    }
    for( thisCentury in mainObj) {

        if (mainObj.hasOwnProperty(thisCentury)) {

            for (index in mainObj[thisCentury].tegForPersonList) {

                if (mainObj[thisCentury].tegForPersonList.hasOwnProperty(index)) {

                    for (let i = 0; i < mainObj[thisCentury].tegForPersonList[index].children.length; i++) {
                        mainObj[thisCentury].tegForPersonList[index].children[i].classList.remove('active-element');

                        if (mainObj[thisCentury].tegForPersonList[index].children[i].dataset.id === id) {
                            mainObj[thisCentury].tegForPersonList[index].children[i].classList.add('active-element');
                        }
                    }
                }
            }
        }
    }
    let mainBoxArticle = target.parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling;

    let mainBoxArticleChildren = mainBoxArticle.children;
    let buttonLongArticle = mainBoxArticleChildren[2];
    let textBoxArticle = mainBoxArticleChildren[1];
    let textBoxArticleWrapper = textBoxArticle.children[0];
    let heightWrapperTextArticle = textBoxArticleWrapper.offsetHeight;
    let heightBoxTextArticle = textBoxArticle.offsetHeight;

    textBoxArticleWrapper.classList.add('no-transition');
    textBoxArticleWrapper.removeAttribute('style');
    buttonLongArticle.classList.remove('long-text-after');
    buttonLongArticle.classList.add('long-text-before');
    buttonLongArticle.innerHTML = language === 0 ? 'читать далее' : 'read more';

    if (heightWrapperTextArticle > heightBoxTextArticle) {

        buttonLongArticle.classList.remove('hide');
    }
    else {
        buttonLongArticle.classList.add('hide');
    }
};

//активация элемента вертикального меню при загрузке новой персоны на страницу
let activateElementVerticalList = (countBoxList, mainObject, century, id) => {

    let numberBox = 0;

    for (let i = 0; i < countBoxList; i++) {

        for(let j = 0; j < Object.keys(mainObject[century].tegForPersonList[i].children).length; j++) {

            if (mainObject[century].tegForPersonList[i].children[j].dataset.id === id) {

                mainObject[century].tegForPersonList[i].children[j].classList.add('active-element');
                numberBox = i + 1;
            }
        }
    }
    return numberBox;
};

let autoAnimatePersonsList = (button, countBox, century) => {
    let leftButton = button[0].parentElement.children[0];
    let rightButton = button[0].parentElement.children[2];
    let boxListWidth = mainObj[century].tegForPersonList[0].offsetWidth + 40;
    let transportBox = button[0].nextSibling.parentElement.children[1].children[0];
    let transportBoxCountChildren = transportBox.children.length;

    if(countBox === 1) {
        return;
    }
    if(countBox === 2 && transportBoxCountChildren === 2) {

        transportBox.style.left = - boxListWidth + 'px';
        rightButton.style.display = 'none';

        let delSetTime = setTimeout(() => {
            leftButton.style.display = 'block';
            clearTimeout(delSetTime)
        }, 800);
    }
    if(countBox === 2 && transportBoxCountChildren === 3) {

        transportBox.style.left = - boxListWidth + 'px';
        rightButton.style.display = 'block';

        let delSetTime = setTimeout(() => {
            leftButton.style.display = 'block';
            clearTimeout(delSetTime)
        }, 800);
    }
    if(countBox === 3) {

        if (transportBox.offsetLeft === 0) {
            transportBox.style.left = - boxListWidth * 2 + 'px';

            let delSetTime = setTimeout(() => {
                rightButton.style.display = 'none';
                leftButton.style.display = 'block';
                clearTimeout(delSetTime)
            }, 800);
        }
    }
};
