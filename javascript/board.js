
/* All templates for the renderingron the board are in the templates/template.js */

let currentDraggedElement;
let cardAmounts = [];

/*  -------------------open Dialog Windows with slideIn slide Out Functions--------------------------  */

function openAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
    renderAddTaskDialog();
}

function closeAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
    addTaskWindow = document.getElementById('add-task-bordId');
    addTaskWindow.classList.add('slide-in-right-add-task');
    addTaskWindow.classList.remove('slide-out-right-add-task');
    if (selectedMenu == 2) renderCardsIntoTheBoards();
    deleteAddTaskDialog();
    clearInputSearchingByResize();
}

function slideOutAddTaskDialogBord() {
    let window = document.getElementById('add-task-bordId');
    window.classList.remove('slide-in-right-add-task');
    window.classList.add('slide-out-right-add-task');
    setTimeout(closeAddTaskDialogBord, 350);
}

function openTaskOverviewDialogBord(i) {
    document.getElementById('overlay-bord-taskoverviewId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
    renderTaskInToOverview(i);
}

function closeTaskOverviewDialogBoard() {
    document.getElementById('overlay-bord-taskoverviewId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
    let window = document.getElementById('taskoverview-bordId');
    window.classList.add('slide-in-right-task-overview');
    window.classList.remove('slide-out-right-task-overview');
    deleteTaskOverview();
    renderCardsIntoTheBoards();
    clearInputSearchingByResize();
}

function slideOutTaskOverviewDialogBoard() {
    let window = document.getElementById('taskoverview-bordId');
    window.classList.remove('slide-in-right-task-overview');
    window.classList.add('slide-out-right-task-overview');
    setTimeout(closeTaskOverviewDialogBoard, 100);
    prio = 0; /* var from AddTask.js */
}

function renderAddTaskDialog() {
    document.getElementById('add-task-contentId').innerHTML = templateAddTaskDialog();
    renderContacts();
}

function renderEditTaskDialog(i) {
    deleteTaskOverview();
    document.getElementById('task-overviewId').innerHTML = templateEditTask(i);
    fillInputsByEditTask(i)
}

function deleteAddTaskDialog() {
    document.getElementById('add-task-contentId').innerHTML = "";
}

function deleteTaskOverview() {
    document.getElementById('task-overviewId').innerHTML = "";
}

function openDeleteTaskPopup(i) {
    document.getElementById('overlay-delete-taskId').classList.remove('d-none');
    document.getElementById('delete-task-pupupId').innerHTML = templateDeleteTaskPopup(i);
}

function closeDeleteTaskPopup() {
    document.getElementById('overlay-delete-taskId').classList.add('d-none');
    let window = document.getElementById('delete-task-pupupId');
    window.classList.add('slide-in-right-task-overview');
    window.classList.remove('slide-out-right-task-overview');
}

function slideOutDeleteTaskPopup() {
    let window = document.getElementById('delete-task-pupupId');
    window.classList.remove('slide-in-right-task-overview');
    window.classList.add('slide-out-right-task-overview');
    setTimeout(closeDeleteTaskPopup, 100);
}

/* --------END--------open Dialog Windows with slideIn slide Out Functions-------------------------- */

async function loadAllDataForTheBord() {
    await loadTasksfromBackend();
    renderCardsIntoTheBoards();
}

/* -------------------all rendering function to show the Board------------------------------ */
async function renderCardsIntoTheBoards() {
    deleteBoard();
    for (let i = 0; i < tasks.length; i++) {
        cardAmounts.push(i);  /* using for drag and drop function by searching */
        let id = tasks[i].id;
        let category = tasks[i].category;
        let categoryColor = tasks[i]["category-color"];
        let title = tasks[i].title;
        let description = tasks[i].description;
        let prioImage = setPrioImage(i);
        let status = tasks[i].status;
        let contacts = tasks[i].contacts;
        document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, description, prioImage, status);
        checkNeedBar(i);
        renderContactsIntotheCard(i, contacts);
    }
    checkWindowInnerScreenForDragAndDrog();
}

function deleteBoard() {
    cardAmounts = [];
    document.getElementById('toDoId').innerHTML = '';
    document.getElementById('toProgressId').innerHTML = '';
    document.getElementById('awaitingFeedbackId').innerHTML = '';
    document.getElementById('doneId').innerHTML = '';
}

function checkSubtasksOnCard(i) {
    let subtask = tasks[i].subtasks;
    let subtaskValue = tasks[i]["subtasks-value"];
    let amount = 0;
    let total = subtask.length;
    if (subtask) {
        for (let i = 0; i < subtaskValue.length; i++) {
            if (subtaskValue[i] == 1) amount++;
        }
        return `${amount}/${total}`;
    }
    return "";
}

function setPrioImage(i) {
    let prio = tasks[i].prio;
    if (prio == 1) return "prio_urgent.svg";
    if (prio == 2) return "prio_medium.svg";
    if (prio == 3) return "prio_low.svg";
}

function checkNeedBar(i) {
    let checkSubtask = checkSubtasksOnCard(i);
    let subtask = tasks[i].subtasks;
    let percentBar = calcPercentForProgressBarOnCard(i);
    if (subtask.length >= 1) {
        document.getElementById('progressbarId' + i).innerHTML = templateNeedBar(i, checkSubtask, percentBar);
    }
}

function calcPercentForProgressBarOnCard(i) {
    let subtaskValue = tasks[i]["subtasks-value"];
    let subtaskLength = tasks[i]["subtasks-value"].length;
    let amount = 0;
    let percent = 0;
    for (let i = 0; i < subtaskLength; i++) {
        amount = amount + subtaskValue[i];
    }
    percent = 100 / subtaskLength * amount;
    return percent;
}

function renderContactsIntotheCard(i, contactArray) {
    let difference = -3;
    let initials;
    let backgroundColor;
    let contactField = document.getElementById('contactsId' + i);
    for (let y = 0; y < contactArray.length; y++) { /* checks if the id still exists */
        for (let z = 0; z < contacts.length; z++) {
            let indexOfContact = contacts[z].contactid.indexOf(contactArray[y]); /* if the id does not exist then -1 will be return */
            if (indexOfContact >= 0) {
                difference++;
                if (y <= 2) {
                    initials = contacts[indexOfContact].Initials;
                    backgroundColor = contacts[indexOfContact].profilecolor;
                    contactField.innerHTML += templateRenderContactsIntoTheCard(initials, backgroundColor);
                }
            }
        }
    }
    addCardContactIconOverview(difference, contactField);
}

function addCardContactIconOverview(difference, contactField) {
    if (difference > 0) {
        initials = "+" + difference;
        backgroundColor = "lightgrey";
        contactField.innerHTML += templateRenderContactsIntoTheCard(initials, backgroundColor);
    }
}


/* --------END--------all rendering function to show the Board-------------------------- */

/* ----------------all rendering functions to show the task overview-------------------------- */

function renderTaskInToOverview(i) {
    let category = tasks[i].category;
    let categoryColor = tasks[i]["category-color"];
    let title = tasks[i].title;
    let description = tasks[i].description;
    let date = tasks[i].date;
    let prio = setPrio(i);
    let prioImage = setPrioImage(i);
    let prioColor = setPrioColor(i);
    document.getElementById('task-overviewId').innerHTML = templateRenderTaskInToOverview(i, category, categoryColor, title, description, date, prio, prioImage, prioColor);
    if (tasks[i].subtasks.length >= 1) renderSubtaskInToOverview(i);
    renderContactsInToOverview(i);
}

function renderSubtaskInToOverview(i) {
    let subtaskfield = document.getElementById('overviewSubtasksId');
    subtaskfield.innerHTML = '';
    let subtasks = tasks[i].subtasks;
    for (let z = 0; z < subtasks.length; z++) {
        let subtask = subtasks[z];
        subtaskfield.innerHTML += templateSubtasksInToOverview(i, subtask, z);
    }
    rendersubtaskCheckboxes(i);
}

function rendersubtaskCheckboxes(i) {
    let subtasksValue = tasks[i]["subtasks-value"];
    for (let z = 0; z < subtasksValue.length; z++) {
        if (subtasksValue[z] == 0) document.getElementById('checkboxId' + z).checked = false;
        else document.getElementById('checkboxId' + z).checked = true;
    }

}

function subtasksCheckBoxClick(i, z) {
    let checkbox = document.getElementById('checkboxId' + z);
    if (checkbox.checked == true) tasks[i]["subtasks-value"][z] = 1;
    else tasks[i]["subtasks-value"][z] = 0;

}

function setPrio(i) {
    let prio = tasks[i].prio;
    if (prio == 1) return "Urgent";
    if (prio == 2) return "Medium";
    if (prio == 3) return "Low";
}

function setPrioColor(i) {
    let prio = tasks[i].prio;
    if (prio == 1) return "#FF3D00";
    if (prio == 2) return "#FFA800";
    if (prio == 3) return "#7AE229";
}

function renderContactsInToOverview(i) {
    let contactArray = tasks[i].contacts;
    for (let y = 0; y < contactArray.length; y++) { /* checks if the id still exists */
        for (let z = 0; z < contacts.length; z++) {
            let indexOfContact = contacts[z].contactid.indexOf(contactArray[y]); /* if the id does not exist then -1 will be return */
            if (indexOfContact >= 0) {
                let name = contacts[z].name;
                let surname = contacts[z].surname;
                let initials = contacts[z].Initials;
                let color = contacts[z].profilecolor;
                document.getElementById('taskoverview-contactsId').innerHTML += templateRenderContactsInToOverview(name, surname, initials, color);
            }
        }
    }
}
/* -------END------all rendering functions to show the task overview-------------------------- */

/* ---------------------Drag and Drop-------------------------  */

function startDragging(id) {
    currentDraggedElement = id;
    rotateCardByDragging(id);
    document
}

function allowDrop(ev, id) {
    ev.preventDefault();
    onDropOverBorder(id);
}

function onDragLeave(id) {
    document.getElementById(id).classList.remove('ondroped');
}

function onDropOverBorder(id) {
    document.getElementById(id).classList.add('ondroped');
}

function onDropEnd(status) {
    id = status + 'Id';
    document.getElementById(id).classList.remove('ondroped');
}

async function moveTo(status) {
    let searchFieldId;
    tasks[currentDraggedElement].status = status;
    await saveTaskstoBackend();
    let inputSearchingField1 = document.getElementById('input-searchingId1').value;
    let inputSearchingField2 = document.getElementById('input-searchingId2').value;
    if (inputSearchingField1.length >= 1) searchFieldId = 1;
    if (inputSearchingField2.length >= 1) searchFieldId = 2;
    if (inputSearchingField1 == '' && inputSearchingField1 == '') await loadAllDataForTheBord();
    else filterTasksBySearching(searchFieldId);
    onDropEnd(status);
}

function rotateCardByDragging(id) {
    document.getElementById('card' + id).classList.add('rotate-card');
}

function endDragging(id) {
    rotateCardBack(id);
}

function rotateCardBack(id) {
    document.getElementById('card' + id).classList.remove('rotate-card');
}

function checkWindowInnerScreenForDragAndDrog() {
    if (window.innerWidth > 1280) {
        for (let i = 0; i < cardAmounts.length; i++) {
            id = cardAmounts[i];
            document.getElementById('card' + id).draggable = true;
        }
    } else {
        for (let i = 0; i < cardAmounts.length; i++) {
            id = cardAmounts[i];
            document.getElementById('card' + id).draggable = false;
        }
    }
}

function clearInputSearchingByResize() {
    let inputSearchingField1 = document.getElementById('input-searchingId1');
    let inputSearchingField2 = document.getElementById('input-searchingId2');
    if (inputSearchingField1.value == "") {
        if (inputSearchingField2.value == "") {
        }
        else {
            renderCardsIntoTheBoards();
            inputSearchingField1.value = "";
            inputSearchingField2.value = "";
        }
    } else {
        renderCardsIntoTheBoards();
        inputSearchingField1.value = "";
        inputSearchingField2.value = "";
    }
}

/* ---------END---------Drag and Drop-------------------------  */

/* ---------------------Search functions------------------------ */

function filterTasksBySearching(id) {
    let search = document.getElementById('input-searchingId' + id).value;
    search = search.toLowerCase();
    if (search == '') {
        renderCardsIntoTheBoards();

    } else {
        deleteBoard();
        indexesOfSearching(search);
    }
}

function indexesOfSearching(search) {
    let indexesOfSearching = [];
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;
        if (title.toLowerCase().includes(search)) {
            indexesOfSearching.push(i);
            cardAmounts.push(i);
        }
        else if (description.toLowerCase().includes(search)) {
            indexesOfSearching.push(i);
            cardAmounts.push(i);
        }
    }
    for (let i = 0; i < indexesOfSearching.length; i++) {
        renderTasksToInToOverviewBySearching(indexesOfSearching[i]);
    }
    checkWindowInnerScreenForDragAndDrog();
}

function renderTasksToInToOverviewBySearching(i) {
    let id = tasks[i].id;
    let category = tasks[i].category;
    let categoryColor = tasks[i]["category-color"];
    let title = tasks[i].title;
    let description = tasks[i].description;
    let prioImage = setPrioImage(i);
    let status = tasks[i].status;
    let contacts = tasks[i].contacts;
    document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, description, prioImage, status);
    checkNeedBar(i);
    renderContactsIntotheCard(i, contacts);
}

/* ----------END--------Search functions------------------------ */


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
    /* here comes the popup from bottom */
    await saveTask(i);
    await saveTaskstoBackend();
    slideOutTaskOverviewDialogBoard();
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
    console.log('ja');
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
    slideOutDeleteTaskPopup();
    slideOutTaskOverviewDialogBoard();
}

