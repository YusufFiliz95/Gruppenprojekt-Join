let currentDraggedElement;

/*  -------------------open Dialog Window AddTask and Taskoverview with slideIn slide Out Functions--------------------------  */
function openAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
}

async function closeAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
    addTaskWindow = document.getElementById('add-task-bordId');
    addTaskWindow.classList.add('slide-in-right-add-task');
    addTaskWindow.classList.remove('slide-out-right-add-task');
    renderCardsIntoTheBoards();
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
    renderCardsIntoTheBoards();
}

function slideOutTaskOverviewDialogBoard() {
    let window = document.getElementById('taskoverview-bordId');
    window.classList.remove('slide-in-right-task-overview');
    window.classList.add('slide-out-right-task-overview');
    setTimeout(closeTaskOverviewDialogBoard, 350);
}

/* --------END--------open Dialog Window AddTask and Taskoverview with slideIn slide Out Functions-------------------------- */

/* -------------------all rendering function to show the Board------------------------------ */
function renderCardsIntoTheBoards() {
    deleteBoard();
    for (let i = 0; i < tasks.length; i++) {
        let id = tasks[i].id;
        let category = tasks[i].category;
        let categoryColor = tasks[i]["category-color"];
        let title = tasks[i].title;
        let discription = tasks[i].discription;
        let prioImage = setPrioImage(i);
        let status = tasks[i].status;
        document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, discription, prioImage, status);
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

function templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, discription, prioImage, status) {
    return `<div onclick="openTaskOverviewDialogBord(${i})" id="card${id}" ondragstart="startDragging(${id}, '${status}')" ondragend="endDragging(${id})" draggable="true" class="task-card-bord  dialog-design">
                    <span class="task-card-category" style="background-color:${categoryColor} ;">${category}</span>
                    <span class="task-card-title">${title}</span>
                    <span class="task-card-description">${discription}</span>
                <div id="progressbarId${i}" class="task-card-progressbar-container"></div>
                    <div class="task-card-ass-prio-container">
                        <div id="contactsId${i}" class="task-card-assigned"></div>
                        <img class="task-card-prio" src="img/${prioImage}" alt="">
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
/* --------END--------all rendering function to show the Board-------------------------- */


/* ----------------all rendering functions to show the task overview-------------------------- */

function renderTaskInToOverview(i) {
    let category = tasks[i].category;
    let categoryColor = tasks[i]["category-color"];
    let title = tasks[i].title;
    let discription = tasks[i].discription;
    let date = tasks[i].date;
    let prio = setPrio(i);
    let prioImage = setPrioImage(i);
    let prioColor = setPrioColor(i);
    document.getElementById('task-overviewId').innerHTML = templateRenderTaskInToOverview(i, category, categoryColor, title, discription, date, prio, prioImage, prioColor);
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

function templateSubtasksInToOverview(i, subtask, z) {
    return `
    <div class="taskoverview-subtask-row">
        <input type="checkbox" id="checkboxId${z}" onclick="subtasksCheckBoxClick(${i},${z})">
        <span>${subtask}</span>
    </div>
`;
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

function templateRenderContactsInToOverview(name, surname, initials, color) {
    return `<div class="taskoverview-contact">
        <div class="taskoverview-contact-icon" style="background-color:${color}">${initials}</div>
        <span class="taskoverview-span-right">${name} ${surname} </span>
    </div>  
    `;
}

function templateRenderTaskInToOverview(i, category, categoryColor, title, discription, date, prio, prioImage, prioColor) {
    return `<span class="taskoverview-category" style="background-color:${categoryColor}">${category}</span>
    <span class="taskoverview-title">${title}</span>
    <span class="taskoverview-description">${discription}</span>
    <div id="overviewSubtasksId" class="taskoverview-subtask">

    </div>
    <div class="taskoverview-duedate">
        <span class="taskoverview-span-left">Due date:</span>
        <span class="taskoverview-span-right">${date}</span> 
    </div>
    <div class="taskoverview-prio">
        <span class="taskoverview-span-left">Priority:</span>
        <span class="taskoverview-span-right taskoverview-prio-button" style= "background-color:${prioColor}">${prio}
        <img class="" src="img/${prioImage}" alt="">
        </span> 
    </div>
    <div class="taskoverview-assignto">
        <span class="taskoverview-span-over">Assigned To:</span>
    </div>
    <div id="taskoverview-contactsId" class="taskoverview-contacts">
    </div>
<div class="taskoverview-editbutton-container">
    <button onclick="" class="dark-btn edit-button">
        <img src="img/edit_pen_white.svg" alt="">
    </button>
</div>`;
}

/* -------END------all rendering functions to show the task overview-------------------------- */


/* ---------------------Drag and Drop-------------------------  */

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
    inputSearchingField = document.getElementById('input-searchingId').value;
    if (inputSearchingField == '') renderCardsIntoTheBoards()
    else filterTasksBySearching();
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
/* ---------END---------Drag and Drop-------------------------  */

/* ---------------------Search Functions------------------------ */

function filterTasksBySearching(id) {
    let search = document.getElementById('input-searchingId' + id).value;
    search = search.toLowerCase();
    if (search == '') {
        renderCardsIntoTheBoards();
    } else {
        deleteBoard();
        indexesOfSearching(search);
        window.scrollTo(0, 0);
    }
}

function indexesOfSearching(search) {
    let indexesOfSearching = [];
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let discription = tasks[i].discription;
        if (title.toLowerCase().includes(search)) indexesOfSearching.push(i);
        else if (discription.toLowerCase().includes(search)) indexesOfSearching.push(i);
    }
    for (let i = 0; i < indexesOfSearching.length; i++) {
        renderTasksToInToOverviewBySearching(indexesOfSearching[i]);
    }
}

function renderTasksToInToOverviewBySearching(i) {
    let id = tasks[i].id;
    let category = tasks[i].category;
    let categoryColor = tasks[i]["category-color"];
    let title = tasks[i].title;
    let discription = tasks[i].discription;
    let prioImage = setPrioImage(i);
    let status = tasks[i].status;
    document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, id, category, categoryColor, title, discription, prioImage, status);
    checkNeedBar(i);
    renderContactsIntotheCard(i);
}

/* ----------END--------Search Functions------------------------ */