'use strict'

// свойства

const fullName = document.querySelector('#name')
const visitDate = document.querySelector('#visit-date')
const visitReason = document.querySelector('#reason')
const lastVisitDate = document.querySelector('#last-visit')
const age = document.querySelector('#age')
const pressure = document.querySelector('#pressure')
const massIndex = document.querySelector('#mass-index')
const diseases = document.querySelector('#diseases')
const textarea = document.querySelector('.form__textarea')

// элементы

const openFormBtn = document.querySelector('.page-header__btn')
const closeFormBtn = document.querySelector('.form__close-btn')
const form = document.querySelector('.form')
const select = document.querySelector('.form__select')
const createNewVisitBtn = document.querySelector('.form__btn')
const inputWrapper = document.querySelectorAll('.form__input-wrapper')
const mainContent = document.querySelector('.main-content')
const option = document.querySelectorAll('.form__option')
const inputs = document.querySelectorAll('.form__input')
const title = document.querySelector('.main-content__title')


let selectedOption
let localStorageArr
let newCard

if (localStorage.item) {
    localStorageArr = JSON.parse(localStorage.getItem('item'))
    hideTitle()
} else localStorageArr = []

document.addEventListener('click', (e) => {
    if (!form.contains(e.target)) {
        form.classList.add('hide')
    }
})

// классы

class Visit {
    constructor(name, date, doctor, textarea) {
        this._fullName = name
        this._visitDate = date
        this._doctor = doctor
        this._textarea = textarea
        this._text

    }

    createCard() {

        this._options = [this._fullName, this._visitDate, this._doctor]

        this._card = document.createElement('article')
        this._card.classList = 'visit-card  visit-card--border'

        this._close = document.createElement('button')
        this._close.className = 'close-btn'

        this._card.addEventListener('click', (e) => {
            const articles = document.querySelectorAll('article');
            articles.forEach((item, index) => {
                if (item === e.currentTarget && e.target === this._close) {
                    localStorageArr.splice(index, 1)
                    localStorage.setItem('item', JSON.stringify(localStorageArr))
                    this._card.remove()
                    hideTitle()
                }
            })
        })

        this._card.appendChild(this._close)

        this._options.forEach(item => {
            const p = document.createElement('p')
            p.className = 'article__field-main'
            p.innerHTML = item
            this._card.appendChild(p)
        })

        this._showMore = document.createElement('button')
        this._showMore.innerText = 'Развернуть'
        this._showMore.style.margin = '0 auto'
        this._showMore.classList = 'btn btn--padding'
        this._card.appendChild(this._showMore)

        this._showMore.addEventListener('click', () => {
            this._card.childNodes.forEach((item) => {
                if (item.classList.contains('article__field')) {
                    item.classList.toggle('hide')
                }
            })
            this._showMore.innerText === 'Развернуть' ? this._showMore.innerText = 'Свернуть' : this._showMore.innerText = 'Развернуть'
        })

        if (this._textarea) {
            this._text = document.createElement('p')
            this._text.classList = 'article__field hide'
            this._text.innerText = this._textarea
            this._card.insertBefore(this._text, this._showMore)
        }

        mainContent.appendChild(this._card)

        moveCard(this._card)


        this._args.forEach(item => {
            const p = document.createElement('p')
            p.classList = 'article__field hide'
            p.innerHTML = item
            this._textarea ? this._card.insertBefore(p, this._text) : this._card.insertBefore(p, this._showMore)
        })
    }
}

class TherapistVisit extends Visit {
    constructor(name, date, doctor, textarea, reason, age) {
        super(name, date, doctor, textarea)
        this._reason = reason
        this._age = age
        this._args = [this._reason, this._age]

        this.createCard()

        this._card.style.backgroundColor = 'rgb(61, 38, 38)'
    }
}

class CardiologistVisit extends Visit {
    constructor(name, date, doctor, textarea, reason, age, pressure, diseases) {
        super(name, date, doctor, textarea)
        this._reason = reason
        this._age = age
        this._pressure = pressure
        this._diseases = diseases
        this._args = [this._reason, this._age, this._pressure, this._diseases]

        this.createCard()

        this._card.style.backgroundColor = 'rgb(101, 38, 38)'
    }
}

class DentistVisit extends Visit {
    constructor(name, date, doctor, textarea, reason, lastVisitDate) {
        super(name, date, doctor, textarea)
        this._reason = reason
        this._lastVisitDate = lastVisitDate

        this._args = [this._reason, this._lastVisitDate]

        this.createCard()

        this._card.style.backgroundColor = 'rgb(141, 38, 38)'
    }
}

