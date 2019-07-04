'use strict'



// const fullName = document.querySelector('#name')

// console.log(fullName.value);

const openFormBtn = document.querySelector('.page-header .btn')
const closeBtn = document.querySelector('.form .close-btn')
const form = document.querySelector('.form')
const createNewVisitBtn = document.querySelector('.form .btn')
const select = document.querySelector('#doctor-select')
const inputs = document.querySelectorAll('.form p')
form.style.display = 'none'

class Visit {
    constructor(fullName, visitDate, visitReason) {
        this._fullName = fullName
        this._visitDate = new Date(visitDate)
        this._visitReason = visitReason
    }

    removeVisit() {

    }
}

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

createNewVisitBtn.addEventListener('click', addVisit)


openFormBtn.addEventListener('click', () => {
    form.style.display === 'none' ?
        form.style.display = '' :
        form.style.display = 'none'
    inputs.forEach(item => {
        if (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name)) {
            item.style.display = 'block'
        } else
            item.style.display = 'none'
    })
})

closeBtn.addEventListener('click', (e) => {
    e.target.parentNode.style.display = 'none'
})



select.addEventListener('change', () => {
    console.log(select.options[select.selectedIndex].dataset.name)

    inputs.forEach(item => {
        if (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name)) {
            item.style.display = 'block'
        } else item.style.display = 'none'
    })
})