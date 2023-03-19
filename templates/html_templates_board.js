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
    <button onclick="renderEditTaskDialog(${i})" class="dark-btn edit-button">
        <img src="img/edit_pen_white.svg" alt="">
    </button>
</div>`;
}

function templateEditTask(i) {
    return `
                <!-- title input -->
                <div class="edit-task-container">
                <div class="add-task-headline">
                <h1>Edit Task</h1>
                </div>
                <div class="input-container">
                    <label>Title</label>
                    <div class="input-field">
                        <input id="title" type="text" placeholder="Enter a title">
                    </div>
                    <p class="required d-none ">This field is required</p>
                </div>
                <!-- description input -->
                <div class="input-container">
                    <label>Description</label>
                    <textarea class="textarea-field" name="" id="description" rows="3"
                        placeholder="Enter a description"></textarea>
                    <p class="required d-none ">This field is required</p>
                </div>
                <!-- contact input -->
                <div class="input-container">
                    <label>Assigned to</label>
                    <div class="toggle-menu">
                        <div class="assigned-to" onclick="toggleMenu('toggle-2')">
                            <span>Select contact to assign</span>
                            <img src="./img/triangle.svg">
                        </div>
                        <div id="toggle-2" class="selection d-none">
                            <div class="contact">
                                <span>You</span>
                                <input type="checkbox">
                            </div>
                            <div id="contact-container"></div>
                            <div class="contact">
                                <span>Invite new contact</span>
                                <img src="./img/contact_dark.svg">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Date input -->
                <div class="input-container">
                    <label>Due date</label>
                    <div class="input-field">
                        <input type="date" placeholder="dd/mm/yyyy" min="2023-03-15">
                        <p class="required d-none ">This field is required</p>
                    </div>
                </div>
                <!-- Prio Buttons input -->
                <div class="input-container">
                    <label>Prio</label>
                    <div class="prio-btn">
                        <button id="urgent-btn" onclick="addPrio(1)"><span>Urgent</span><img class="prio-img"
                                id="urgent-image" src="./img/prio_urgent.svg"></button>
                        <button id="medium-btn" onclick="addPrio(2)"><span>Medium</span><img class="prio-img"
                                id="medium-image" src="./img/prio_medium.svg"></button>
                        <button id="low-btn" onclick="addPrio(3)"><span>Low</span><img class="prio-img" id="low-image"
                                src="./img/prio_low.svg"></button>
                    </div>
                </div>
                <div class="input-container">
                    <label>Status</label>
                    <div class="toggle-menu">

                        <div class="assigned-to" onclick="toggleMenu('toggle-3')">
                            <span></span>
                            <img src="./img/triangle.svg">
                        </div>
                        <div id="toggle-3" class="selection d-none">  
                        <div class="contact">                        
                                <span>To do</span>
                                </div>
                        <div class="contact">  
                                <span>In progress</span>
                        </div>
                        <div class="contact">  
                            <span>Awaiting Feedback</span>
                        </div> 
                        <div class="contact">  
                                <span>Done</span>
                        </div>    
                        
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="taskoverview-editbutton-container">
                <div class="edit-button-content">
                    <button onclick="" class="dark-btn edit-button-trash">
                    <img src="img/empty_trash.png" alt="">
                    </button>
                    <button onclick="" class="dark-btn edit-button-ok">
                    <span>Ok</span>
                    <img src="img/hook_white.svg" alt="">
                    </button>
                </div>
                </div>
`;
}

function templateAddTaskDialog() {
    return `
    <h1 class="task-headline">Add Task</h1>
    <div class="task-container">
        <div class="task-left">
            <!-- tittle input -->
            <div class="input-container">
                <label>Title</label>
                <div class="input-field">
                    <input id="title" type="text" placeholder="Enter a title">
                </div>
                <p class="required d-none ">This field is required</p>
            </div>
            <!-- description input -->
            <div class="input-container">
                <label>Description</label>
                <textarea class="textarea-field" name="" id="description" rows="3"
                    placeholder="Enter a description"></textarea>
                <p class="required d-none ">This field is required</p>
            </div>
            <!-- category input -->
            <div class="input-container">
                <label>Category</label>
                <div class="toggle-menu">
                    <div id="toggle-menu" class="select-task-category" onclick="toggleMenu('toggle-1')">
                        <span id="selected-category">Select task category</span>
                        <img src=" ./img/triangle.svg">
                    </div>
                    <div id="category-input" class="input-field d-none">
                        <input id="category-input-field" type="text" placeholder="New category name">
                        <div id="add-input" class="add-input">
                            <div id="currentColor" class="color-circle"></div>
                            <img onclick="closeInputfield('toggle-menu')" class="x" src="./img/black-x.svg">
                            <img onclick="addedCategory(), renderCategory(), closeInputfield('toggle-menu')"
                                src="./img/tick_dark.svg">
                        </div>
                    </div>
                    <div id="toggle-1" class="selection d-none">
                        <span onclick="openInputfield('toggle-1'), renderCategoryColors()">New Category</span>
                        <div id="category-container"></div>
                    </div>
                </div>
                <div id="color-container" class="color-container">
                </div>
            </div>
            <!-- contact input -->
            <div class="input-container">
                <label>Assigned to</label>
                <div class="toggle-menu">
                    <div class="assigned-to" onclick="toggleMenu('toggle-2')">
                        <span>Select contact to assign</span>
                        <img src="./img/triangle.svg">
                    </div>
                    <div id="toggle-2" class="selection d-none">
                        <div class="contact">
                            <span>You</span>
                            <input type="checkbox">
                        </div>
                        <div id="contact-container"></div>
                        <div class="contact">
                            <span>Invite new contact</span>
                            <img src="./img/contact_dark.svg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-right">
            <!-- Date input -->
            <div class="input-container">
                <label>Due date</label>
                <div class="input-field">
                    <input type="date" placeholder="dd/mm/yyyy" min="2023-03-15">
                    <p class="required d-none ">This field is required</p>
                </div>
            </div>
            <!-- Prio Buttons input -->
            <div class="input-container">
                <label>Prio</label>
                <div class="prio-btn">
                    <button id="urgent-btn" onclick="addPrio(1)"><span>Urgent</span><img class="prio-img"
                            id="urgent-image" src="./img/prio_urgent.svg"></button>
                    <button id="medium-btn" onclick="addPrio(2)"><span>Medium</span><img class="prio-img"
                            id="medium-image" src="./img/prio_medium.svg"></button>
                    <button id="low-btn" onclick="addPrio(3)"><span>Low</span><img class="prio-img" id="low-image"
                            src="./img/prio_low.svg"></button>
                </div>
            </div>
            <!-- subtask input -->
            <div class="input-container">
                <label>Subtasks</label>
                <div class="input-field">
                    <input onclick="openSubtaskInput()" id="subtask-input" type="text" placeholder="Add new subtask">
                    <img onclick="openSubtaskInput()" id="subtask-plus" src="./img/plus_dark.svg">
                    <div id="subtask-buttons" class="d-none subtask-input">
                        <img onclick="closeSubtaskInput()" class="x" src="./img/black-x.svg">
                        <img onclick="addSubtasks(), renderSubtasks()" src="./img/tick_dark.svg">
                    </div>
                </div>
                <div id="subtasks-container"></div>
            </div>
        </div>
    </div>
    <!-- Clear and Create Buttons -->
    <div class="add-task-buttons">
        <button class="transparent-btn clear-btn"><span>clear x</span></button>
        <button class="dark-btn create-btn"><span>Create Task</span><img src="./img/tick_white.svg" alt=""></button>
    </div>
    `
}