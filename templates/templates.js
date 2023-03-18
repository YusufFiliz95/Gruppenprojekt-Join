/* TEMPLATES FOR BORD.HTML/BORD.JS */

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

function templateSubtasksInToOverview(i, subtask, z) {
    return `
    <div class="taskoverview-subtask-row">
        <input type="checkbox" id="checkboxId${z}" onclick="subtasksCheckBoxClick(${i},${z})">
        <span>${subtask}</span>
    </div>
`;
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