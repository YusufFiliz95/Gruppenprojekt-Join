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


function renderCardsIntoTheBoards(){
for (let i = 0; i < tasks.length; i++) {
    let category = tasks[i].category;
    let title = tasks[i].title;
    let discription = tasks[i].discription;
    let subtasks = tasks[i].subtasks;
    let contacts = tasks[i].contacts;
    let prio = tasks[i].prio;

    
} 
}

function checkSubtasksOnCards(){
    if (tasks[i].subtasks){
        
    }
}