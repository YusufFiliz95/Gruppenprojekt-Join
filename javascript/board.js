/* the Dialogs right outside (Addtask...)  runs in height with scroll */
window.onscroll = function () {
    let scrollY = window.scrollY;
    document.getElementById('add-task-bordId').style.top = `calc(5% + ${scrollY}px`;
    document.getElementById('taskoverview-bordId').style.top = `calc(5% + ${scrollY}px`;
}


function openAddTaskDialogBord() {

    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('add-task-bordId').style.top = `calc(5% + ${scrollY}px`;
    document.getElementById('add-task-bordId').style.right = `calc((100% - 85%)/2)`;  /* Dialog go into the middle of the page */
    document.getElementById('bodyBordId').classList.add('overflow-dialog');

}

function closeAddTaskDialogBord() {
    document.getElementById('add-task-bordId').style.right = '-130%';  /* Dialog return to the right outside */
    document.getElementById('overlay-bord-addTaskId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
}

function openTaskOverviewOnBord() {

    document.getElementById('overlay-bord-taskoverviewId').classList.remove('d-none');
    document.getElementById('taskoverview-bordId').style.top = `calc(5% + ${scrollY}px`;
    document.getElementById('taskoverview-bordId').style.right = `calc((100% - 623px)/2)`;  /* Dialog go into the middle of the page */
    document.getElementById('bodyBordId').classList.add('overflow-dialog');

}

function closeTaskOverviewOnBoard() {
    document.getElementById('taskoverview-bordId').style.right = '-130%';  /* Dialog return to the right outside */
    document.getElementById('overlay-bord-taskoverviewId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');

}

function renderCardsIntoTheBoards() {
    for (let i = 0; i < tasks.length; i++) {
        let category = tasks[i].category;
        let categoryColor = tasks[i]["category-color"];
        let title = tasks[i].title;
        let discription = tasks[i].discription;
        let prio = checkPrioOnCard(i);
        let status = tasks[i].status;
        document.getElementById(status + 'Id').innerHTML += templateRenderCardsIntoTheBoard(i, category, categoryColor, title, discription, prio);
        checkNeedBar(i);
        renderContactsIntotheCard(i);
    }
}

function checkSubtasksOnCard(i) {
    let subtask = tasks[i].subtasks;
    let amount = 0;
    let total = 0;
    if (subtask) {
        for (let i = 0; i < subtask.length; i++) {
            if (subtask[i] == 1) amount++;                      /* here is a problem, use subtask.value */
        }
        total = subtask.length;
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
    let percentBar = calcPercentForProgressBarOnCard();
    if (subtask.length >= 1) {
        document.getElementById('progressbarId' + i).innerHTML = templateNeedBar(i, checkSubtask, percentBar);
    }
}

function calcPercentForProgressBarOnCard(i) {
                                                        /* please finish that */
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

function templateRenderCardsIntoTheBoard(i, category, categoryColor, title, discription, prio) {
    return `<div onclick="openTaskOverviewOnBord(${i})" class="task-card-bord  dialog-design">
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
                <div id="barId(${i})" class="task-card-bar" style="width:${percentBar};" ></div>
            </div>
            <span>${checkSubtask} Done</span>`;
}