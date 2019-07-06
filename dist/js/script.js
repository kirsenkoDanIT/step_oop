'use strict'

const createBtn = document.querySelector('.button')
const closeBtn = document.querySelector('.close-button')
const form = document.querySelector('.doctor-list-wrapper')
form.style.display = 'none'

createBtn.addEventListener('click', (e) => {
    form.style.display === 'none' ?
        form.style.display = 'block' :
        form.style.display = 'none'
})