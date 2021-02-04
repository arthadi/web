let clickToButtonList = (buttonVariable, century) => {

    for (let i = 0; i < buttonVariable.keyBottomVerticalList.length; i++) {
        buttonVariable.keyBottomVerticalList[i].addEventListener('click', (e) => {

            let thisButton = e.target;
            let leftButton = e.target.parentElement.children[0];
            let rightButton = e.target.parentElement.children[2];
            let valueButton = e.target.value;
            let countBoxList = Object.keys(mainObj[e.target.dataset.century].tegForPersonList).length;
            let boxListWidth = mainObj[e.target.dataset.century].tegForPersonList[0].offsetWidth + 40;
            let transportBox = buttonVariable.keyBottomVerticalList[i].nextSibling.parentElement.children[1].children[0];

            transportBox.classList.remove('no-transition');

            if(+countBoxList === 2 && valueButton === 'right') {

                transportBox.style.left = - boxListWidth + 'px';
                thisButton.style.display = 'none';

                let delSetTime = setTimeout(() => {
                    leftButton.style.display = 'block';
                    clearTimeout(delSetTime)
                }, 800);
            }
            if(countBoxList === 2 && valueButton === 'left') {

                transportBox.style.left = 0 + 'px';
                thisButton.style.display = 'none';

                let delSetTime = setTimeout(() => {
                    rightButton.style.display = 'block';
                    clearTimeout(delSetTime)
                }, 800);
            }
            if(countBoxList === 3 && valueButton === 'right') {

                if (transportBox.offsetLeft > -boxListWidth) {
                    transportBox.style.left = - boxListWidth + 'px';

                    let delSetTime = setTimeout(() => {
                        leftButton.style.display = 'block';
                        clearTimeout(delSetTime)
                    }, 800);
                }
                if (transportBox.offsetLeft < 0) {
                    transportBox.style.left = (transportBox.offsetLeft - boxListWidth) + 'px';

                    let delSetTime = setTimeout(() => {
                        rightButton.style.display = 'none';
                        clearTimeout(delSetTime)
                    }, 800);
                }
            }
            if(countBoxList === 3 && valueButton === 'left') {
                let positionTransportBox = transportBox.offsetLeft;

                if (positionTransportBox > -boxListWidth) {

                    transportBox.style.left = (-transportBox.offsetLeft - boxListWidth) + 'px';
                    let delSetTime = setTimeout(() => {
                        leftButton.style.display = 'none';
                        clearTimeout(delSetTime)
                    }, 800);
                }

                if (positionTransportBox === -boxListWidth) {

                    transportBox.style.left = (-transportBox.offsetLeft - boxListWidth) + 'px';
                    let delSetTime = setTimeout(() => {
                        leftButton.style.display = 'none';
                        clearTimeout(delSetTime)
                    }, 800);
                }
                if (positionTransportBox !== -boxListWidth) {

                    transportBox.style.left = (transportBox.offsetLeft + boxListWidth) + 'px';
                    let delSetTime = setTimeout(() => {
                        rightButton.style.display = 'block';
                        clearTimeout(delSetTime)
                    }, 800);
                }
            }
        });
    }
};
