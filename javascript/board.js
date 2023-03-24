
/* All templates for the renderingron the board are in the templates/template.js */

let currentDraggedElement;
let cardAmounts = [];

/*  -------------------open Dialog Window Taskoverview with slideIn slide Out Functions--------------------------  */

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
}

function slideOutTaskOverviewDialogBoard() {
    let window = document.getElementById('taskoverview-bordId');
    window.classList.remove('slide-in-right-task-overview');
    window.classList.add('slide-out-right-task-overview');
    setTimeout(closeTaskOverviewDialogBoard, 350);
    prio = 0; /* var from AddTask.js */
}

function renderAddTaskDialog() {
    document.getElementById('add-task-contentId').innerHTML = templateAddTaskDialog();
    renderContacts();
}

function renderEditTaskDialog(i) {
    deleteTaskOverview();
    document.getElementById('task-overviewId').innerHTML = templateEditTask();
    fillInputsByEditTask(i)
}

function deleteAddTaskDialog() {
    document.getElementById('add-task-contentId').innerHTML = "";
}

function deleteTaskOverview() {
    document.getElementById('task-overviewId').innerHTML = "";
}

/* --------END--------open Dialog Window AddTask and Taskoverview with slideIn slide Out Functions-------------------------- */

/* -------------------all rendering function to show the Board------------------------------ */
function renderCardsIntoTheBoards() {
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
        document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, description, prioImage, status);
        checkNeedBar(i);
        renderContactsIntotheCard(i);
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

function renderContactsIntotheCard(i) {
    let contact = tasks[i].contacts;
    let difference = contact.length - 3;
    let initials;
    let backgroundColor;
    let amountContacts = checkAmountContactsInCard(contact);
    for (let z = 0; z < amountContacts; z++) {
        initials = tasks[i].contacts[z].initials;
        backgroundColor = tasks[i].contacts[z].color;
        if (z == 3) {
            initials = "+" + difference;
            backgroundColor = "lightgrey";
        }
        document.getElementById('contactsId' + i).innerHTML += templateRenderContactsIntoTheCard(initials, backgroundColor);
    }
}

function checkAmountContactsInCard(contact) {
    amount = contact.length
    if (amount <= 4) return amount;
    else return 4;
}

function templateNeedBar(i, checkSubtask, percentBar) {
    return `<div class="task-card-progressbar">
                <div id="barId(${i})" class="task-card-bar" style="width:${percentBar}%;" ></div>
            </div>
            <span>${checkSubtask} Done</span>`;
}
/* --------END--------all rendering function to show the Board-------------------------- */

/* ----------------all rendering functions to show the task overview-------------------------- */

function renderTaskInToOverview(i) {
    let category = tasks[i].category;
    let categoryColor = tasks[i]["category-color"];
    let title = tasks[i].title;
    let e = tasks[i].e;
    let date = tasks[i].date;
    let prio = setPrio(i);
    let prioImage = setPrioImage(i);
    let prioColor = setPrioColor(i);
    document.getElementById('task-overviewId').innerHTML = templateRenderTaskInToOverview(i, category, categoryColor, title, e, date, prio, prioImage, prioColor);
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
    let contacts = tasks[i].contacts;

    for (let z = 0; z < contacts.length; z++) {
        let name = tasks[i].contacts[z].name;
        let surname = tasks[i].contacts[z].surname;
        let initials = tasks[i].contacts[z].initials;
        let color = tasks[i].contacts[z].color;
        document.getElementById('taskoverview-contactsId').innerHTML += templateRenderContactsInToOverview(name, surname, initials, color);
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
    console.log(id);
    document.getElementById(id).classList.remove('ondroped');
}

function moveTo(status) {
    let searchFieldId;
    tasks[currentDraggedElement].status = status;
    let inputSearchingField1 = document.getElementById('input-searchingId1').value;
    let inputSearchingField2 = document.getElementById('input-searchingId2').value;
    if (inputSearchingField1.length >= 1) searchFieldId = 1;
    if (inputSearchingField2.length >= 1) searchFieldId = 2;
    if (inputSearchingField1 == '' && inputSearchingField1 == '') renderCardsIntoTheBoards();
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
    let inputSearchingField1 = document.getElementById('input-searchingId1').value;
    let inputSearchingField2 = document.getElementById('input-searchingId2').value;
    if (inputSearchingField1 == "") {
        if (inputSearchingField2 == "") {
        }
        else {
            renderCardsIntoTheBoards();
            document.getElementById('input-searchingId1').value = "";
            document.getElementById('input-searchingId2').value = "";
        }
    } else {
        renderCardsIntoTheBoards();
        document.getElementById('input-searchingId1').value = "";
        document.getElementById('input-searchingId2').value = "";
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
        else if (e.toLowerCase().includes(search)) {
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
    document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, description, prioImage, status);
    checkNeedBar(i);
    renderContactsIntotheCard(i);
}

/* ----------END--------Search functions------------------------ */


/* --------------------- all functions for edit Task------------------- */

function fillInputsByEditTask(i) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    let dueDate = tasks[i].date;
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    /* document.getElementById('').value = dueDate; */
    setPrioButtonByEditTask(i);
}

function setPrioButtonByEditTask(i) {
    let prio = tasks[i].prio;
    if (prio == 1) addPrio(1); /* function from addTask.js */
    if (prio == 2) addPrio(2); /* function from addTask.js */
    if (prio == 3) addPrio(3); /* function from addTask.js */

}