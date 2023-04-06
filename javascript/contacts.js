

//***********************************FUNCTION FOR LOAD THE LIST OF CONTACTS***********************************//
async function loadContacts() {
    await loadContactsfromBackend();
    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    const contactListDiv = document.getElementById('contactlist');

    if (!contactListDiv) {
        return; // Exit the function if the contactListDiv element is not found
    }

    contactListDiv.innerHTML = /*html*/ `
                <div class="contactlist-info-headline">
                    <h1>Contacts</h1>
                    <div class="contactlist-border"></div>
                    <p>Better with a team</p>
                </div>
    `;
    usedIds = new Set(contacts.map(contact => parseInt(contact.contactid)));

    if (contacts.length === 0) {
        document.getElementById('newcontactbtn').classList.add('d-none');
        contactListDiv.innerHTML += /*html*/`
        <div class="no-contacts">
            <p class="no-contacts-text">No contacts yet! Add some to brighten up your list and stay connected with your favorite people.</p>
            <div class="dark-btn new-contact" onclick="newContact()" id="newcontactbtn">
                <p>New Contact</p>
                <img src="../img/new_contact_icon.svg" alt="">
            </div>
        </div>
            `;
        return;
    } else {
        document.getElementById('newcontactbtn').classList.remove('d-none');
        let currentChar = '';
        for (let i = 0; i < sortedContacts.length; i++) {
            const list = sortedContacts[i];
            if (list.name.charAt(0) != currentChar) {
                currentChar = list.name.charAt(0);
                if (!document.getElementById(`char-${currentChar.toUpperCase()}`)) {
                    contactListDiv.innerHTML += /*html*/ `
                    <div class="contact-char" id="char-${currentChar.toUpperCase()}"><p>${currentChar.toUpperCase()}</p></div>
                `;
                }
            }
            contactListDiv.innerHTML += /*html*/ `
            <div class="contacts" onclick="showContactInfo(${i})" id="${list.contactid}">
                <div class="contact-initials" style="background-color: ${list.profilecolor}">
                    <p>${list.Initials.toUpperCase()}</p>
                </div>
                <div class="contact-name-email">
                <div class="contact-name">
                <p>${maxNameSurnameChar(list.name.charAt(0).toUpperCase() + list.name.slice(1).toLowerCase(), list.surname.charAt(0).toUpperCase() + list.surname.slice(1).toLowerCase())}</p>
                </div>
                    <div class="contact-email">
                        <p>${maxEmailChar(list.email)}</p>
                    </div>
                </div>
            </div>
        `;
        }
    }
}


function maxEmailChar(email, maxLength = 28) {
    if (email.length <= maxLength) {
        return email;
    } else {
        return email.slice(0, maxLength - 3) + '...';
    }
}

function maxNameSurnameChar(name, surname, maxLength = 18) {
    const combinedName = name + ' ' + surname;
    if (combinedName.length <= maxLength) {
        return combinedName;
    } else {
        return name.slice(0, 13) + '...';
    }
}
//**************************************************************************************************************************************//

