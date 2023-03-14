
let categoryColor;
let pointColor = ['#8AA4FF', '#FB0101', '#43D300', '#FD8A01', '#E224BE', '#013DFF', '#33D7C1',];
let subtask = [];
let prio = 0;

function addTask() {

}


// toggle Menu 

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('d-none');
}


function openInputfield(id) {
    document.getElementById('toggle-menu').classList.add('d-none');
    document.getElementById('category-input').classList.remove('d-none');
    document.getElementById(id).classList.add('d-none');
    document.getElementById('color-container').classList.remove('d-none');
}

function closeInputfield(id) {
    document.getElementById('category-input').classList.add('d-none');
    document.getElementById(id).classList.remove('d-none');

}

function renderCategory() {
    let categoryInput = document.getElementById('category-input-field').value;
    let categoryContainer = document.getElementById('category-container');

    categoryContainer.innerHTML += /*html*/`
        <div class="category">
        <span>${categoryInput}</span>
        <div class="color-circle " style="background-color: ${'' + categoryColor}"></div>
        </div>`


}

function renderCategoryColors() {
    let colorContainer = document.getElementById('color-container');
    colorContainer.innerHTML = '';

    for (let i = 0; i < pointColor.length; i++) {
        color = pointColor[i]
        colorContainer.innerHTML += /*html*/`
        <div onclick="addColor('${color}')" id="circle${i}" class="color-circle" style="background-color: ${'' + color}"></div>`
    }
}

function addColor(color) {
    document.getElementById('currentColor').innerHTML = '';
    document.getElementById('currentColor').innerHTML += /*html*/ `<div class="color-circle" style="background-color: ${'' + color}"></div>`
    categoryColor = color;
}


function renderContacts() {
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactContainer.innerHTML += /*html*/ `
        <div class="contact">
            <span>${contact['name']} ${contact['surname']}</span>
            <input type="checkbox">
        </div>`
    }
}


