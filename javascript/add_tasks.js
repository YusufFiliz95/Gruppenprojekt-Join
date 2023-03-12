
let category = [];
let subtask = [];
let prio = 0;

function addTask() {
    title = document.getElementById('title');
    description = document.getElementById('description');
    category = document.getElementById('category');
    contacts = document.getElementById('contacts');
    date = document.getElementById('date');
    prio = document.getElementById('prio');
    subtask = document.getElementById('subtask');

    tasks = {
        "title": title.value,
        "discription": description.value,
        "category": category.value,
        "category-color": contacts.value,
        "contacts": contacts.value,
        "date": date.value,
        "prio": prio.value,
        "subtasks": subtask.value,
        "status": "toDo"
    }
}

function toggleMenu(id) {
    document.getElementById(id).classList.toggle('d-none');

}

function openInput(id) {
    document.getElementById('toggle-menu').classList.add('d-none');
    document.getElementById('category-input').classList.remove('d-none');
    document.getElementById(id).classList.add('d-none');
    document.getElementById('color-container').classList.remove('d-none');
}

function renderCategorys() {


}

function renderContacts() {

}

function selectedPrio() {

}

function checkRequired() {

}