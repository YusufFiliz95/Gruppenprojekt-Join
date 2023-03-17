
let categoryColor;
let pointColor = ['#8AA4FF', '#FB0101', '#43D300', '#FD8A01', '#E224BE', '#013DFF', '#33D7C1',];
let subtasks = [];
let prio = 0;


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


function addPrio(prioValue) {
    resetPrio();

    if (prioValue == prio) {
        prioValue = 0;
        prio = 0;
    }
    if (prioValue == 1) {
        document.getElementById('urgent-btn').classList.add('urgent-aktiv');
        document.getElementById('urgent-image').style.filter = 'brightness(0) invert(1)';
        prio = 1;
    }
    if (prioValue == 2) {
        document.getElementById('medium-btn').classList.add('medium-aktiv');
        document.getElementById('medium-image').style.filter = 'brightness(0) invert(1)';
        prio = 2;
    }
    if (prioValue == 3) {
        document.getElementById('low-btn').classList.add('low-aktiv');
        document.getElementById('low-image').style.filter = 'brightness(0) invert(1)';
        prio = 3;
    }

}

function resetPrio() {
    document.getElementById('urgent-btn').classList.remove('urgent-aktiv');
    document.getElementById('urgent-image').style.filter = '';
    document.getElementById('medium-btn').classList.remove('medium-aktiv');
    document.getElementById('medium-image').style.filter = '';
    document.getElementById('low-btn').classList.remove('low-aktiv');
    document.getElementById('low-image').style.filter = '';
}


function openSubtaskInput() {
    document.getElementById('subtask-plus').classList.add('d-none');
    document.getElementById('subtask-buttons').classList.remove('d-none');
}

function closeSubtaskInput() {
    document.getElementById('subtask-input').value = '';
    document.getElementById('subtask-buttons').classList.add('d-none');
    document.getElementById('subtask-plus').classList.remove('d-none');

}

function addSubtasks() {
    subtaskName = document.getElementById('subtask-input').value;
    subtasks.push(subtaskName);

}

function renderSubtasks() {
    document.getElementById('subtask-input').value = '';
    subtasksContainer = document.getElementById('subtasks-container')
    subtasksContainer.innerHTML = '';

    for (let i = 0; i < subtasks.length; i++) {
        subtasksContainer.innerHTML += /*html*/`
        <div class="subtask">
            <span>${subtasks[i]}</span>
            <img  onclick="deleteSubtasks(${i})"src="./img/black-x.svg">
        </div>`
    }
}


function deleteSubtasks(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
}