//***********************************FUNCTION FOR SHOW DETAILED INFORMATION OF THE CONTACT***********************************//
function showContactInfo(i) {
    const contactinfo = contacts[i];
    const formattedName = contactinfo.name.charAt(0).toUpperCase() + contactinfo.name.slice(1).toLowerCase();
    const formattedSurname = contactinfo.surname.charAt(0).toUpperCase() + contactinfo.surname.slice(1).toLowerCase();
    const formattedEmail = contactinfo.email.toLowerCase();
    const showClickedContact = document.getElementById('contactinfo');
    document.querySelector('.contact-info-section').style.display = 'block';
    showClickedContact.innerHTML = /*html*/`
    <div class="close-contact-info-section" onclick="hideContactInfo()">
        <img src="img/black-x.svg" alt="">
    </div>
    <div class="contact-info-initials-name-add-task">
        <div class="contact-info-initials-info" style="background-color: ${contactinfo.profilecolor}">
            <p>${contactinfo.Initials}</p>
        </div>
        <div class="contact-info-name-add-task">
            <p class="contact-info-name">${formattedName} ${formattedSurname}</p>
            <div class="contact-info-add-task" onclick="openAddTaskDialogBord(${i})">
                <div class="contact-plus-icon"></div>
                <p>Add Task</p>
            </div>
        </div>
    </div>
    <div class="contact-information-edit-contact">
        <div class="contact-information">
            <p>Contact Information</p>
        </div>
        <div class="edit-contact" onclick="editContact(${i})">
            <div class="pen-icon"></div>
            <p>Edit Contact</p>
        </div>
    </div>
    <div class="contact-info-email-phone">
        <div class="email-phone">
            <div class="contact-info-email">
                <p class="weight-1000">Email</p>
                <p class="contact-info-email-underline">${formattedEmail}</p>
            </div>
            <div class="contact-info-phone">
                <p class="weight-1000">Phone</p>
                <p>${contactinfo.phonenumber}</p>
            </div>
        </div>
        <div class="delete-contact-section">
            <button onclick="deleteContactPopup(${i})" class="dark-btn delete-contact-btn">
                <img src="img/empty_trash.png" alt="">
            </button>
        </div>
    </div>
    `;
    // Highlight a contact if its clicked
    const highlightContact = document.getElementsByClassName('contacts');
    for (let j = 0; j < highlightContact.length; j++) {
        highlightContact[j].classList.remove('selected-contact-info');
    }
    highlightContact[i].classList.add('selected-contact-info');
}

function hideContactInfo() {
    document.querySelector('.contact-info-section').style.display = 'none';
}
//**************************************************************************************************************************************//

//***********************************FUNCTION FOR NOT CLOSING THE ADD CONTACT CONTAINER IF ITS CLICKED***********************************//
function doNotClose(event) {
    event.stopPropagation();
}
//**************************************************************************************************************************************//

//**FUNCTION FOR THE DIV THAT HAS A INPUT FIELD AND YOU CAN CLICK ANYWHERE INSIDE THE DIV, THE INPUT FIELD GETS ALWAYS FOCUSED**//
function focusInputField(container) {
    const input = container.querySelector('input');
    input.focus();
}
//**************************************************************************************************************************************//

//***********************************FUNCTION FOR CLOSE THE ADD CONTACT FORM WITH ANIMATION***********************************//
function closeForm() {
    const addNewContactContainer = document.querySelector('.add-new-contact-container');
    const addNewContactSection = document.querySelector('.add-new-contact-section');
    addNewContactContainer.classList.remove('slide-in');
    addNewContactSection.classList.remove('fade-in');
    addNewContactContainer.classList.add('slide-out');
    addNewContactSection.classList.add('fade-out');
    setTimeout(function () {
        addNewContactContainer.classList.add('d-none');
        addNewContactContainer.classList.remove('slide-out');
        addNewContactSection.classList.remove('fade-out');
        addNewContactSection.classList.add('d-none');
        deleteFormAfterClose();
        // Hide error messages when the form is closed.
        hideErrorMessage('nameError');
        hideErrorMessage('emailError');
        hideErrorMessage('phoneError');
    }, 500);
}
//**************************************************************************************************************************************//

//**************************FUNCTION FOR SETTING THE VALUE OF THE INPUT FIELDS OF '' IF ITS GET CANCELED OR CREATED*************************//
function deleteFormAfterClose() {
    const newContactNameInput = document.getElementById('newContactName');
    const newContactEmailInput = document.getElementById('newContactEmail');
    const newContactPhoneInput = document.getElementById('newContactPhone');
    newContactNameInput.value = '';
    newContactEmailInput.value = '';
    newContactPhoneInput.value = '';
}
//**************************************************************************************************************************************//

