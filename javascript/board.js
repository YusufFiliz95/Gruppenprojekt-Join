function openAddTaskDialogBorder() {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
    setTimeout(dialogComeInFromRightSide, 0);
    /* dialogComeInFromRightSide(); */

}

function closeAddTaskDialogBorder() {
    document.getElementById('overlay-bord-addTaskId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
    document.getElementById('add-task-bordId').style.right = '-100%'; /* Dialog return to the right outside */
}


function dialogComeInFromRightSide() {
    document.getElementById('add-task-bordId').style.right = '0%';
}