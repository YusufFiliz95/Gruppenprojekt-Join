let currentDraggedElement;


function openAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');

}

function closeAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
}

function openTaskOverviewOnBord() {
    document.getElementById('overlay-bord-taskoverviewId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');

}

function closeTaskOverviewOnBoard() {
    document.getElementById('overlay-bord-taskoverviewId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');

}


function renderCardsIntoTheBoards() {
    deleteBoard();
    for (let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;
        let category = tasks[i].category;
        let categoryColor = tasks[i]["category-color"];
        let title = tasks[i].title;
        let discription = tasks[i].discription;
        let prio = checkPrioOnCard(i);
        let status = tasks[i].status;
        document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, discription, prio, status);
        checkNeedBar(i);
        renderContactsIntotheCard(i);
    }
}

function deleteBoard() {
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

function checkPrioOnCard(i) {
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

function templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, discription, prio, status) {
    return `<div onclick="openTaskOverviewOnBord(${i})" id="card${id}" ondragstart="startDragging(${id}, '${status}')" ondragend="endDragging(${id})" draggable="true" class="task-card-bord  dialog-design">
                    <span class="task-card-category" style="background-color:${categoryColor} ;">${category}</span>
                    <span class="task-card-title">${title}</span>
                    <span class="task-card-description">${discription}</span>
                <div id="progressbarId${i}" class="task-card-progressbar-container"></div>
                    <div class="task-card-ass-prio-container">
                        <div id="contactsId${i}" class="task-card-assigned"></div>
                        <img class="task-card-prio" src="img/${prio}" alt="">
                    </div>
                </div>
            </div>        
`;
}

function templateRenderContactsIntoTheCard(initials, backgroundColor) {
    return `<div class="task-card-contact-icon" style="background-color: ${backgroundColor};">${initials}</div>`;
}

function templateNeedBar(i, checkSubtask, percentBar) {
    return `<div class="task-card-progressbar">
                <div id="barId(${i})" class="task-card-bar" style="width:${percentBar}%;" ></div>
            </div>
            <span>${checkSubtask} Done</span>`;
}

/* Drag and Drop  */

function startDragging(id, status) {
    currentDraggedElement = id;
    rotateCardByDragging(id);
    fillEmtyDivByDragging(id, status);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasks[currentDraggedElement].status = status;
    renderCardsIntoTheBoards();
}

function rotateCardByDragging(id) {
    document.getElementById('card' + id).classList.add('rotate-card');
}

function endDragging(id) {
    rotateCardBack(id);
    deleteEmtyDivByDragging();
}

function rotateCardBack(id) {
    document.getElementById('card' + id).classList.remove('rotate-card');
}

function fillEmtyDivByDragging(id, status) {

    if (status === 'toDo') {
        document.getElementById('toProgressId').innerHTML += `<div id="emtyDivId1" class="emty-div"> </div>`;
        document.getElementById('awaitingFeedbackId').innerHTML += `<div id="emtyDivId2" class="emty-div"> </div>`;
        document.getElementById('doneId').innerHTML += `<div id="emtyDivId3" class="emty-div"> </div>`;
    }
    if (status == 'toProgress') {
        document.getElementById('toDoId').innerHTML += `<div id="emtyDivId1" class="emty-div"> </div>`;
        document.getElementById('awaitingFeedbackId').innerHTML += `<div id="emtyDivId2" class="emty-div"> </div>`;
        document.getElementById('doneId').innerHTML += `<div id="emtyDivId3" class="emty-div"> </div>`;
    }
    if (status == 'awaitingFeedback') {
        document.getElementById('toDoId').innerHTML += `<div id="emtyDivId1" class="emty-div"> </div>`;
        document.getElementById('toProgressId').innerHTML += `<div id="emtyDivId2" class="emty-div"> </div>`;
        document.getElementById('doneId').innerHTML += `<div id="emtyDivId3" class="emty-div"> </div>`;
    }
    if (status == 'done') {
        document.getElementById('toDoId').innerHTML += `<div id="emtyDivId1" class="emty-div"> </div>`;
        document.getElementById('awaitingFeedbackId').innerHTML += `<div id="emtyDivId2" class="emty-div"> </div>`;
        document.getElementById('toProgressId').innerHTML += `<div id="emtyDivId3" class="emty-div"> </div>`;
    }
    height = document.getElementById('card' + id).clientHeight + 'px';
    document.getElementById('emtyDivId1').style.height = height;
    document.getElementById('emtyDivId2').style.height = height;
    document.getElementById('emtyDivId3').style.height = height;
}

function deleteEmtyDivByDragging() {

    for (let i = 1; i < 4; i++) {
        divExist = document.getElementById('emtyDivId' + i);
        if (divExist) document.getElementById('emtyDivId' + i).remove();
    }
}