/**
 * When the user clicks the button, the container and section are displayed, then the container slides
 * in and the section fades in. When the user clicks the section, the container slides out and the
 * section and container are hidden.
 */
function newContact() {
    const addNewContactContainer = document.querySelector('.add-new-contact-container');
    const addNewContactSection = document.querySelector('.add-new-contact-section');

    addNewContactSection.classList.remove('d-none');
    addNewContactContainer.classList.remove('d-none');
    setTimeout(function () {
        addNewContactContainer.classList.add('slide-in');
        addNewContactSection.classList.add('fade-in');
    }, 50);

    addNewContactContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    addNewContactSection.addEventListener('click', function () {
        addNewContactContainer.classList.remove('slide-in');
        addNewContactSection.classList.remove('fade-in');
        addNewContactContainer.classList.add('slide-out');
        setTimeout(function () {
            addNewContactContainer.classList.add('d-none');
            addNewContactContainer.classList.remove('slide-out');
            addNewContactSection.classList.add('d-none');
        }, 500);
    });
}
//**************************************************************************************************************************************//

//***********************************FUNCTION FOR CREATING NEW CONTACT AND ADD IT TO THE ARRAY THAT IS SHOWN IN THE LIST AFTER THAT***********************************//
async function createNewContact() {
    const newContactNameInput = document.getElementById('newContactName');
    const newContactEmailInput = document.getElementById('newContactEmail');
    const newContactPhoneInput = document.getElementById('newContactPhone');

    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/; // Check if the name consists of two words.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Check if the email address is valid.

    if (nameRegex.test(newContactNameInput.value) && emailRegex.test(newContactEmailInput.value)) {
        await loadContactsfromBackend();
        const [name, surname] = newContactNameInput.value.split(' '); // Split the name into first and last name.
        const lastContactId = getNextContactId();
        const usedColors = contacts.map(contact => contact.profilecolor);
        const availableColors = ['#343a40', '#dc3545', '#007bff', '#28a745', '#6c757d', '#ffc107', '#7952b3', '#17a2b8', '#6f42c1'].filter(color => !usedColors.includes(color) && color !== '#FFFFFF');
        const profileColor = availableColors[Math.floor(Math.random() * availableColors.length)];
        const newContact = {
            'name': name,
            'surname': surname,
            'email': newContactEmailInput.value,
            'profilecolor': profileColor,
            'Initials': name[0].toUpperCase() + surname[0].toUpperCase(),
            'phonenumber': newContactPhoneInput.value,
            'contactid': lastContactId
        };
        showConfirmationPopup('addcontact');
        contacts.push(newContact);
        await saveContactstoBackend(contacts);
        await loadContacts();
        // Show the newly created contact info
        const newContactIndex = contacts.findIndex(contact => contact === newContact);
        if (newContactIndex >= 0) {
            showContactInfo(newContactIndex);
        }
        closeForm();
    }
}

// Function to get the next available contact ID
function getNextContactId() {
    // Increment the highest used ID by 1
    highestUsedId++;

    // Convert the highest used ID to a string
    const stringId = highestUsedId.toString();

    // Return the string ID
    return stringId;
}
//**************************************************************************************************************************************//

/**
 * It validates the input fields and if they are valid, it calls the createNewContact() function.
 * @param id - The id of the element to show the error message in.
 * @param message - The message to be displayed in the alert box.
 */
function showErrorMessage(id, message) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerHTML = message;
    errorLabel.style.display = 'block';
}

function hideErrorMessage(id) {
    const errorLabel = document.getElementById(id);
    errorLabel.style.display = 'none';
}

