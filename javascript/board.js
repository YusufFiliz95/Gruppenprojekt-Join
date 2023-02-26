/* the Dialogs right outside (Addtask...)  runs in height with scroll */
window.onscroll = function () {
    let scrollY = window.scrollY;
    document.getElementById('add-task-bordId').style.top = `calc(5% + ${scrollY}px`;
}


function openAddTaskDialogBorder() {

    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
    document.getElementById('add-task-bordId').style.top = `calc(5% + ${scrollY}px`;
    document.getElementById('add-task-bordId').style.right = `calc((100% - 85%)/2)`;  /* Dialog return to the right outside */

}

function closeAddTaskDialogBorder() {
    document.getElementById('add-task-bordId').style.right = '-130%';  /* Dialog return to the right outside */
    document.getElementById('overlay-bord-addTaskId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
}
