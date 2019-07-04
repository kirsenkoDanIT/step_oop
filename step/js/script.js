'use strict'



const fullName = document.querySelector('#name')

console.log(fullName.value);

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




openFormBtn.addEventListener('click', (e) => {
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
    form.style.display = 'none'
})

createNewVisitBtn.addEventListener('click', (event) => {
    event.preventDefault
})

select.addEventListener('change', () => {
    console.log(select.options[select.selectedIndex].dataset.name)

    inputs.forEach(item => {
        if (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name)) {
            item.style.display = 'block'
        } else item.style.display = 'none'
    })
})