function validateContact() {
    const nameValue = document.getElementById('newContactName').value;
    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

    const emailValue = document.getElementById('newContactEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneValue = document.getElementById('newContactPhone').value;
    const phoneRegex = /^\d{10,15}$/;

    let isValid = true;

    if (!nameRegex.test(nameValue)) {
        showErrorMessage('nameError', 'Please enter a valid name (first and last name).');
        isValid = false;
    } else {
        hideErrorMessage('nameError');
    }

    if (!emailRegex.test(emailValue)) {
        showErrorMessage('emailError', 'Please enter a valid email address.');
        isValid = false;
    } else {
        hideErrorMessage('emailError');
    }

    if (!phoneRegex.test(phoneValue)) {
        showErrorMessage('phoneError', 'Please enter a valid phone number (10-15 digits).');
        isValid = false;
    } else {
        hideErrorMessage('phoneError');
    }

    if (isValid) {
        createNewContact();
    }
}

//**************************************************************************************************************************************//

function editContact(i) {
    openEditContactForm(i);
}

function openEditContactForm(i) {
    const contact = contacts[i];
    const editContactContainer = document.querySelector('.edit-contact-container');
    const editContactSection = document.querySelector('.edit-contact-section');
    const profileOfContact = document.getElementById('profileofcontact');

    profileOfContact.innerHTML = `
    <div class="contact-info-initials" style="background-color: ${contact.profilecolor}">
        <p>${contact.Initials}</p>
    </div>
    `;

    // Fill in the fields with existing contact information
    document.getElementById('editContactName').value = contact.name + ' ' + contact.surname;
    document.getElementById('editContactEmail').value = contact.email;
    document.getElementById('editContactPhone').value = contact.phonenumber;

    // Display the edit contact form
    editContactSection.classList.remove('d-none');
    editContactContainer.classList.remove('d-none');
    setTimeout(function () {
        editContactContainer.classList.add('slide-in');
        editContactSection.classList.add('fade-in');
    }, 50);

    // Attach event listeners to close the edit contact form
    editContactContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    editContactSection.addEventListener('click', function () {
        closeEditContactForm();
    });

    // Save the index for updating the contact later
    editContactContainer.dataset.contactIndex = i;
}

function closeEditContactForm() {
    const editContactContainer = document.querySelector('.edit-contact-container');
    const editContactSection = document.querySelector('.edit-contact-section');
    editContactContainer.classList.remove('slide-in');
    editContactSection.classList.remove('fade-in');
    editContactContainer.classList.add('slide-out');
    editContactSection.classList.add('fade-out');
    setTimeout(function () {
        editContactContainer.classList.add('d-none');
        editContactContainer.classList.remove('slide-out');
        editContactSection.classList.remove('fade-out');
        editContactSection.classList.add('d-none');
    }, 500);
}

async function validateEditContact() {
    const editContactContainer = document.querySelector('.edit-contact-container');
    const i = editContactContainer.dataset.contactIndex;
    const contact = contacts[i];

    const nameValue = document.getElementById('editContactName').value;
    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

    const emailValue = document.getElementById('editContactEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneValue = document.getElementById('editContactPhone').value;
    const phoneRegex = /^\d{10,15}$/;

    let isValid = true;

    if (!nameRegex.test(nameValue)) {
        showErrorMessage('editNameError', 'Please enter a valid name (first and last name).');
        isValid = false;
    } else {
        hideErrorMessage('editNameError');
    }

    if (!emailRegex.test(emailValue)) {
        showErrorMessage('editEmailError', 'Please enter a valid email address.');
        isValid = false;
    } else {
        hideErrorMessage('editEmailError');
    }

    if (!phoneRegex.test(phoneValue)) {
        showErrorMessage('editPhoneError', 'Please enter a valid phone number (10-15 digits).');
        isValid = false;
    } else {
        hideErrorMessage('editPhoneError');
    }

    if (isValid) {
        contact.name = nameValue.split(' ')[0];
        contact.surname = nameValue.split(' ')[1];
        contact.email = emailValue;
        contact.phonenumber = phoneValue;
        showConfirmationPopup('editcontact');
        await saveContactstoBackend(contacts);
        closeEditContactForm();
        loadContacts();
        showContactInfo(i);
    }
}

async function deleteContact(i) {
    contacts.splice(i, 1);

    // Save updated contacts to the server
    await saveContactstoBackend(contacts);

    document.getElementById('contactinfo').innerHTML = '';
    closeDeletePopup();
    await loadContacts();
    showConfirmationPopup('deletecontact');
    hideContactInfo();
}

async function saveContactstoBackend(contacts) {
    // Convert the contacts array to a JSON string
    const contactsJson = JSON.stringify(contacts);

    // Save the contacts JSON to the backend
    await backend.setItem('contacts', contactsJson);
}


function deleteContactPopup(i) {
    const deleteChosenContact = contacts[i];
    document.getElementById('deletenotification').classList.remove('d-none');
    document.getElementById('deletenotification').innerHTML = /*html*/`
    <div class="delete-popup" onclick="doNotClose(event)">
        <div class="delete-texts">
            <h1 class="delete-popup-headline">Delete Contact</h1>
            <p class="delete-popup-text">Are you sure you want to delete</p>
            <p class="delete-contact-name" id="deleteContactName">${deleteChosenContact.name.charAt(0).toUpperCase() + deleteChosenContact.name.slice(1).toLowerCase()} ${deleteChosenContact.surname.charAt(0).toUpperCase() + deleteChosenContact.surname.slice(1).toLowerCase()}?</p>
            <div class="delete-contact-name-border"></div>
        </div>
        <div class="delete-btns">
            <div class="transparent-btn delete-cancel" onclick="closeDeletePopup()">
                <p>No</p>
            </div>
            <div class="dark-btn delete-confirmation" onclick="deleteContact(${i})">
                Yes
            </div>
        </div>
    </div>
    `;
    const deleteContactName = document.querySelector('.delete-contact-name');
    const deleteContactNameBorder = document.querySelector('.delete-contact-name-border');

    function updateBorderWidth() {
        const width = deleteContactName.offsetWidth + 10;
        deleteContactNameBorder.style.width = width + 'px';
    }

    updateBorderWidth();
    window.addEventListener('resize', updateBorderWidth);

    // Select elements
    const deleteNotification = document.getElementById('deletenotification');
    const deletePopup = deleteNotification.querySelector('.delete-popup');

    // Show popup
    deleteNotification.classList.add('visible');
    deleteNotification.classList.remove('d-none');
    deletePopup.classList.add('show');
}

function closeDeletePopup() {
    const deleteNotification = document.getElementById('deletenotification');
    const deletePopup = deleteNotification.querySelector('.delete-popup');

    deletePopup.classList.remove('show');
    deleteNotification.classList.remove('visible');
    setTimeout(() => {
        deleteNotification.classList.add('d-none');
    }, 300);
}

//************************** ADD TASK TO CONTACT***********************************/

function openAddTaskDialogBord(contactIndex) {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
    selectContact(contactIndex);
    renderAddTaskDialog(contactIndex);
}


function renderAddTaskDialog(contactIndex) {
    document.getElementById('add-task-contact-contentId').innerHTML = templateAddTaskContactDialog();
    renderContacts();
    renderCategory();
    renderSelectedContact(contactIndex);
}

function deleteAddTaskDialog() {
    document.getElementById('add-task-contact-contentId').innerHTML = "";
}

function selectContact(contactIndex) {
    document.querySelectorAll("input[type = 'checkbox'")[contactIndex];
    selectedContacts.push(contacts[contactIndex]['contactid']);
}

function addContactsToArray() {
    selectedContacts = [];
    let checkbox = document.querySelectorAll("input[type = 'checkbox'");

    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {
            selectedContacts.push(contacts[i]['contactid']);
        }
    }
}

function renderSelectedContact(contactIndex) {
    const selectedContact = contacts[contactIndex];
    const colorContainer = document.getElementById('inicial-circles');
    colorContainer.innerHTML = /*html*/ `
        <div class="color-circle-contact" style="background-color: ${selectedContact['profilecolor']}">
            ${selectedContact['Initials']}
        </div>
    `;
}


function renderContacts() {
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        contactContainer.innerHTML += /*html*/ `
        <div class="contact">
            <span>${contact['name']} ${contact['surname']}</span>
            <input onclick="addContactsToArray()" id="checkbox${i}" type="checkbox">
        </div>`
    }
}

