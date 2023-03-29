
let currentColor;
let selectedCategoryColor;
let selectedCategoryName = '';
let pointColor = ['#8AA4FF', '#FB0101', '#43D300', '#FD8A01', '#E224BE', '#013DFF', '#33D7C1',];
let subtasks = [];
let prio = 0;
let selectedContacts = [];
let subtaskValue = [];


async function loadAndRenderContacts() {
    await loadContactsfromBackend();
    await loadTasksfromBackend();
    await loadCategorysfromBackend();
    renderContacts();
    renderCategory();
}

// toggle Menu 

function toggleMenuCategory(id) {
    document.getElementById(id).classList.toggle('d-none');
}

function toggleMenuContacts(id) {
    document.getElementById(id).classList.toggle('d-none');
    renderInicialsCircles();
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
            <div onclick="addToInput(${i}), toggleMenuCategory('toggle-1')" class="category-name">
                <span >${categorys[i]['name']}</span>
                <div class="color-circle" style="background-color: ${'' + categorys[i]['color']}"></div>
            </div>
            <img onclick="deleteCategory(${i})"src="./img/black-x.svg" >
        </div>`
    }
}

function addNewCategorytoInput() {
    let categoryInput = document.getElementById('category-input-field').value;
    let selectedCategory = document.getElementById('selected-category');
    selectedCategory.innerHTML = '';

    selectedCategory.innerHTML += /*html*/`
    <div class="category">
        <div class="category-name">
            <span id="selected-category-name">${categoryInput}</span>
            <div class="color-circle" style="background-color: ${'' + currentColor}"></div>
        </div>
    </div>`
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
    categorys.splice(i, 1);
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
            <input onclick="addContactsToArray()" id="checkbox${i}" type="checkbox">
        </div>`
    }
}

function addContactsToArray() {
    selectedContacts = [];
    let checkbox = document.querySelectorAll("input[type = 'checkbox'");

    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {

            selectedContacts.push(contacts[i]['contactid']);
        }
    }
}

function resetCheckbox() {
    selectedContacts = [];
    let checkbox = document.querySelectorAll("input[type = 'checkbox'");

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
    }
}


function renderInicialsCircles() {
    let colorContainer = document.getElementById('inicial-circles');
    colorContainer.innerHTML = '';
    for (let y = 0; y < selectedContacts.length; y++) { /* checks if the id still exists */
        for (let z = 0; z < contacts.length; z++) {
            let indexOfContact = contacts[z].contactid.indexOf(selectedContacts[y]); /* if the id does not exist then -1 will be return */
            if (indexOfContact >= 0) {
                colorContainer.innerHTML += /*html*/`
                <div class="color-circle-contact" style="background-color: ${'' + contacts[z].profilecolor}">${contacts[z].Initials}</div>`
            }
        }
    }
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
    resetRequired();
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('selected-category').innerHTML = 'Select task category';
    document.getElementById('inicial-circles').innerHTML = '';
    resetCheckbox();
    document.getElementById('due-date').value = '';
    addPrio(0);
    document.getElementById('subtasks-container').innerHTML = '';
}


async function createTask() {
    resetRequired();
    if (checkRequired() == true) {
        await createTaskIntoJson();
        await saveTaskstoBackend();
        await saveCategorystoBackend();
        showConfirmationPopup('createtask');
        goToBoard();
    }
}


async function createTaskIntoJson() {
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


function goToBoard() {
    setTimeout(function () {
        window.location.href = "board.html";
    }, 2000)
}


// Validation
function checkRequired() {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    let dueDate = document.getElementById('due-date').value;
    let allData = [title, desc, selectedCategoryName, selectedContacts, dueDate,]
    let validation = true;
    for (let i = 0; i < allData.length; i++) {
        input = allData[i];
        if (input == '') {
            document.getElementById(`required${i}`).innerText += "This field is required";
            validation = false;
        }
    }
    checkprioRequired(validation);
    return validation;
}

function checkprioRequired(validation) {
    if (prio == 0) {
        document.getElementById(`required5`).innerText += "A priority button is required";
        return validation = false;
    }
}


function resetRequired() {
    for (let i = 0; i < 6; i++) {
        document.getElementById(`required${i}`).innerText = "";

    }
}

