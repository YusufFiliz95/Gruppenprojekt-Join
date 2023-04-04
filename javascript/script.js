let selectedMenu;
let tasks = [];
let contacts = [];
let user = [];
let categorys = [];
let highestUsedId = [];
let users = [];

//FUNCTION FOR LOADING OTHER FUNCTIONS
function init(i) {
    setURL('https://gruppenarbeit-join-475.developerakademie.net/smallest_backend_ever');
    includeHTML().then(() => {
        selectMenuPoint(i);
        setSelectedMenu();
        showConfirmationPopup();
        let loggedInUsername = loadUserFromLocalStorage();
        if (loggedInUsername) {
            let nameoflogedinuserElement = document.getElementById('nameoflogedinuser');
            if (nameoflogedinuserElement) {
                nameoflogedinuserElement.innerHTML = loggedInUsername;
            }
        }
        loadLoggedInUser();
    });
}

function loadLoggedInUser() {
    let loggedInUserInitials = localStorage.getItem("userInitials");
    let userInitialsElement = document.getElementById('userInitials');
    
    if (loggedInUserInitials && userInitialsElement) {
        userInitialsElement.innerHTML = loggedInUserInitials;
    }
}

function toggleLogOutDropDown(event) {
    event.stopPropagation(); // Verhindert, dass das Event weiter nach oben im DOM weitergeleitet wird
    const dropdown = document.getElementById('dropdownlogout');
    const profile = document.getElementById('userinitials');

    // Überprüfen, ob die Elemente vorhanden sind
    if (!dropdown || !profile) {
        return;
    }

    const isClickInsideDropdown = dropdown.contains(event.target);
    const isClickInsideProfile = profile.contains(event.target);

    if (isClickInsideProfile) {
        dropdown.classList.toggle('d-none');
    } else if (!isClickInsideDropdown) {
        dropdown.classList.add('d-none');
    }
}



// Event-Listener für das Klicken im gesamten Fenster
window.addEventListener('click', toggleLogOutDropDown);


// FUNCTIONS TO SAVE AND LOAD TASKS TO/FROM BACKEND

async function saveTaskstoBackend() {
    await backend.setItem('tasks', JSON.stringify(tasks));
}

async function loadTasksfromBackend() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}


// FUNCTIONS TO SAVE AND LOAD CONTACTS TO/FROM BACKEND

async function saveContactstoBackend() {
    await backend.setItem('contacts', JSON.stringify(contacts));
    await backend.setItem('nextContactId', JSON.stringify(nextContactId));
}

async function loadContactsfromBackend() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    usedIds = new Set(contacts.map(contact => parseInt(contact.contactid)));
    for (const contact of contacts) {
        const contactIdNumber = parseInt(contact.contactid, 10);
        if (contactIdNumber > highestUsedId) {
            highestUsedId = contactIdNumber;
        }
    }
    console.log('Loaded contacts:', contacts);
}

// FUNCTIONS TO SAVE AND LOAD USER TO/FROM LOCALSTORAGE

function saveUserToLocalStorage(name) {
    localStorage.setItem('loggedInUserSurname', JSON.stringify(name));
}

function saveUserInitialsToLocalStorage(initials) {
    localStorage.setItem("userInitials", initials);
}

function loadUserFromLocalStorage() {
    let loggedInUsername = JSON.parse(localStorage.getItem('loggedInUserSurname')) || null;
    console.log('Loaded loggedInUserSurname:', loggedInUsername);
    return loggedInUsername;
}


// FUNCTIONS TO SAVE AND LOAD USER TO/FROM BACKEND

async function saveSignedInUserToBackend() {
    await backend.setItem('users', JSON.stringify(users));
}

async function loadSignedInUserfromBackend() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    console.log('Loaded users:', users);
}

// FUNCTIONS TO SAVE AND LOAD Categorys TO/FROM BACKEND

async function saveCategorystoBackend() {
    await backend.setItem('categorys', JSON.stringify(categorys));
    console.log('backend durch');
}

async function loadCategorysfromBackend() {
    await downloadFromServer();
    categorys = JSON.parse(backend.getItem('categorys')) || [];
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
    const selectedMenuElement = document.getElementById(selectedMenu);
    const mobileButtonElement = document.getElementById('mobile-buttonId' + selectedMenu);

    if (selectedMenuElement) {
        selectedMenuElement.classList.add('clicked');
    }

    if (mobileButtonElement) {
        mobileButtonElement.classList.add('mobile-menu-selected');
    }
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
            case 'edittask':
                confirmationText = '<p>Task successfully edited</p>';
                break;
            case 'deletetask':
                confirmationText = '<p>Task successfully deleted</p>';
                break;
            case 'signup':
                confirmationText = '<p>Sign up successful!</p>';
                break;
        }
        document.getElementById('confirmationpopuptext').innerHTML = confirmationText;
        setTimeout(() => {
            confirmationPopup.classList.remove('show');
        }, 1500);
    }
}
/**First, add this element to your html file, where the popup should show:
 *
 *     <div class="confirmation-popup">
        <p id="confirmationpopuptext"></p>
        </div>
 *
 */

//Whenever you need to show this popup, use this function: showConfirmationPopup('createtask');
