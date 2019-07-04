'use strict'



// const fullName = document.querySelector('#name')

// console.log(fullName.value);

const openFormBtn = document.querySelector('.page-header .btn')
const closeBtn = document.querySelector('.form .close-btn')
const form = document.querySelector('.form')
const createNewVisitBtn = document.querySelector('.form .btn')
const select = document.querySelector('#doctor-select')
let inputWrapper = document.querySelectorAll('.form p')
const input = document.querySelectorAll('.form input')
form.style.display = 'none'
const mainContent = document.querySelector('.main-content')

class Visit {
    constructor(fullName, visitDate, visitReason) {
        this._fullName = fullName
        // this._visitDate = new Date(visitDate)
        this._visitDate = visitDate
        this._visitReason = visitReason

        this._card = document.createElement('article')
        this._card.className = 'visit-card'
        let cardContent = `
        <p>${this._fullName}</p>
        <p>${this._visitDate}</p>
        <p>${this._visitReason}</p>`

        this._card.innerHTML = cardContent

        mainContent.appendChild(this._card)
    }

    removeVisit() {

    }
}

const visit = new Visit('name', '21-02-19', 'reason')
const visit2 = new Visit('name2', '21-02-19', 'reason')
const visit3 = new Visit('name3', '21-02-19', 'reason')
const visit4 = new Visit('name4', '21-02-19', 'reason')


class TherapistVisit extends Visit {
    constructor() {

    }
}

class CardiologistVisit extends Visit {
    constructor() {

    }
}

class DentistVisit extends Visit {
    constructor() {

    }
}

function addVisit() {
    switch (select.options[select.selectedIndex].dataset.name) {
        case 'cardiologist':
            // new CardiologistVisit(name.value, date.value, reason.value)
            form.style.display = 'none'
            break;
        case 'dentist':
            // new DentistVisit(name.value, date.value, reason.value)
            form.style.display = 'none'
            break;
        case 'therapist':
            // new TherapistVisit(name.value, date.value, reason.value)
            form.style.display = 'none'
            break;
    }
}

// createNewVisitBtn.addEventListener('click', addVisit)
createNewVisitBtn.addEventListener('click', (e) => {

    let inputName = document.querySelector('#name').value
    let inputDate = document.querySelector('#date').value
    let inputReason = document.querySelector('#reason').value

    new Visit(inputName, inputDate, inputReason)

    form.style.display = 'none'
    // input.forEach(item => {
    //     if (!item.value) {
    //         item.style.border = '2px solid red'
    //     }
    // })

    // if ([...input].some(item => !item.value)) {
    //     console.log(item);
    // }


})



openFormBtn.addEventListener('click', () => {
    form.style.display === 'none' ?
        form.style.display = '' :
        form.style.display = 'none'
    // inputWrapper.forEach(item => {
    //     if (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name)) {
    //         item.style.display = 'block'
    //     } else
    //         item.style.display = 'none'
    // })
    inputWrapper = [...inputWrapper].filter(item => {
        return (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name))
    })

    console.log(inputWrapper);
})

closeBtn.addEventListener('click', (e) => {
    e.target.parentNode.style.display = 'none'
})



select.addEventListener('change', () => {
    console.log(select.options[select.selectedIndex].dataset.name)

    // inputWrapper.forEach(item => {
    //     if (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name)) {
    //         item.style.display = 'block'
    //     } else item.style.display = 'none'
    // })

    inputWrapper = [...inputWrapper].filter(item => {
        return (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name))
    })
    console.log(inputWrapper);
})