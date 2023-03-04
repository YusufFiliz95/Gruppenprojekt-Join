let category = [];
let subtask = [];


async function init() {
    let response = await fetch('./json/tasks.json');
    tasks = await response.json();
    console.log(tasks);
}


function addTask() {
    title = document.getElementById('title');
    description = document.getElementById('description');
    category = document.getElementById('category');
    contacts = document.getElementById('contacts');
    date = document.getElementById('date');
    prio = document.getElementById('prio');
    subtask = document.getElementById('subtask');

    task = {
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