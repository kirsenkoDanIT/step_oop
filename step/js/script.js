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

// createNewVisitBtn.addEventListener('click', addVisit)
// createNewVisitBtn.addEventListener('click', (e) => {
//     input.forEach(item => {
//         if (!item.value) {
//             item.style.border = '2px solid red'
//         }
//     })

//     if ([...input].some(item => !item.value)) {
//         console.log(item);
//     }
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
    //   return  inputWrapper = [...inputWrapper].filter(item => {
    //         return (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name))
    //     })

    // console.log(inputWrapper);
})

closeBtn.addEventListener('click', (e) => {
    e.target.parentNode.style.display = 'none'
})



select.addEventListener('change', () => {
    console.log(select.options[select.selectedIndex].dataset.name)

    inputWrapper.forEach(item => {
        if (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name)) {
            item.style.display = 'block'
        } else item.style.display = 'none'
    })

    //    return inputWrapper = [...inputWrapper].filter(item => {
    //         return (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name))
    //     })

    // console.log(inputWrapper);
})