let selectedMenu;
/* let tasks = [];
let contacts = [];
let user = [];
let category = []; */

//FUNCTION FOR LOADING OTHER FUNCTIONS
async function init(i) {
    await includeHTML();
    setURL('https://gruppenarbeit-join-475.developerakademie.net/smallest_backend_ever');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('allContacts')) || [];
    loadContacts();
    selectMenuPoint(i);
    setSelectedMenu();
    showConfirmationPopup();
}

//FUNCTION FOR INCLUDING OTHER HTML SNIPPETS
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
/* function so that the dialog window does not close when clicked */
function doNotClose(event) {
    event.stopPropagation();
}

function selectMenuPoint(i) {
    selectedMenu = i;
}

function setSelectedMenu() {
    document.getElementById(selectedMenu).classList.add('clicked');
    document.getElementById('mobile-buttonId' + selectedMenu).classList.add('mobile-menu-selected');
}

/*  -------------------open Dialog Window AddTask with slideIn slide Out Functions--------------------------  */

function openAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
}

function closeAddTaskDialogBord() {
    document.getElementById('overlay-bord-addTaskId').classList.add('d-none');
    document.getElementById('bodyBordId').classList.remove('overflow-dialog');
    addTaskWindow = document.getElementById('add-task-bordId');
    addTaskWindow.classList.add('slide-in-right-add-task');
    addTaskWindow.classList.remove('slide-out-right-add-task');
    if (selectedMenu == 2) renderCardsIntoTheBoards();
}

function slideOutAddTaskDialogBord() {
    let window = document.getElementById('add-task-bordId');
    window.classList.remove('slide-in-right-add-task');
    window.classList.add('slide-out-right-add-task');
    setTimeout(closeAddTaskDialogBord, 350);
}


function showConfirmationPopup(actionType) {
    if (actionType) {
        const confirmationPopup = document.querySelector('.confirmation-popup');
        confirmationPopup.classList.add('show');
        let confirmationText = '';
        switch (actionType) {
            case 'addcontact':
                confirmationText = '<p>Contact successfully created</p>';
                break;
            case 'deletecontact':
                confirmationText = '<p>Contact successfully deleted</p>';
                break;
            case 'editcontact':
                confirmationText = '<p>Contact successfully edited</p>';
                break;
            case 'createtask':
                confirmationText = '<p>Task successfully created</p>';
                break;
        }
        document.getElementById('confirmationpopuptext').innerHTML = confirmationText;
        setTimeout(() => {
            confirmationPopup.classList.remove('show');
        }, 1500);
    }
}
//Füge diese Funktion zu deiner Funktion hinzu, in der der Task erstellt wird: showConfirmationPopup('createtask');