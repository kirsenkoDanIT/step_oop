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

// классы

class Visit {
    constructor(name, date, doctor, textarea) {
        textarea
        this._fullName = name
        this._visitDate = date
        this._doctor = doctor
        this._textarea = textarea

        this._options = [this._fullName, this._visitDate, this._doctor]

        this._card = document.createElement('article')
        this._card.className = 'visit-card'
        this._card.style.minHeight = '100%'
        this._card.style.position = 'relative'

        this._close = document.createElement('button')
        this._close.innerText = 'x'
        this._close.style.position = 'absolute'
        this._close.style.top = '5px'
        this._close.style.right = '5px'

        this._card.addEventListener('click', (e) => {
            const articles = document.querySelectorAll('article');
            articles.forEach((item, index) => {
                if (item === e.currentTarget && e.target === this._close) {
                    localStorageArr.splice(index, 1)
                    localStorage.setItem('item', JSON.stringify(localStorageArr))
                    this._card.remove()

                }
            })

        })


        this._card.appendChild(this._close)

        // this._options.forEach(item => {
        //     const p = document.createElement('p')
        //     p.className = 'article__field'
        //     p.innerHTML = item
        //     this._card.appendChild(p)
        // })

        this._options.forEach(item => {
            const p = document.createElement('p')
            p.className = 'article__field-main'

            p.innerHTML = item
            this._card.appendChild(p)
        })

        this._showMore = document.createElement('button')
        this._showMore.innerText = 'show more'

        this._card.appendChild(this._showMore)

        this._showMore.addEventListener('click', () => {

        })

        // if (this._textarea) {
        // const p = document.createElement('p')
        // p.className = 'article__text'
        // p.innerText = this._textarea
        // this._card.insertBefore(p, this._showMore)
        // }

        // console.log(this._textarea)

        mainContent.appendChild(this._card)

    }

    // removeVisit() {
    //     this._close.addEventListener('click', () => {
    //         this._card.remove()
    //     })
    // }
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
            this._card.insertBefore(p, this._showMore)
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
            this._card.insertBefore(p, this._showMore)
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
            this._card.insertBefore(p, this._showMore)
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
    } else

        switch (selectedOption.dataset.name) {

            case 'cardiologist':
                newCard = new CardiologistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, age.value, pressure.value, diseases.value, /*textarea.value*/ )
                form.classList.toggle('form--hidden')
                localStorageArr.push(newCard)
                localStorage.setItem('item', JSON.stringify(localStorageArr))

                break;
            case 'dentist':
                newCard = new DentistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, lastVisitDate.value, textarea.value)
                form.classList.toggle('form--hidden')

                localStorageArr.push(newCard)
                localStorage.setItem('item', JSON.stringify(localStorageArr))

                // addLocalStorage()

                break;

            case 'therapist':
                newCard = new TherapistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, age.value)
                form.classList.toggle('form--hidden')
                console.log(mainContent);
                localStorageArr.push(newCard)
                localStorage.setItem('item', JSON.stringify(localStorageArr))
                break;
        }
}

createNewVisitBtn.addEventListener('click', () => {
    addVisit()
    // addLocalStorage(mainContent)
})

// события

openFormBtn.addEventListener('click', () => {
    select.options.selectedIndex = 0
    clearValues(inputs)
    clearInputs(inputs)
    textarea.value = ''
    form.classList.toggle('form--hidden')
    selectedOption = select.options[select.selectedIndex]
    inputWrapper.forEach(item => {
        item.remove()
        if (!item.dataset.name || item.dataset.name.includes(selectedOption.dataset.name)) {
            form.insertBefore(item, createNewVisitBtn)
        }
    })
})

closeFormBtn.addEventListener('click', () => {
    form.classList.toggle('form--hidden')
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

// mainContent.addEventListener("change", ()=>{
//     console.log(mainContent);
// });


function addLocalStorage() {

    localStorage.setItem('item', mainContent.innerHTML)
    console.log(typeof mainContent)
}

function getLocalStorage() {
    // localStorage.getItem('item', mainContent.innerHTML)
}


// drag&drop