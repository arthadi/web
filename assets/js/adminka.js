let allText;
let tooText;
let pathAllFirst = {};
let pathAllToo = {};
let delay = false;
let loaded = false;
let dataElement = {
    id: '',
    state: '',
    nameFile: '',
    command: '',
    index: '',
    elementHtml: '',
};

let getData =  (addres) => {

    fetch(addres)
        .then(response => response.text())
        .then(result => allText = result
        )
        .catch(error => console.log(error.message))
};

let getDataToo =  (addres) => {

    fetch(addres)
        .then(response => response.text())
        .then(result =>

            tooText = result
        )
        .then(() =>
            delay = true
        )
        .catch(error => console.log(error.message))
};

// убираем перенос строк
let deleteLineBreak = (string) => {
    return string.replace(/\r?\n/g, "");
};
// разбиваем на подразделы по делителю
let stringDivider = (string, divider) => {
    return string.split(divider);
};

//функция работы с полученной строкой и создание объекта имен файлов
let separatorStringMain = (string, divider) => {

//убираем перенос строк и разбиваем на основные подразделы убираем нумерацию строк
    let arrayFromString = stringDivider(deleteLineBreak(string), divider);

    // создаем объект для всех ссылок на картинки и текст
    for (let i = 0; i < arrayFromString.length; i++) {
        pathAllFirst[i+1] = {};
        let arrayDataPict = arrayFromString[i].split('|||');

        pathAllFirst[i+1].id = arrayDataPict[0];
        pathAllFirst[i+1].century = arrayDataPict[1];
        let arrayFromStringMainAndGallery = arrayDataPict[2].split('&&');
        let arrayPictMain = arrayFromStringMainAndGallery[0].split('///');
        let arrayPictGallery = arrayFromStringMainAndGallery[1].split('///');
        pathAllFirst[i+1].mainImgData = {};
        pathAllFirst[i+1].galleryImgData = {};

        for (let j = 0; j < arrayPictMain.length; j++) {
            let dataPictMain = arrayPictMain[j].split('|&|');

            pathAllFirst[i+1].mainImgData[j] = {
                nameFile: '',
                0: '',
                1: '',
            };
            pathAllFirst[i+1].mainImgData[j].nameFile = dataPictMain[0];
            pathAllFirst[i+1].mainImgData[j][0] = dataPictMain[1];
            pathAllFirst[i+1].mainImgData[j][1] = dataPictMain[2];
        }

        for (let q = 0; q < arrayPictGallery.length; q++) {
            let dataPictGallery = arrayPictGallery[q].split('|&|');

            if (dataPictGallery[0]) {

                pathAllFirst[i + 1].galleryImgData[q] = {
                    nameFile: '',
                    0: '',
                    1: '',
                };
                pathAllFirst[i + 1].galleryImgData[q].nameFile = dataPictGallery[0];
                pathAllFirst[i + 1].galleryImgData[q][0] = dataPictGallery[1];
                pathAllFirst[i + 1].galleryImgData[q][1] = dataPictGallery[2];
            }
        }
    }
    return true;
};

let separatorStringMainToo = (tooText, divider) => {

    let arrayFromString = stringDivider(deleteLineBreak(tooText), divider);

    for (let i = 0; i < arrayFromString.length; i++) {
        pathAllToo[i + 1] = {};

        let arrayDataText = arrayFromString[i].split('|||');
        pathAllToo[i + 1].number = arrayDataText[0];
        let nameText = arrayDataText[1].split('&&');
        pathAllToo[i + 1].name = { 0: nameText[0], 1: nameText[1]};
        pathAllToo[i + 1].date = arrayDataText[2];
        pathAllToo[i + 1].century = arrayDataText[3];
        let shortText = arrayDataText[4].split('&&');
        pathAllToo[i + 1].biografy = { 0: shortText[0], 1: shortText[1]};
        let text = arrayDataText[5].split('&&');
        pathAllToo[i + 1].text = { 0: text[0], 1: text[1]};
        let textIncident = arrayDataText[6].split('||');
        pathAllToo[i + 1].incident = {};

        for (let j = 0; j < textIncident.length; j++) {
            let monastery = textIncident[j].split('&&');
            pathAllToo[i + 1].incident[j] = { 0: monastery[0], 1: monastery[1]};
        }
    }
};

