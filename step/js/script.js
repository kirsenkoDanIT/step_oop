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
let mainContent = document.querySelector('.main-content')
const option = document.querySelectorAll('.form__option')
const inputs = document.querySelectorAll('.form__input')
const title = document.querySelector('.main-content__title')

// console.log(title);
console.log(JSON.parse(localStorage.getItem('item')));


let selectedOption
let localStorageArr
let newCard
if (localStorage.item) {
    localStorageArr = JSON.parse(localStorage.getItem('item'))
} else localStorageArr = []

if (localStorageArr.length) {
    title.style.display = 'none'
} else title.style.display = ''

// классы

class Visit {
    constructor(name, date, doctor, textarea) {
        textarea
        this._fullName = name
        this._visitDate = date
        this._doctor = doctor
        this._textarea = textarea
        this._text

        this._options = [this._fullName, this._visitDate, this._doctor]

        this._card = document.createElement('article')
        this._card.className = 'visit-card'

        this._close = document.createElement('button')
        this._close.className = 'close-btn'

        this._card.addEventListener('click', (e) => {
            const articles = document.querySelectorAll('article');
            articles.forEach((item, index) => {
                if (item === e.currentTarget && e.target === this._close) {
                    localStorageArr.splice(index, 1)
                    localStorage.setItem('item', JSON.stringify(localStorageArr))
                    this._card.remove()
                    if (localStorageArr.length) {
                        title.style.display = 'none'
                    } else title.style.display = ''
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

        this._card.appendChild(this._showMore)

        this._showMore.addEventListener('click', () => {
            console.log(this._card.childNodes)
            this._card.childNodes.forEach((item) => {
                if (item.classList.contains('article__field')) {
                    item.classList.toggle('hide')
                    this._showMore.innerText === 'Развернуть'? this._showMore.innerText = 'Свернуть': this._showMore.innerText = 'Развернуть'
                }
            })
        })

        if (this._textarea) {
            this._text = document.createElement('p')
            this._text.className = 'article__field hide'
            this._text.innerText = this._textarea
            this._card.insertBefore(this._text, this._showMore)
        }

        mainContent.appendChild(this._card)
    }

}

class TherapistVisit extends Visit {
    constructor(name, date, doctor, textarea, reason, age) {
        super(name, date, doctor, textarea)
        this._reason = reason
        this._age = age
        this._args = [this._reason, this._age]
        this._args.forEach(item => {
            const p = document.createElement('p')
            p.classList = 'article__field hide'
            p.innerHTML = item
            this._textarea ? this._card.insertBefore(p, this._text) : this._card.insertBefore(p, this._showMore)
        })

        this._card.style.backgroundColor = 'yellow'
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

        this._args.forEach(item => {
            const p = document.createElement('p')
            p.classList = 'article__field hide'
            p.innerText = item
            this._textarea ? this._card.insertBefore(p, this._text) : this._card.insertBefore(p, this._showMore)
        })

        this._card.style.backgroundColor = 'blue'
    }
}

class DentistVisit extends Visit {
    constructor(name, date, doctor, textarea, reason, lastVisitDate) {
        super(name, date, doctor, textarea)
        this._reason = reason
        this._lastVisitDate = lastVisitDate

        this._args = [this._reason, this._lastVisitDate]

        this._args.forEach(item => {
            const p = document.createElement('p')
            p.classList = 'article__field hide'
            p.innerHTML = item
            this._textarea ? this._card.insertBefore(p, this._text) : this._card.insertBefore(p, this._showMore)
        })

        this._card.style.backgroundColor = 'pink'
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
                localStorageArr.push(newCard)
                localStorage.setItem('item', JSON.stringify(localStorageArr))

                break;
            case 'dentist':
                newCard = new DentistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, lastVisitDate.value)
                form.classList.toggle('hide')
                localStorageArr.push(newCard)
                localStorage.setItem('item', JSON.stringify(localStorageArr))

                break;

            case 'therapist':
                newCard = new TherapistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, age.value)
                form.classList.toggle('hide')
                localStorageArr.push(newCard)
                localStorage.setItem('item', JSON.stringify(localStorageArr))
                break;
        }
    }
}

createNewVisitBtn.addEventListener('click', () => {
    addVisit()

})

// события

openFormBtn.addEventListener('click', () => {
    select.options.selectedIndex = 0
    clearValues(inputs)
    clearInputs(inputs)
    textarea.value = ''
    form.classList.toggle('hide')
    selectedOption = select.options[select.selectedIndex]
    inputWrapper.forEach(item => {
        item.remove()
        if (!item.dataset.name || item.dataset.name.includes(selectedOption.dataset.name)) {
            form.insertBefore(item, createNewVisitBtn)
        }
    })
})

closeFormBtn.addEventListener('click', () => {
    form.classList.toggle('hide')
})

select.addEventListener('change', () => {
    selectedOption = select.options[select.selectedIndex]

    clearInputs(inputs)

    inputWrapper.forEach(item => {
        item.remove()
        if (!item.dataset.name || item.dataset.name.includes(selectedOption.dataset.name)) {
            form.insertBefore(item, createNewVisitBtn)
        }
    })
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

// drag&drop