localStorageArr.forEach(item => {
    switch (item._doctor) {

        case 'Кардиолог':
            new CardiologistVisit(item._fullName, item._visitDate, item._doctor, item._textarea, item._reason, item._age, item._pressure, item._diseases)
            break;

        case 'Стоматолог':
            new DentistVisit(item._fullName, item._visitDate, item._doctor, item._textarea, item._reason, item._lastVisitDate)
            break;

        case 'Терапевт':
            new TherapistVisit(item._fullName, item._visitDate, item._doctor, item._textarea, item._reason, item._age)
    }
})

function addVisit() {

    const fields = document.querySelectorAll('.form__input')

    if ([...fields].some(item => !item.value)) {
        fields.forEach(item => {
            if (!item.value) {
                item.style.border = '2px solid red'
                item.placeholder = 'Заполните это поле'
            } else item.style.border = ''
        })
    } else {
        title.style.display = 'none'

        switch (selectedOption.dataset.name) {

            case 'cardiologist':
                newCard = new CardiologistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, age.value, pressure.value, diseases.value)
                form.classList.toggle('hide')
                addToLocalStorage(newCard)
                break;

            case 'dentist':
                newCard = new DentistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, lastVisitDate.value)
                form.classList.toggle('hide')
                addToLocalStorage(newCard)
                break;

            case 'therapist':
                newCard = new TherapistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, age.value)
                form.classList.toggle('hide')
                addToLocalStorage(newCard)
                break;
        }
    }
}

createNewVisitBtn.addEventListener('click', () => {
    addVisit()
})

// события

openFormBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    select.options.selectedIndex = 0
    clearValues(inputs)
    clearInputs(inputs)
    textarea.value = ''
    form.classList.toggle('hide')
    selectedOption = select.options[select.selectedIndex]

    filterFormFields()
})

closeFormBtn.addEventListener('click', () => {
    form.classList.toggle('hide')
})

select.addEventListener('change', () => {
    selectedOption = select.options[select.selectedIndex]
    clearInputs(inputs)
    filterFormFields()
})

// вспомогательные функции

function clearValues(selector) {
    selector.forEach(item => item.value = '')
}

function clearInputs(selector) {
    selector.forEach(item => {
        item.style.border = ''
        item.placeholder = ''
    })
}

function hideTitle() {
    if (localStorageArr.length) {
        title.style.display = 'none'
    } else title.style.display = ''
}

function filterFormFields() {
    inputWrapper.forEach(item => {
        item.remove()
        if (!item.dataset.name || item.dataset.name.includes(selectedOption.dataset.name)) {
            form.insertBefore(item, createNewVisitBtn)
        }
    })
}

function addToLocalStorage(item) {
    localStorageArr.push(item)
    localStorage.setItem('item', JSON.stringify(localStorageArr))
}

function counter() {
    let index = 0
    return function () {
        index++
        return index
    }
}

// drag&drop
const count = counter()

function moveCard(card) {
    let pseudoActive = false
    let margin = 0

    card.onmousedown = function (e) {
        card.style.zIndex = count();
        card.style.left = getCoords(card).left - margin - getCoords(mainContent).left + 'px'
        card.style.top = getCoords(card).top - margin - getCoords(mainContent).top + 'px'
        card.style.position = 'absolute'
        if (!pseudoActive) {
            let pseudoDiv = document.createElement('div')
            pseudoDiv.style.width = card.offsetWidth + 'px'
            pseudoDiv.style.height = card.offsetHeight + 'px'
            pseudoDiv.className = ('visit-card')
            mainContent.insertBefore(pseudoDiv, card)
            pseudoActive = true
        }
        let cardCoords = getCoords(card);
        let shiftX = e.pageX - cardCoords.left;
        let shiftY = e.pageY - cardCoords.top;
        let mainContentCoords = getCoords(mainContent);

        document.onmousemove = function (e) {
            let newLeft = e.pageX - shiftX - mainContentCoords.left - margin;
            let newTop = e.pageY - shiftY - mainContentCoords.top - margin;

            if (newLeft < -margin) {
                newLeft = -margin;
            }
            let rightEdge = mainContent.offsetWidth - card.offsetWidth;
            if (newLeft > rightEdge - margin) {
                newLeft = rightEdge - margin;
            }
            if (newTop < -margin) {
                newTop = -margin;
            }
            let topEdge = mainContent.offsetHeight - card.offsetHeight;
            if (newTop > topEdge - margin) {
                newTop = topEdge - margin;
            }
            card.style.left = newLeft + 'px';
            card.style.top = newTop + 'px';
        }
        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        };

        return false;
    };

    card.ondragstart = function () {
        return false;
    };

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}