let getFirstText = (path) => {

    getData(path);
    //функция задержки обращения к глобальной переменной pathAllFirst
    let repetition = setInterval(() => {

        if (delay) {
            delay = false;

            if (typeof allText === 'string') {
                separatorStringMain(allText, '||||');
                allText = '';
                delay = true;
                loaded = true;
                clearInterval(repetition);
            }
        }
    }, 5);
};

let getFirstTextToo = () => {
    //функция задержки обращения к глобальной переменной pathAllFirst
    let repetition = setInterval(() => {

        if (delay) {
            delay = false;

            if (typeof tooText === 'string') {
                separatorStringMainToo(tooText, '||||');
                tooText = '';
                delay = true;
                clearInterval(repetition);
            }
        }
    }, 5);
};

//XMLHttpRequest
let upload = (file, page) => {
    let xhr = new XMLHttpRequest();

    // отслеживаем процесс отправки
    xhr.upload.onprogress = function(event) {
        let total = event.total;
        // console.log(`Отправлено ${event.loaded} из ${event.total}`);
    };
    // Ждём завершения: неважно, успешного или нет
    xhr.onloadend = function() {
        if (xhr.status === 200) {
            let stat = "Успех";
        } else {
            let err = "Ошибка " + this.status;
        }
    };
    xhr.open("POST", page, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(file);
};


let  uploadFiles = async(url, files) => {

     await fetch(url, {
         method: 'POST',
         body: new FormData(files),
     });
};

let  removeFiles = async(url, nameFiles) => {
    let jsonText = JSON.stringify(nameFiles);

    await fetch(url, {
        method: 'POST',
        body: jsonText,
    });
};

//клик на кнопках редактирования на главных страницах
let goToEdit = (currentDataset, thisSelector) => {

    for (let key in dataElement) {
        if (key !== 'id') {
            dataElement[key] = '';
        }
    }
    dataElement.command = currentDataset.command;
    dataElement.nameFile = currentDataset.namefile;
    dataElement.state = currentDataset.state;
    dataElement.elementHtml = thisSelector.parentElement.parentElement;
    if (currentDataset.index) dataElement.index = currentDataset.index;

    if (dataElement.state === 'textpict') {

        allSelectors.$imgEdit.setAttribute('src', "assets/img/" + pathAllFirst[dataElement.id].mainImgData[0].nameFile);
        allSelectors.$personNameFile.innerHTML = pathAllFirst[dataElement.id].mainImgData[0].nameFile;
        allSelectors.$personMainImgTextRu.value = pathAllFirst[dataElement.id].mainImgData[0][0];
        allSelectors.$personMainImgTextEn.value = pathAllFirst[dataElement.id].mainImgData[0][1];
        allSelectors.$popup.children[0].innerHTML = `вы уверены что хотите удалить фотографию ${dataElement.nameFile}?`;
    }

    if (dataElement.state === 'textgallery') {

        for (let index in pathAllFirst[dataElement.id].galleryImgData) {

            if (pathAllFirst[dataElement.id].galleryImgData[index].nameFile === dataElement.nameFile) {

                allSelectors.$imgEdit.setAttribute('src', "assets/img/" + pathAllFirst[dataElement.id].galleryImgData[index].nameFile);
                allSelectors.$personNameFile.innerHTML = pathAllFirst[dataElement.id].galleryImgData[index].nameFile;
                allSelectors.$personMainImgTextRu.value = pathAllFirst[dataElement.id].galleryImgData[index][0];
                allSelectors.$personMainImgTextEn.value = pathAllFirst[dataElement.id].galleryImgData[index][1];
                allSelectors.$popup.children[0].innerHTML = `вы уверены что хотите удалить фотографию ${dataElement.nameFile}?`;
            }
        }
    }
    if (dataElement.state === 'text') {

        allSelectors.$biographyTextRu.value = pathAllToo[dataElement.id].biografy[0];
        allSelectors.$biographyTextEn.value = pathAllToo[dataElement.id].biografy[1];
        allSelectors.$mainTextRu.value = pathAllToo[dataElement.id].text[0];
        allSelectors.$mainTextEn.value = pathAllToo[dataElement.id].text[1];
        allSelectors.$monasteryTextRu.value = pathAllToo[dataElement.id].incident[0][0];
        allSelectors.$monasteryTextEn.value = pathAllToo[dataElement.id].incident[0][1];
        allSelectors.$russiaTextRu.value = pathAllToo[dataElement.id].incident[1][0];
        allSelectors.$russiaTextEn.value = pathAllToo[dataElement.id].incident[1][1];
        allSelectors.$worldTextRu.value = pathAllToo[dataElement.id].incident[2][0];
        allSelectors.$worldTextEn.value = pathAllToo[dataElement.id].incident[2][1];
        allSelectors.$dateText.value = pathAllToo[dataElement.id].date;
        allSelectors.$nameTextRu.value = pathAllToo[dataElement.id].name[0];
        allSelectors.$nameTextEn.value = pathAllToo[dataElement.id].name[1];
    }
    if (dataElement.command === 'remove') {
        allSelectors.$popup.classList.remove('display_none');
    }
    else if (dataElement.command === 'text') {
        allSelectors.$personTextLoaderBtn.classList.remove('display_none');
        allSelectors.$personCurrentList.classList.add('display_none');
        window.scrollTo(0,0);
    }
    else {
        allSelectors.$person.classList.remove('display_none');
        allSelectors.$personCurrentList.classList.add('display_none');
    }
};


let getParametersPerson = (e) => {
    let id = e.target.dataset.id;
    dataElement.id = id;
    outPutPerson (id, allSelectors);
};

let outPutPerson = (id, allSelectors) => {

    allSelectors.$personCurrentList.classList.add('display_none');

    for (let index in pathAllFirst) {
        if (id === index) {

            if (pathAllFirst[index].mainImgData[0].nameFile === 'template.jpg' || pathAllFirst[index].mainImgData[0].nameFile.replace(/\s/g,"") === '') {

                allSelectors.$mainPhoto.classList.remove('display_none');
                allSelectors.$removeMainPictBtn.classList.add('display_none');
            }
            else {
                allSelectors.$removeMainPictBtn.classList.remove('display_none');
                allSelectors.$mainPhoto.classList.add('display_none');
            }
            allSelectors.$personTitle.innerHTML = pathAllToo[index].name[0];
            allSelectors.$personMainImg.setAttribute('src', " ");
            allSelectors.$personMainImg.setAttribute('src', "assets/img/" + pathAllFirst[index].mainImgData[0].nameFile);
            allSelectors.$textMainImagesEditBtn.dataset.namefile = pathAllFirst[index].mainImgData[0].nameFile;
            allSelectors.$removeMainPictBtn.dataset.namefile = pathAllFirst[index].mainImgData[0].nameFile;
            allSelectors.$selectorForGallery.innerHTML = '';

            for (let i = 0; i < Object.keys(pathAllFirst[index].galleryImgData).length; i++) {

                allSelectors.$selectorForGallery.insertAdjacentHTML('beforeend',
                    `<li class="gallery_pict">
                    <img class="person-img-main" src="assets/img/${pathAllFirst[index].galleryImgData[i].nameFile}" alt="icon"><div class="box_btn_gallery">
                    <button class="edit" type="button" data-namefile="${pathAllFirst[index].galleryImgData[i].nameFile}" data-command="edit" data-state="textgallery"">редактировать текст к фото</button>
                    <button class="edit" type="button" data-namefile="${pathAllFirst[index].galleryImgData[i].nameFile}" data-command="remove" data-state="textgallery" data-index="${i}">удалить фото</button>
                    </div>
                    </li>`
                );
            }
            setTimeout(() => {
                allSelectors.$personCurrentList.classList.remove('display_none');
            }, 200);
        }
    }
};

let createElementBtn = (teg, classList, dataId, dataCentury, text, name) => {
    let element = document.createElement(teg);

    for (let i = 0; i < classList.length; i++) {
        element.classList.add(classList[i]);
    }
    element.setAttribute('type', "button");
    element.setAttribute('data-id', dataId);
    element.setAttribute('data-century', dataCentury);
    element.innerText = text + ' ' + name;
    element.addEventListener('click', getParametersPerson);
    return element;
};

let createElementLi = (teg, classList) => {
    let element = document.createElement(teg);

    for (let i = 0; i < classList.length; i++) {
        element.classList.add(classList[i]);
    }
    return element;
};

//загрузка фото
let loaderMainPict = (allSelectors) => {

    let loadFile;

    allSelectors.$loaderMainPict.addEventListener('change', function (e) {

        const objFiles = e.target.files;

        for(let file in objFiles) {

            loadFile = objFiles;

            if (file !== 'length' && file !== 'item') {

                const reader = new FileReader();

                reader.onload = e => {
                    allSelectors.$newMainPict.setAttribute('src', e.target.result);
                };
                allSelectors.$loaderMainPict.classList.add('display_none');
                allSelectors.$removeLoadPictBtn.classList.remove('display_none');
                allSelectors.$sendLoadPictBtn.classList.remove('display_none');
                allSelectors.$newNameMainPict.innerHTML = objFiles[file].name;
                dataElement.nameFile = objFiles[file].name;
                reader.readAsDataURL(objFiles[file]);
            }
        }
    });

    allSelectors.$removeLoadPictBtn.addEventListener('click', function ()  {
        allSelectors.$loaderMainPict.value = '';
        allSelectors.$newNameMainPict.innerHTML = '';
        allSelectors.$loaderMainPict.classList.remove('display_none');
        allSelectors.$sendLoadPictBtn.classList.add('display_none');
        allSelectors.$newMainPict.setAttribute('src', '');
        this.classList.add('display_none');
    });

    allSelectors.$formAddMainPict.onsubmit = function (e)  {
        e.preventDefault();
        let textRu = allSelectors.$newMainImgTextRu.value.trim();
        let textEn = allSelectors.$newMainImgTextEn.value.trim();

        if (textRu === '' && textEn === '') {
            allSelectors.$popupAttention.classList.remove('display_none');

            let tick = setTimeout(() => {

                allSelectors.$popupAttention.classList.add('display_none');
                clearTimeout(tick);
            }, 4000);
            return;
        }
        if(dataElement.state === 'textpict') {

            pathAllFirst[dataElement.id].mainImgData[0] = {nameFile: dataElement.nameFile, 0: textRu.trim(), 1: textEn,};



            let timeDelay = setTimeout(() => {
            allSelectors.$personMainImg.setAttribute('src', 'assets/img/' + dataElement.nameFile);
            allSelectors.$mainPhoto.classList.add('display_none');
            allSelectors.$removeMainPictBtn.classList.remove('display_none');
                clearTimeout(timeDelay);
            },1000);



        }
        else if (dataElement.state === 'textgallery'){

            let number;

            if (Object.keys(pathAllFirst[dataElement.id].galleryImgData).length === 0) {

                number = 0;
            }
            else {

                number = Number(Object.keys(pathAllFirst[dataElement.id].galleryImgData).splice(-1, 1).pop()) + 1;
            }

            pathAllFirst[dataElement.id].galleryImgData[number] = {nameFile: dataElement.nameFile, 0: textRu.trim(), 1: textEn,};

            let timeDelay = setTimeout(() => {
                allSelectors.$selectorForGallery.insertAdjacentHTML('beforeend',
                `<li class="gallery_pict">
                    <img class="person-img-main" src="assets/img/${dataElement.nameFile}" alt="${textRu}">
                    <div class="box_btn_gallery">
                        <button class="edit" type="button" data-namefile="${dataElement.nameFile}" data-command="edit" data-state="textgallery"">редактировать текст к фото</button>
                        <button class="edit" type="button" data-namefile="${dataElement.nameFile}" data-command="remove" data-state="textgallery" >удалить фото</button>
                    </div>
                </li>`
                );
                clearTimeout(timeDelay);
            },1500);
        }
        this.parentElement.classList.add('display_none');
        allSelectors.$personCurrentList.classList.remove('display_none');

        let jsonText = JSON.stringify(returnToString(pathAllFirst));
        upload(jsonText, 'edit_main_pict.php');
        uploadFiles('catch_pict.php', document.querySelector('#add-main-pict'));

    };
};

//превращение объекта pathAllFirst в строку текста
let returnToString = (pathAllFirst) => {
    let string = '';
    for(let person in pathAllFirst) {
        for(let index in pathAllFirst[person]) {
            if (index === 'id') {

                string += pathAllFirst[person][index] + '|||';
            }
            if (index === 'century') {
                string += pathAllFirst[person][index] + '|||';
            }
            if (index === 'mainImgData') {

                    string += pathAllFirst[person][index][0].nameFile + '|&|';
                    string += pathAllFirst[person][index][0][0] + '|&|';
                    string += pathAllFirst[person][index][0][1] + '&&';
            }
            if (index === 'galleryImgData') {
                let count = 1;
                if (Object.keys(pathAllFirst[person][index]).length === 0) {

                    string += '||||';
                }
                else {

                    for (let number in pathAllFirst[person][index]) {

                        if (pathAllFirst[person][index][number] !== undefined) {

                            if (count < Object.keys(pathAllFirst[person][index]).length) {

                                string += pathAllFirst[person][index][number].nameFile + '|&|';
                                string += pathAllFirst[person][index][number][0] + '|&|';
                                string += pathAllFirst[person][index][number][1] + '///';
                            }
                            else {
                                string += pathAllFirst[person][index][number].nameFile + '|&|';
                                string += pathAllFirst[person][index][number][0] + '|&|';
                                string += pathAllFirst[person][index][number][1] + '||||';

                                count = 0;
                            }
                            count++;
                        }
                    }
                }
            }
        }
    }
    string = string.slice(0, -4);
    return string;
};

let returnToStringToo = (pathAllToo) => {

    let string = '';

    for (let person in pathAllToo) {

        for(let index in pathAllToo[person]) {

            if (index === 'number') {
                string += pathAllToo[person][index] + '|||';
            }
            if (index === 'name') {
                string += pathAllToo[person][index][0] + '&&';
                string += pathAllToo[person][index][1] + '|||';
            }
            if (index === 'date') {
                string += pathAllToo[person][index] + '|||';
            }
            if (index === 'century') {
                string += pathAllToo[person][index] + '|||';
            }
            if (index === 'biografy') {
                string += pathAllToo[person][index][0] + '&&';
                string += pathAllToo[person][index][1] + '|||';
            }
            if (index === 'text') {
                string += pathAllToo[person][index][0] + '&&';
                string += pathAllToo[person][index][1] + '|||';
            }
            if (index === 'incident') {
                for (let i = 0; i < 3; i++) {
                    if ( i < 2) {
                        string += pathAllToo[person][index][i][0] + '&&';
                        string += pathAllToo[person][index][i][1] + '||';
                    }
                    else {
                        string += pathAllToo[person][index][i][0] + '&&';
                        string += pathAllToo[person][index][i][1] + '||||';
                    }
                }
            }
        }
    }
    string = string.slice(0, -4);
    return string;
};

//создание кнопок персон верхнего меню
let createMainMenu = (pathAllFirst, pathAllToo) => {
    for (let index in pathAllFirst) {

        let $elementLi = createElementLi ('li', ['person__list-element']);
        let $elementBtn = createElementBtn ('button', ['person__list-btn'],index, pathAllFirst[index].century, index, pathAllToo[index].name[0]);

        $elementLi.append($elementBtn);
        allSelectors.$personList.append($elementLi);
    }
};

getFirstText('assets/text/nameFiles.txt'); //nameFiles.txt
getDataToo('assets/text/1.txt');
getFirstTextToo ();

let domLoadedAdmin = () => {

    allSelectors = {
        $personList: document.querySelector('.person__list'),
        $personCurrentList: document.querySelector('.person_current_list'),
        $personTitle: document.querySelector('.person-title'),
        $person: document.querySelector('.person_main_pict_editor'),
        $personPictLoader: document.querySelector('.person_pict_loader'),
        $personFormMainImg: document.querySelector('.person__form-img'),
        $personMainImg: document.querySelector('.person-img-main'),
        $imgEdit: document.querySelector('.img-edit'),
        $personNameFile: document.querySelector('.person-name-file'),
        $personMainImgTextRu: document.querySelector('.file-img__text-ru'),
        $personMainImgTextEn: document.querySelector('.file-img__text-en'),
        $newMainImgTextRu: document.querySelector('#new-main-img-text-ru'),
        $newMainImgTextEn: document.querySelector('#new-main-img-text-en'),
        $applyChangesBtn: document.querySelectorAll('.apply-changes__btn'),
        $inputForTextFirst:document.querySelector('#person-id'),
        $loaderMainPict:document.querySelector('#loader-main-pict'),
        $newMainPict: document.querySelector('#new-main-pict'),
        $newNameMainPict: document.querySelector('#new-name-main-pict'),
        $removeLoadPictBtn: document.querySelector('#remove-load-pict'),
        $sendLoadPictBtn: document.querySelector('#send-load-pict'),
        $formAddMainPict: document.querySelector('#add-main-pict'),
        $mainPhoto: document.querySelector('.main-photo'),
        $goToBack: document.querySelectorAll('.go-to-back'),
        $removeMainPictBtn: document.querySelector('.remove-main_pict'),
        $textMainImagesEditBtn: document.querySelector('.text-main-images'),
        $removePictBtn: document.querySelector('.remove-pict'),
        $selectorForGallery: document.querySelector('.box_current_section_gallery'),
        $popup: document.querySelector('.popup'),
        $cancelRemovePictBtn: document.querySelector('.cancel-remove-pict'),
        $addContentBtn: document.querySelectorAll('.add-content'),
        $popupAttention: document.querySelector('.popup-attention'),
        $attentionBtn: document.querySelector('.attention'),
        $editBtn: document.querySelectorAll('.edit-first'),
        $personTextLoaderBtn: document.querySelector('.person_text_loader'),
        $biographyTextRu: document.querySelector('#biography-text-ru'),
        $biographyTextEn: document.querySelector('#biography-text-en'),
        $mainTextRu: document.querySelector('#main-text-ru'),
        $mainTextEn: document.querySelector('#main-text-en'),
        $monasteryTextRu: document.querySelector('#monastery-text-ru'),
        $monasteryTextEn: document.querySelector('#monastery-text-en'),
        $russiaTextRu: document.querySelector('#russia-text-ru'),
        $russiaTextEn: document.querySelector('#russia-text-en'),
        $worldTextRu: document.querySelector('#world-text-ru'),
        $worldTextEn: document.querySelector('#world-text-en'),
        $textArea: document.querySelectorAll('textarea'),
        $dateText: document.querySelector('#date-text'),
        $nameTextRu: document.querySelector('#name-text-ru'),
        $nameTextEn: document.querySelector('#name-text-en'),
    };

    loaderMainPict(allSelectors);

    createMainMenu(pathAllFirst, pathAllToo);

//клик на кнопках редактирования картинок галлереи
    allSelectors.$selectorForGallery.addEventListener('click', (e) => {

        if (Object.keys(e.target.dataset).length === 0){
            return;
        }
        if (Object.keys(e.target.dataset).length > 0) {

            let currentDataset = e.target.dataset;
            let currentSelector = e.target;

            goToEdit(currentDataset, currentSelector);
        }
    });

//клик на кнопках редактирования помимо кнопок галереи
    for (let i = 0; i < allSelectors.$editBtn.length; i++) {

        allSelectors.$editBtn[i].addEventListener('click', function () {
            let dataSet = this.dataset;
            goToEdit(dataSet, this);
        });
    }

//клик на кнопке возврата к главной странице
    for (let i = 0; i < allSelectors.$goToBack.length; i++ ) {
        allSelectors.$goToBack[i].addEventListener('click', () => {

            if (dataElement.command === 'edit') {
                allSelectors.$person.classList.add('display_none');
                allSelectors.$personCurrentList.classList.remove('display_none');
            }
            if (dataElement.command === 'addpict') {
                allSelectors.$personPictLoader.classList.add('display_none');
                allSelectors.$personCurrentList.classList.remove('display_none');
            }
            if (dataElement.command === 'text') {
                allSelectors.$personTextLoaderBtn.classList.add('display_none');
                allSelectors.$personCurrentList.classList.remove('display_none');
            }
        });
    }

//клик на кнопке предупреждения попапа
    allSelectors.$attentionBtn.addEventListener('click', () => {
        allSelectors.$popupAttention.classList.add('display_none');
    });

//клик на кнопке отменить удаление фото
    allSelectors.$cancelRemovePictBtn.addEventListener('click', () => {
        allSelectors.$popup.classList.add('display_none');
    });

//клик на кнопке добавить фото
    for (let i = 0; i < allSelectors.$addContentBtn.length; i++ ) {

        allSelectors.$addContentBtn[i].addEventListener('click', function () {

            allSelectors.$loaderMainPict.value = '';
            allSelectors.$newNameMainPict.innerHTML = '';
            allSelectors.$loaderMainPict.classList.remove('display_none');
            allSelectors.$sendLoadPictBtn.classList.add('display_none');
            allSelectors.$removeLoadPictBtn.classList.add('display_none');
            allSelectors.$newMainPict.setAttribute('src', '');
            allSelectors.$newMainImgTextRu.value = '';
            allSelectors.$newMainImgTextEn.value = '';

            let dataSet = this.dataset;

            for (let key in dataElement) {
                if (key !== 'id') {
                    dataElement[key] = '';
                }
            }

            dataElement.command = dataSet.command;
            dataElement.state = dataSet.state;

            allSelectors.$personCurrentList.classList.add('display_none');
            allSelectors.$personPictLoader.classList.remove('display_none');
        });
    }

//клик на кнопке удалить фото
    allSelectors.$removePictBtn.addEventListener('click', () => {

        pathAllFirst = changeObjectpathAllFirst(allSelectors, pathAllFirst, pathAllToo, dataElement);

        let jsonText = JSON.stringify(returnToString(pathAllFirst));

        upload(jsonText, 'edit_main_pict.php');

        let currentFile = dataElement.nameFile;

        if (currentFile !== 'template.jpg') {

            removeFiles('removePict.php', currentFile);
        }
        if (dataElement.state === 'textgallery') {
            dataElement.elementHtml.remove();
        }
        if (dataElement.state === 'textpict') {
            dataElement.elementHtml.children[0].setAttribute('src', 'assets/img/template.jpg');
            dataElement.elementHtml.children[1].children[1].classList.add('display_none');
            allSelectors.$mainPhoto.classList.remove('display_none');
        }
        allSelectors.$popup.classList.add('display_none');
    });

    let changeObjectpathAllFirst = (allSelectors, pathAllFirst, pathAllToo, dataElement) => {
        let textRu = allSelectors.$personMainImgTextRu.value;
        let textEn = allSelectors.$personMainImgTextEn.value;

        if (dataElement.state === 'textpict') {

            if (dataElement.command === 'remove') {

                pathAllFirst[dataElement.id].mainImgData[0].nameFile = 'template.jpg';
                pathAllFirst[dataElement.id].mainImgData[0][0] = 'икона';
                pathAllFirst[dataElement.id].mainImgData[0][1] = 'icon';
                return pathAllFirst;
            }
            else {

                pathAllFirst[dataElement.id].mainImgData[0][0] = textRu.trim();
                pathAllFirst[dataElement.id].mainImgData[0][1] = textEn.trim();
                return pathAllFirst;
            }
        }
        else if  (dataElement.state === 'textgallery') {

            for (let index in pathAllFirst[dataElement.id].galleryImgData) {
                if (pathAllFirst[dataElement.id].galleryImgData[index].nameFile === dataElement.nameFile) {

                    if (dataElement.command === 'remove') {
                        delete pathAllFirst[dataElement.id].galleryImgData[index];
                        return pathAllFirst;
                    }
                    else {
                        pathAllFirst[dataElement.id].galleryImgData[index][0] = textRu.trim();
                        pathAllFirst[dataElement.id].galleryImgData[index][1] = textEn.trim();
                        return pathAllFirst;
                    }
                }
            }
        }
        else {
            pathAllToo[dataElement.id].biografy[0] = allSelectors.$biographyTextRu.value.trim();
            pathAllToo[dataElement.id].biografy[1] = allSelectors.$biographyTextEn.value.trim();
            pathAllToo[dataElement.id].text[0] = allSelectors.$mainTextRu.value.trim();
            pathAllToo[dataElement.id].text[1] = allSelectors.$mainTextEn.value.trim();
            pathAllToo[dataElement.id].incident[0][0] = allSelectors.$monasteryTextRu.value.trim();
            pathAllToo[dataElement.id].incident[0][1] = allSelectors.$monasteryTextEn.value.trim();
            pathAllToo[dataElement.id].incident[1][0] = allSelectors.$russiaTextRu.value.trim();
            pathAllToo[dataElement.id].incident[1][1] = allSelectors.$russiaTextEn.value.trim();
            pathAllToo[dataElement.id].incident[2][0] = allSelectors.$worldTextRu.value.trim();
            pathAllToo[dataElement.id].incident[2][1] = allSelectors.$worldTextEn.value.trim();
            pathAllToo[dataElement.id].date = allSelectors.$dateText.value.trim();
            pathAllToo[dataElement.id].name[0] = allSelectors.$nameTextRu.value.trim();
            pathAllToo[dataElement.id].name[1] = allSelectors.$nameTextEn.value.trim();

            return pathAllToo;
        }
    };

    let postFileTextForPict = (e) => {
        e.preventDefault();

        if (dataElement.state === 'text') {
            pathAllToo = changeObjectpathAllFirst(allSelectors,pathAllFirst, pathAllToo, dataElement);
            for (let child in allSelectors.$personList.children) {

                if (child !== 'length' && child !== 'item' && child !== 'namedItem') {

                    if (allSelectors.$personList.children[child].children[0].dataset.id === dataElement.id) {

                        allSelectors.$personList.children[child].children[0].innerHTML = pathAllToo[dataElement.id].name[0];
                    }
                }
            }
            allSelectors.$personTitle.innerHTML = pathAllToo[dataElement.id].name[0];

            let jsonText = JSON.stringify(returnToStringToo(pathAllToo));
            upload(jsonText, 'edit_main_text.php');
            allSelectors.$personTextLoaderBtn.classList.add('display_none');
        }
        else {
            pathAllFirst = changeObjectpathAllFirst(allSelectors, pathAllFirst, pathAllToo, dataElement);
            let jsonText = JSON.stringify(returnToString(pathAllFirst));
            upload(jsonText, 'edit_main_pict.php');

        }
        allSelectors.$personCurrentList.classList.remove('display_none');
        allSelectors.$person.classList.add('display_none');
    };

    //растановка брейкпоинтов
    let stringEnter = () => {
        let strAfterEnter;
        let strBeforeEnter;
        let pointCursor;
        let allString;

        for (let i = 0; i < allSelectors.$textArea.length; i++){

            allSelectors.$textArea[i].addEventListener('keydown', (e) => {

                pointCursor = allSelectors.$textArea[i].selectionStart;
                allString = allSelectors.$textArea[i].value.length;

                if(e.code === 'Enter' && !e.target.dataset.type) {

                    if (allString > pointCursor) {
                        strAfterEnter = allSelectors.$textArea[i].value.slice(0, pointCursor);
                        strBeforeEnter = allSelectors.$textArea[i].value.slice(pointCursor, allString);
                        allSelectors.$textArea[i].value = strAfterEnter + '<br>';

                    }
                    else {
                        allSelectors.$textArea[i].value = allSelectors.$textArea[i].value + '<br>'.trim();
                        allSelectors.$textArea[i].selectionStart = allSelectors.$textArea[i].value.length;
                    }
                }
                if(e.code === 'Enter' && e.target.dataset.type) {

                    if (allString > pointCursor) {
                        strAfterEnter = allSelectors.$textArea[i].value.slice(0, pointCursor);
                        strBeforeEnter = allSelectors.$textArea[i].value.slice(pointCursor, allString);
                        allSelectors.$textArea[i].value = strAfterEnter + '<br><span class="br"></span>'.trim();
                    }
                    else {
                        allSelectors.$textArea[i].value = allSelectors.$textArea[i].value + '<br><span class="br"></span>'.trim();
                    }
                }
            });

            allSelectors.$textArea[i].addEventListener('keyup', (e) => {

                if(e.code === 'Enter' && !e.target.dataset.type) {
                    if (allString > pointCursor) {
                        allSelectors.$textArea[i].value += strBeforeEnter;
                        allSelectors.$textArea[i].selectionStart = allSelectors.$textArea[i].value.length;
                    }
                }
                if(e.code === 'Enter' && e.target.dataset.type) {
                    if (allString > pointCursor) {
                        allSelectors.$textArea[i].value += strBeforeEnter;
                        allSelectors.$textArea[i].selectionStart = allSelectors.$textArea[i].value.length;
                    }
                }
            });
        }
    };

    stringEnter();
//кнопка редактирования текста
    for (let i = 0; i < allSelectors.$applyChangesBtn.length; i++){

        allSelectors.$applyChangesBtn[i].addEventListener('click', postFileTextForPict);
    }
};


let time = setInterval( () => {

    if (loaded) {
        clearInterval(time);
document.addEventListener('DOMContentLoaded', domLoadedAdmin());

    }
}, 25);