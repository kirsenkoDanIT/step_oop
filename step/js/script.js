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

const lStorage = []

if (localStorage.mainContent) {

    console.log((JSON.parse(localStorage.mainContent)));
    // console.log(localStorage.mainContent);
    JSON.parse(localStorage.mainContent).forEach(item =>{
        
    })

    // let cards = document.querySelectorAll('article')
    // cards.forEach((el) => {
    //     let sm = document.querySelector('.show-more')
    //     let inp = document.querySelectorAll('p')
    //     console.log('sm', sm)
    //     sm.addEventListener('click', () => {
    //         // sm.style.display = 'none'
    //         inp.forEach((el) => {
    //             el.style.display = ''
    //         })
    //     })
    // })
}
class Visit {
    constructor(fullName, visitReason) {
        const removeVisit = () => {

            let close = document.createElement('p')
            close.className = 'close'
            close.innerText = 'close'
            this._card.appendChild(close)
            close.style.cursor = 'pointer'

            close.addEventListener('click', () => {
                mainContent.removeChild(this._card)
            })
        }

        this._fullName = fullName
        // this._visitDate = new Date(visitDate)
        // this._visitDate = visitDate
        this._visitReason = visitReason

        this._card = document.createElement('article')
        this._card.className = 'visit-card'
        let cardContent = `

        <p>${this._fullName}</p>
        <p>${select.options[select.selectedIndex].value}</p>`

        this._card.innerHTML = cardContent

        // this.createShowMore(inputs)
        removeVisit()

        mainContent.appendChild(this._card)
    }

    createShowMore(inputs) {
        let showMore = document.createElement('p')
        showMore.className = 'show-more'
        showMore.innerText = 'Показати більше'
        this._card.appendChild(showMore)
        showMore.style.cursor = 'pointer'

        showMore.addEventListener('click', () => {
            showMore.style.display = 'none'
            inputs.forEach((el) => {
                el.style.display = ''
            })
        })
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
    constructor(fullName, inputDate, lastVisit, visitReason, textArea) {
        super(fullName, visitReason)
        this._card.style.backgroundColor = 'yellow'

        let inputs = [
            this._inputDate = document.createElement('p'),
            this._lastVisit = document.createElement('p'),
            this._visitReason = document.createElement('p'),
            this._textArea = document.createElement('p')
        ]

        this._inputDate.innerText = inputDate
        this._lastVisit.innerText = lastVisit
        this._visitReason.innerText = visitReason
        this._textArea.innerText = textArea

        inputs.forEach((el) => {
            this._card.appendChild(el)
            el.style.display = 'none'
        })

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
// createNewVisitBtn.addEventListener('click', (e) => {

//     // let inputName = document.querySelector('#name').value
//     // let inputDate = document.querySelector('#date').value
//     // let lastVisit = document.querySelector('#last-visit').value
//     // let visitReason = document.querySelector('#reason').value
//     // let textArea = document.querySelector('#text-area').value
//     // let doctorsName = select.options[select.selectedIndex].value
//     // console.log('doctorsName', doctorsName)
//     // let inputReason = document.querySelector('#reason').value

//     const options = []

//     let visit = new DentistVisit(inputName, inputDate, lastVisit, visitReason, textArea)
//     console.log(visit);

//     lStorage.push(visit)
//     form.style.display = 'none'
//     console.log(lStorage);
//     localStorage.setItem('mainContent', JSON.stringify(lStorage))
//     // input.forEach(item => {
//     //     if (!item.value) {
//     //         item.style.border = '2px solid red'
//     //     }
//     // })

//     // if ([...input].some(item => !item.value)) {
//     //     console.log(item);
//     // }


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
    // inputWrapper = [...inputWrapper].filter(item => {
    //     return (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name))
    // })

    console.log(inputWrapper);
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

    // inputWrapper = [...inputWrapper].filter(item => {
    //     return (!item.dataset.name || item.dataset.name.includes(select.options[select.selectedIndex].dataset.name))
    // })
    // console.log(inputWrapper);
})