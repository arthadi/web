
let showHideMainSliderButton = (arraySelectors, id, mainObj) => {

    arraySelectors.keyButtonGallery.dataset.century = id[0];
    arraySelectors.keyButtonGallery.dataset.id = id[1];
    let pictObject = getElementSlider(id, mainObj);

    if (Object.keys(pictObject).length === 0) {

        arraySelectors.keyButtonGallery.classList.add('hide');
    }
    else {

        arraySelectors.keyButtonGallery.classList.remove('hide');
    }
};

let getElementSlider = (id, mainObj) => {

    for (let index in mainObj[id[0]].names) {

        if (mainObj[id[0]].names.hasOwnProperty(index)) {

            if (mainObj[id[0]].names[index].id === id[1]) {

                return mainObj[id[0]].names[index].gallariTeg;
            }
        }
    }
};

let closeSlider = (arraySelectors, mainObj) => {

    let id = {
        0: arraySelectors.keyButtonGallery.dataset.century,
        1: arraySelectors.keyButtonGallery.dataset.id,
    };

    let pictObject = getElementSlider(id, mainObj);

    arraySelectors.keyButtonGalleryClose.addEventListener('click', () => {

        arraySelectors.keySliderBox.classList.remove('show');

        for (let i = 0; i < Object.keys(pictObject).length; i++) {
            pictObject[i].removeAttribute('style');
            pictObject[i].classList.remove('hide');
        }
        arraySelectors.keyButtonGalleryLeft.classList.remove('hide');
        arraySelectors.keyButtonGalleryLeft.removeAttribute('disabled');
        arraySelectors.keyButtonGalleryRight.classList.remove('hide');
        arraySelectors.keyButtonGalleryRight.removeAttribute('disabled');
    })
};



