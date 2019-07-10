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

// console.log(title);
// console.log(mainContent.length);

let selectedOption

let localSt = {}

let numberCard = 1
let zIndexCount = 1
let localObject

// классы

class Visit {
    constructor(name, date, doctor, textarea) {

        this._fullName = name
        this._visitDate = date
        this._doctor = doctor
        this._textarea = textarea

        this._options = [this._fullName, this._visitDate, this._doctor]

        this._card = document.createElement('article')
        this._card.className = 'visit-card'
        // this._card.style.minHeight = '100px'
        this._card.style.position = 'relative'

        this._close = document.createElement('button')
        this._close.innerText = 'x'
        this._close.style.position = 'absolute'
        this._close.style.top = '5px'
        this._close.style.right = '5px'


        this.removeVisit()

        this._card.appendChild(this._close)

        this._options.forEach(item => {
            const p = document.createElement('p')
            p.className = 'article__field'
            p.innerHTML = item
            this._card.appendChild(p)
        })

        this._showMore = document.createElement('button')
        this._showMore.innerText = 'show more'

        this._card.appendChild(this._showMore)
        this._showMoreActive = false

        // if (this._textarea) {
        // const p = document.createElement('p')
        // p.className = 'article__text'
        // p.innerText = this._textarea
        // this._card.insertBefore(p, this._showMore)
        // }

        // console.log(this._textarea)

        mainContent.appendChild(this._card)

    }

    removeVisit() {
        this._close.addEventListener('click', () => {
            let pseudoDiv = document.createElement('div')
            pseudoDiv.style.width = this._card.offsetWidth + 'px'
            pseudoDiv.style.height = this._card.offsetHeight + 'px'
            // pseudoDiv.style.backgroundColor= 'red'
            pseudoDiv.className = ('visit-card')
            mainContent.insertBefore(pseudoDiv, this._card)
            
            this._card.remove()

            // mainContent.childElementCount


            for (let key in localSt) {
                if (this._card.querySelectorAll('p')[0].innerText == localSt[key]._fullName && this._card.querySelectorAll('p')[1].innerText == localSt[key]._visitDate) {
                    delete localSt[key]
                    localStorage.setItem('cards', JSON.stringify(localSt))
                }
            }
            if (Object.keys(localSt).length == 0) {
                title.style.display = ''
            }
        })
    }

    moveCard() {
        let card = this._card
        let shiftX = 0
        let shiftY = 0
        let newX
        let newY


        card.onmousedown = function (e) {

            newX = e.pageX
            newY = e.pageY
            let newShiftX
            let newShiftY

            moveAt(e);

            card.style.zIndex = zIndexCount;
            zIndexCount++
            function moveAt(e) {
                card.style.transform = `translateX(${shiftX - (newX - e.pageX)}px) translateY(${shiftY - (newY - e.pageY)}px)`
            }
            console.log('card.offsetHeight', card.offsetHeight)


            document.onmousemove = function (e) {
                moveAt(e);
                newShiftX = shiftX - (newX - e.pageX)
                newShiftY = shiftY - (newY - e.pageY)
            }
            card.onmouseup = function () {
                document.onmousemove = null;
                card.onmouseup = null;
                shiftX = newShiftX

                shiftY = newShiftY
            }
            card.ondragstart = function () {
                return false;
            };
        }
    }
}

class TherapistVisit extends Visit {
    constructor(name, date, doctor, textarea, ...args) {
        super(name, date, doctor, textarea)
        this._args = args

        this._args.forEach(item => {
            const p = document.createElement('p')
            p.className = 'article__field'
            p.innerHTML = item
            this._card.insertBefore(p, this._showMore)
        })

        this._card.style.backgroundColor = 'yellow'

        this.moveCard()

    }
}

class CardiologistVisit extends Visit {
    constructor(name, date, doctor, textarea, ...args) {
        super(name, date, doctor, textarea)
        this._args = args

        this._args.forEach(item => {
            const p = document.createElement('p')
            p.className = 'article__field'
            p.innerText = item
            this._card.insertBefore(p, this._showMore)
        })

        this._card.style.backgroundColor = '#aff'

        this.moveCard()
    }
}

class DentistVisit extends Visit {
    constructor(name, date, doctor, textarea, ...args) {
        super(name, date, doctor, textarea)
        this._args = args

        this._args.forEach(item => {
            const p = document.createElement('p')
            p.className = 'article__field'
            p.innerHTML = item
            this._card.insertBefore(p, this._showMore)
        })

        this._card.style.backgroundColor = 'pink'

        this.moveCard()
    }
}

function addLocalStorage() {
    console.log('localSt', localSt)
    localSt[numberCard] = localObject
    localStorage.setItem('cards', JSON.stringify(localSt))
    localStorage.setItem('numberCard', numberCard)
    numberCard++
}

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
                localObject = new CardiologistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, age.value, pressure.value, diseases.value)
                form.classList.toggle('form--hidden')

                addLocalStorage()
                // localObject.moveCard()

                break;
            case 'dentist':
                localObject = new DentistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, lastVisitDate.value)
                form.classList.toggle('form--hidden')

                addLocalStorage()
                // localObject.moveCard()

                break;

            case 'therapist':
                localObject = new TherapistVisit(fullName.value, visitDate.value, selectedOption.value, textarea.value, reason.value, age.value)
                form.classList.toggle('form--hidden')

                addLocalStorage()
                // localObject.moveCard()

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
    form.classList.toggle('form--hidden')
    selectedOption = select.options[select.selectedIndex]
    inputWrapper.forEach(item => {
        item.remove()
        if (!item.dataset.name || item.dataset.name.includes(selectedOption.dataset.name)) {
            form.insertBefore(item, createNewVisitBtn)
        }
    })
})

closeFormBtn.addEventListener('click', (e) => {
    e.target.parentNode.classList.toggle('form--hidden')
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


if (localStorage.cards) {
    numberCard = +localStorage.getItem('numberCard')
    numberCard++
    localSt = JSON.parse(localStorage.getItem('cards'))
    if (Object.keys(localSt).length !== 0) {
        title.style.display = 'none'
    }

    for (let key in localSt) {
        console.log('key', key)
        switch (localSt[key]._doctor) {

            case 'Кардиолог':
                new CardiologistVisit(localSt[key]._fullName, localSt[key]._visitDate, localSt[key]._doctor, localSt[key]._textarea, localSt[key]._args[0], localSt[key]._args[1], localSt[key]._args[2], localSt[key]._args[3])
                break;

            case 'Стоматолог':
                new DentistVisit(localSt[key]._fullName, localSt[key]._visitDate, localSt[key]._doctor, localSt[key]._textarea, localSt[key]._args[0], localSt[key]._args[1])
                break;

            case 'Терапевт':
                new TherapistVisit(localSt[key]._fullName, localSt[key]._visitDate, localSt[key]._doctor, localSt[key]._textarea, localSt[key]._args[0], localSt[key]._args[1])
                break;
        }
    }
}


// drag&drop