function templateAddTaskContactDialog() {
    return /*html*/ `
        <h1 class="task-headline">Add Task</h1>
        <div class="task-container">
            <div class="task-left">
                <!-- tittle input -->
                <div class="input-container">
                    <label>Title</label>
                    <div class="input-field">
                        <input id="title" type="text" placeholder="Enter a title">
                    </div>
                    <p class="required" id="required0"></p>
                </div>
                <!-- description input -->
                <div class="input-container">
                    <label>Description</label>
                    <textarea class="textarea-field" id="description" rows="3"
                        placeholder="Enter a description"></textarea>
                    <p class=" required" id="required1"></p>
                </div>
                <!-- category input -->
                <div class="input-container">
                    <label>Category</label>
                    <div class="toggle-menu">
                        <div id="toggle-menu" class="select-task-category" onclick="toggleMenuCategory('toggle-1')">
                            <div id="selected-category">Select task category</div>
                            <img src=" ./img/triangle.svg">
                        </div>
                        <div id="category-input" class="input-field d-none">
                            <input id="category-input-field" type="text" placeholder="New category name">
                            <div id="add-input" class="add-input">
                                <div id="currentColor" class="color-circle"></div>
                                <img onclick="closeInputfield('toggle-menu')" class="x" src="./img/black-x.svg">
                                <img onclick="addNewCategorytoInput(), addedCategory(), renderCategory(), closeInputfield('toggle-menu')"
                                    src="./img/tick_dark.svg">
                            </div>
                        </div>
                        <div id="toggle-1" class="selection d-none">
                            <span class="category" onclick="openInputfield('toggle-1'), renderCategoryColors()">New
                                Category</span>
                            <div id="category-container"></div>
                        </div>
                    </div>
                    <div id="color-container" class="color-container"></div>
                    <p class="required" id="required2"></p>
                </div>
                <!-- contact input -->
                <div class="input-container">
                    <label>Assigned to</label>
                    <div class="toggle-menu">
                        <div class="assigned-to" onclick="toggleMenuContacts('toggle-2')">
                            <span>Select contact to assign</span>
                            <img src="./img/triangle.svg">
                        </div>
                        <div id="toggle-2" class="selection d-none">
                            <div id="contact-container"></div>
                        </div>
                    </div>
                    <div class="color-container-contact" id="inicial-circles"></div>
                    <p class="required" id="required3"></p>
                </div>
            </div>
            <div class="task-right">
                <!-- Date input -->
                <div class="input-container">
                    <label>Due date</label>
                    <div class="input-field due-date">
                        <input id="due-date" type="date" placeholder="dd/mm/yyyy" min="2023-03-15">
                    </div>
                    <p class="required" id="required4"></p>
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
                    <p class="required" id="required5"></p>
                </div>
                <!-- subtask input -->
                <div class="input-container">
                    <label>Subtasks</label>
                    <div class="input-field">
                        <input onclick="openSubtaskInput()" id="subtask-input" type="text"
                            placeholder="Add new subtask">
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
            <button onclick="resetForm()" class="transparent-btn clear-btn"><span>clear
                    x</span></button>
            <button onclick="createTaskForContactOnBoard()" type="submit" class="dark-btn create-btn">
                <span>Create Task</span>
                <img src="./img/tick_white.svg">
            </button>
        </div>
    `
}

async function createTaskForContactOnBoard() {
    resetRequired();
    if (checkRequired() == true) {
        await createTaskIntoJson();
        await saveTaskstoBackend();
        await saveCategorystoBackend();
        slideOutAddTaskDialogBord()
        showConfirmationPopup('createtask');
    }
    loadTasksfromBackend();
}