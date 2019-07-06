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
let inputWrapper = document.querySelectorAll('.form__input-wrapper')
const mainContent = document.querySelector('.main-content')
const option = document.querySelectorAll('.form__option')
form.style.display = 'none'

// классы

class Visit {
    constructor() {
        this._fullName = fullName.value
        this._visitDate = visitDate.value
        this._doctor = select.options[select.selectedIndex].value

        this._card = document.createElement('article')
        this._card.className = 'visit-card'
        this._card.style.minHeight = '100%'
        this._card.style.position = 'relative'
        let cardContent = `
        <p>${this._fullName}</p>
        <p>${this._visitDate}</p>
        <p>${this._doctor}</p>`

        this._card.innerHTML = cardContent

        mainContent.appendChild(this._card)

    }

    removeVisit() {
        mainContent.removeChild(this._card)
    }
}

class TherapistVisit extends Visit {
    constructor() {
        super()
        this._visitReason = reason.value
        this._age = age.value
        this._card.style.backgroundColor = 'orange'
        this._card.innerHTML += `
        <p>${this._visitReason}</p>
        <p>${this._age}</p>
        `
    }
}

class CardiologistVisit extends Visit {
    constructor() {
        super()
        this._card.style.backgroundColor = 'blue'
    }
}

class DentistVisit extends Visit {
    constructor() {
        super()
        this._card.style.backgroundColor = 'pink'
    }
}

function addVisit() {
    switch (select.options[select.selectedIndex].dataset.name) {
        case 'cardiologist':
            new CardiologistVisit()
            form.style.display = 'none'
            break;
        case 'dentist':
            new DentistVisit()
            form.style.display = 'none'
            break;
        case 'therapist':
            new TherapistVisit()
            form.style.display = 'none'
            break;
    }
}

createNewVisitBtn.addEventListener('click', addVisit)

/* ---------------------------------------------------- */
// option.forEach(elem => {
//     elem.addEventListener('click', (e) => {
//         console.log(e.target);
//         console.log(inputWrapper = [...inputWrapper].filter(item => e.target.dataset.name === item.dataset.name))
//         return inputWrapper = [...inputWrapper].filter(item => e.target.dataset.name === item.dataset.name)
//     })
// })


openFormBtn.addEventListener('click', () => {
    form.style.display === 'none' ?
        form.style.display = '' :
        form.style.display = 'none'
    inputWrapper.forEach(item => {
        if (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name)) {
            item.style.display = 'block'
        } else
            item.style.display = 'none'
    })
})

closeFormBtn.addEventListener('click', (e) => {
    e.target.parentNode.style.display = 'none'
})



select.addEventListener('change', () => {
    // console.log(select.options[select.selectedIndex].dataset.name)

    // inputWrapper.forEach(item => {
    //     if (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name)) {
    //         item.style.display = 'block'
    //     } else item.style.display = 'none'
    // })
    // console.log(inputWrapper);
    // console.log(select.options[select.selectedIndex].dataset.name);
    // inputWrapper = [...inputWrapper].filter(item => {
    //     // console.log(item.dataset.name);
    //     return !item.dataset.name || item.dataset.name === select.options[select.selectedIndex].dataset.name})
    // console.log(inputWrapper);
    inputWrapper.forEach(item => item.remove())
    console.log(inputWrapper);
    inputWrapper.forEach(item => {
        if (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name)) {
            form.insertBefore(item, createNewVisitBtn)
        }
    })
})