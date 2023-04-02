/* --------------------- all functions for edit Task------------------- */

function fillInputsByEditTask(i) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    let dueDate = tasks[i].date;
    let status = returnStatusInTextForm(tasks[i].status);
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('due-date').value = dueDate;
    setPrioButtonByEditTask(i);
    renderContacts();
    setCheckboxesByEditTask(i);
    addContactsToArray();
    renderInicialsCircles();
    document.getElementById('status').innerHTML = status;
}

function setPrioButtonByEditTask(i) {
    let prio = tasks[i].prio;
    if (prio == 1) addPrio(1); /* function from addTask.js */
    if (prio == 2) addPrio(2); /* function from addTask.js */
    if (prio == 3) addPrio(3); /* function from addTask.js */

}

function setCheckboxesByEditTask(i) {
    let contactArray = tasks[i].contacts;
    for (let y = 0; y < contactArray.length; y++) { /* checks if the id still exists */
        for (let z = 0; z < contacts.length; z++) {
            let indexOfContact = contacts[z].contactid.indexOf(contactArray[y]); /* if the id does not exist then -1 will be return */
            if (indexOfContact >= 0) {
                let indexOfContact = z;
                document.getElementById('checkbox' + indexOfContact).checked = true;
            }
        }
    }
}

function returnStatusInTextForm(status) {
    if (status == 'toDo') return 'To do';
    if (status == 'toProgress') return 'In progress';
    if (status == 'awaitingFeedback') return 'Awaiting Feedback';
    if (status == 'done') return 'Done';
}

function changeStatusByEditTask(status) {
    status = returnStatusInTextForm(status);
    document.getElementById('status').innerHTML = status;
    toggleMenuCategory('toggle-3'); /* funktion from addTask.js - it close the drop down menu */
}

async function saveEditTask(i) {
    resetRequiredOnEditTask();
    if (checkRequiredOnEditTask() == true) {
        /* here comes the popup from bottom */
        await saveTask(i);
        await saveTaskstoBackend();
        showConfirmationPopup("edittask");
        slideOutTaskOverviewDialogBoard();
    }
}


async function saveTask(i) {
    let newTitle = document.getElementById('title').value;
    let newDescription = document.getElementById('description').value;
    let newPrio = prio;
    let newDueDate = document.getElementById('due-date').value;
    let newStatus = setNewStatus();
    let newContacts = setNewContacts();
    tasks[i].title = newTitle;
    tasks[i].description = newDescription;
    tasks[i].title = newTitle;
    tasks[i].prio = newPrio;
    tasks[i].date = newDueDate;
    tasks[i].status = newStatus;
    tasks[i].contacts = newContacts;
}


function setNewStatus() {
    let newStatus = document.getElementById('status').innerHTML;
    if (newStatus == 'To do') return 'toDo';
    if (newStatus == 'In progress') return 'toProgress';
    if (newStatus == 'Awaiting Feedback') return 'awaitingFeedback';
    if (newStatus == 'Done') return 'done';
}

function setNewContacts() {
    let contactsArray = [];
    for (let i = 0; i < contacts.length; i++) {
        checkbox = document.getElementById('checkbox' + i);
        contactId = contacts[i].contactid;
        if (checkbox.checked) contactsArray.push(contactId);
    }
    return contactsArray;
}

async function deleteTask(i) {
    tasks.splice(i, 1);
    await saveTaskstoBackend();
    showConfirmationPopup("deletetask");
    slideOutDeleteTaskPopup();
    slideOutTaskOverviewDialogBoard();
}

// Validation
function checkRequiredOnEditTask() {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    let dueDate = document.getElementById('due-date').value;
    let allData = [title, desc, selectedContacts, dueDate,]
    let validation = true;
    for (let i = 0; i < allData.length; i++) {
        input = allData[i];
        if (input == '') {
            document.getElementById(`required${i}`).innerText += "This field is required";
            validation = false;
        }
    }
    checkprioRequiredOnEditTask(validation);
    return validation;
}

function checkprioRequiredOnEditTask(validation) {
    if (prio == 0) {
        document.getElementById(`required4`).innerText += "A priority button is required";
        return validation = false;
    }
}

function resetRequiredOnEditTask() {
    for (let i = 0; i <= 4; i++) {
        document.getElementById(`required${i}`).innerText = "";
    }
}

async function createTaskOnBoard() {
    resetRequired();
    if (checkRequired() == true) {
        await createTaskIntoJson();
        await saveTaskstoBackend();
        await saveCategorystoBackend();
        slideOutAddTaskDialogBord()
        showConfirmationPopup('createtask');

    }
}

