
let buildFullMainObject = () => {

    const arrayRomanCentury = ['XV', 'XVI', 'XII', 'XIII', 'XIX', 'XX'];

    for (let i =15; i <= 20; i++) {
        mainObj[i] = {
            romanCentury: arrayRomanCentury[i - 15],
            names: {},
            tegForButtonListTitle: {},
            tegForPersonList: {},
            tegForGalleryImage: {},
            parentDataCentury: i,
        };
    }
    return mainObj;
};

let margeObject = () => {
    let count = 0;
    let numberCentury = 15;

    for (let variable in mainObj) {

        for (let increment in  pathAll) {

            if (pathAll[increment].century === variable && mainObj.hasOwnProperty(variable)) {
                mainObj[numberCentury].names[count] = pathAll[increment];
                count++;
            }
        }
        count = 0;
        numberCentury++;
    }
};

//объединяем mainObj и textObject
let margeObjectToo = (textObject, mainObj) => {
    let count = 0;
    for (let variable in mainObj) {

        for (let increment in  textObject) {

            if (textObject.hasOwnProperty(increment)) {

                if (textObject[increment].century === variable && mainObj.hasOwnProperty(variable)) {
                    mainObj[variable].names[count].history = textObject[increment].history;
                    mainObj[variable].names[count].date = textObject[increment].date;
                    mainObj[variable].names[count].mainText = textObject[increment].mainText;
                    mainObj[variable].names[count].shortBio = textObject[increment].shortBio;
                    mainObj[variable].names[count].name = textObject[increment].name;
                    count++;
                }
                else {
                    count = 0;
                }
            }
        }
    }
};

//создание тега Ul (контейнера для списка персон) и список из тегов Li и сохраняем в mainObject
let personsListCreator = (century, mainObject) => {

    let countPersons = Object.keys(mainObject[century].names).length;

    let countBoxForList = 1;

    if (countPersons > 10) {
        countBoxForList = 2;
    }
    if (countPersons > 20) {
        countBoxForList = 3;
    }
    for (let i = 0; i < countBoxForList; i++) {

        mainObject[century].tegForPersonList[i] = document.createElement('ul');
        mainObject[century].tegForPersonList[i].className = 'main-navigation__box';
        mainObject[century].tegForPersonList[i].classList.add('main-navigation__box_vertical');
        mainObject[century].tegForPersonList[i].setAttribute('data-number', i + 1);
    }
    for (let i = 0; i < countPersons; i++) {

        let liVerticalList = document.createElement('li');
        liVerticalList.className = 'main-navigation__elem';
        liVerticalList.classList.add('main-navigation__elem_vertical');
        liVerticalList.setAttribute('data-id', mainObject[century].names[i].id);
        let buttonVerticalList = document.createElement('button');
        buttonVerticalList.className = 'main-navigation__button';
        buttonVerticalList.classList.add('main-navigation__button_vertical');
        buttonVerticalList.setAttribute('type', 'button');
        buttonVerticalList.setAttribute('data-century', mainObject[century].parentDataCentury);
        buttonVerticalList.setAttribute('value', mainObject[century].names[i].id);
        buttonVerticalList.innerHTML = mainObject[century].names[i].name[0][language] + '<span\n' + 'class="main-navigation_text-right-direct">' + mainObject[century].names[i].date + '</span>';

        buttonVerticalList.addEventListener('click', clickToPersonList);

        liVerticalList.append(buttonVerticalList);

        if (i <= 9) {
            mainObject[century].tegForPersonList[0].append(liVerticalList);
        }

        if (i > 9 && i <= 19) {
            mainObject[century].tegForPersonList[1].append(liVerticalList);
        }

        if (i > 19) {
            mainObject[century].tegForPersonList[2].append(liVerticalList);
        }
    }
    //возвращаем колличество созданных контейнеров
    return countBoxForList;
};

