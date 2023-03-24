
let currentColor;
let selectedCategoryColor;
let selectedCategoryName;
let categorys = []
let pointColor = ['#8AA4FF', '#FB0101', '#43D300', '#FD8A01', '#E224BE', '#013DFF', '#33D7C1',];
let subtasks = [];
let prio = 0;
let selectedContacts = [];
let subtaskValue = [];


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
    document.getElementById('color-container').classList.add('d-none');
    document.getElementById('category-input-field').value = '';

}

// category Input
function addedCategory() {
    let categoryInput = document.getElementById('category-input-field').value;

    let category = {
        'name': categoryInput,
        'color': currentColor
    }

    categorys.push(category);
}


function renderCategory() {
    let categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = '';

    for (let i = 0; i < categorys.length; i++) {
        categoryContainer.innerHTML += /*html*/`
        <div class="category">
            <div class="category-name">
                <span onclick="addToInput(${i})">${categorys[i]['name']}</span>
                <div class="color-circle" style="background-color: ${'' + categorys[i]['color']}"></div>
            </div>
            <img onclick="deleteCategory(${i})"src="./img/black-x.svg" >
        </div>`
    }
}

function addToInput(i) {
    let selectedCategory = document.getElementById('selected-category');
    selectedCategoryColor = categorys[i]['color'];
    selectedCategoryName = categorys[i]['name'];
    selectedCategory.innerHTML = '';
    selectedCategory.innerHTML += /*html*/`
    <div class="category">
        <div class="category-name">
            <span id="selected-category-name">${selectedCategoryName}</span>
            <div class="color-circle" style="background-color: ${'' + selectedCategoryColor}"></div>
        </div>
    </div>`
}

function deleteCategory(i) {
    categoryColor.splice(i, 1);
    categoryName.splice(i, 1);
    renderCategory();

}

function renderCategoryColors() {
    let colorContainer = document.getElementById('color-container');
    colorContainer.innerHTML = '';

    for (let i = 0; i < pointColor.length; i++) {
        color = pointColor[i];
        colorContainer.innerHTML += /*html*/`
        <div onclick="addColor('${color}')" id="circle${i}" class="color-circle" style="background-color: ${'' + color}"></div>`
    }
}

function addColor(color) {
    document.getElementById('currentColor').innerHTML = '';
    document.getElementById('currentColor').innerHTML += /*html*/ `<div class="color-circle" style="background-color: ${'' + color}"></div>`
    currentColor = color;
}

// Contacts
function renderContacts() {
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactContainer.innerHTML += /*html*/ `
        <div class="contact">
            <span>${contact['name']} ${contact['surname']}</span>
            <input id="checkbox${i}" type="checkbox">
        </div>`
    }
}

function addContactsToArray() {
    selectedContacts = [];
    let checkbox = document.querySelectorAll("input[type = 'checkbox'");

    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {
            let contact = {
                'name': contacts[i]['name'],
                'surname': contacts[i]['surname'],
                'initials': contacts[i]['Initials'],
                'color': contacts[i]['profilecolor'],
                'contactId': contacts[i]['contactid']
            }

            selectedContacts.push(contact);

        }
    }

}


function renderInicialsCircles() {

}





// Prio Buttons
function addPrio(prioValue) {
    resetPrio();
    if (prioValue == prio) {
        prioValue = 0;
        prio = 0;
    }
    if (prioValue == 1) {
        selectUrgent();
    }
    if (prioValue == 2) {
        selectMedium();
    }
    if (prioValue == 3) {
        selectLow();
    }
}

function selectUrgent() {
    document.getElementById('urgent-btn').classList.add('urgent-aktiv');
    document.getElementById('urgent-image').style.filter = 'brightness(0) invert(1)';
    prio = 1;
}

function selectMedium() {
    document.getElementById('medium-btn').classList.add('medium-aktiv');
    document.getElementById('medium-image').style.filter = 'brightness(0) invert(1)';
    prio = 2;
}

function selectLow() {
    document.getElementById('low-btn').classList.add('low-aktiv');
    document.getElementById('low-image').style.filter = 'brightness(0) invert(1)';
    prio = 3;
}

function resetPrio() {
    document.getElementById('urgent-btn').classList.remove('urgent-aktiv');
    document.getElementById('urgent-image').style.filter = '';
    document.getElementById('medium-btn').classList.remove('medium-aktiv');
    document.getElementById('medium-image').style.filter = '';
    document.getElementById('low-btn').classList.remove('low-aktiv');
    document.getElementById('low-image').style.filter = '';
}

// subtasks
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
    subtaskValue.push(0);

}


function renderSubtasks() {
    closeSubtaskInput();
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


function resetForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('selected-category').innerHTML = 'Select task category';
    // reset Assigned to
    document.getElementById('due-date').value = '';
    addPrio(0);
    document.getElementById('subtasks-container').innerHTML = '';
}


function createTask() {
    addContactsToArray();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('due-date').value;



    let task = {
        'id': tasks.length,
        'title': title,
        'description': description,
        'category': selectedCategoryName,
        'category-color': selectedCategoryColor,
        'contacts': selectedContacts,
        'date': dueDate,
        'prio': prio,
        'subtasks': subtasks,
        'subtasks-value': subtaskValue,
        'status': 'toDo'

    }

    tasks.push(task);
    console.log(tasks);

}



