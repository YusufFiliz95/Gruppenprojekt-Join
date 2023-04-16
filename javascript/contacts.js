

//***********************************FUNCTION FOR LOAD THE LIST OF CONTACTS***********************************//

/**
 * This function loads contacts from the backend, sorts them alphabetically by name, and renders them
 * in a grouped format on the webpage.
 * @returns If the `contactListDiv` element is not found, the function will exit and return nothing.
 */
async function loadContacts() {
    await loadContactsfromBackend();
    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    const contactListDiv = document.getElementById('contactlist');
    if (!contactListDiv) {
        return; // Exit the function if the contactListDiv element is not found
    }
    contactListDiv.innerHTML = ''; // Clear the contactListDiv content
    renderContactListHeadline(contactListDiv);
    usedIds = new Set(contacts.map(contact => parseInt(contact.contactid)));
    if (contacts.length === 0) {
        renderNoContacts(contactListDiv);
    } else {
        document.getElementById('newcontactbtn').classList.remove('d-none');
        renderGroupedContacts(contactListDiv, sortedContacts); // Call the new function here
    }
}

/**
 * The function renders the headline for a contact list and initializes a set of used contact IDs.
 * @param contactListDiv - The parameter `contactListDiv` is a reference to a DOM element (usually a
 * `<div>` element) where the contact list headline will be rendered.
 */
function renderContactListHeadline(contactListDiv) {
    contactListDiv.innerHTML = /*html*/ `
    <div class="contactlist-info-headline">
        <h1>Contacts</h1>
        <div class="contactlist-border"></div>
        <p>Better with a team</p>
    </div>
`;
}

/**
 * The function renders a message and a button to add new contacts if there are no contacts in the
 * contact list.
 * @param contactListDiv - The HTML element where the list of contacts will be rendered.
 */
function renderNoContacts(contactListDiv) {
    document.getElementById('newcontactbtn').classList.add('d-none');
    contactListDiv.innerHTML += /*html*/`
    <div class="no-contacts">
        <p class="no-contacts-text">No contacts yet! Add some to brighten up your list and stay connected with your favorite people.</p>
        <div class="dark-btn new-contact none-responsive" onclick="newContact()" id="newcontactbtn">
            <p>New Contact</p>
            <img src="img/new_contact_icon.svg" alt="">
        </div>
    </div>
        `;
}

/**
 * The function renders a list of grouped contacts in alphabetical order with a header for each group.
 * @param contactListDiv - The HTML element where the grouped contacts will be rendered.
 * @param sortedContacts - an array of objects representing contacts, sorted alphabetically by name.
 * Each object has properties such as name, phone number, and email address.
 */
function renderGroupedContacts(contactListDiv, sortedContacts) {
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
        renderContactItem(contactListDiv, list, i);
    }
}


/**
 * The function renders a contact item with initials, name, and email in HTML format.
 * @param contactListDiv - The HTML element where the contact item will be rendered.
 * @param contact - An object representing a contact, with properties such as name, surname, email, and
 * contactid.
 * @param index - The index parameter is the index of the current contact item being rendered in the
 * contact list.
 */
function renderContactItem(contactListDiv, contact, index) {
    contactListDiv.innerHTML += /*html*/ `
    <div class="contacts" onclick="showContactInfo(${index})" id="${contact.contactid}">
        <div class="contact-initials" style="background-color: ${contact.profilecolor}">
            <p>${contact.Initials.toUpperCase()}</p>
        </div>
        <div class="contact-name-email">
            <div class="contact-name">
                <p>${maxNameSurnameChar(contact.name.charAt(0).toUpperCase() + contact.name.slice(1).toLowerCase(), contact.surname.charAt(0).toUpperCase() + contact.surname.slice(1).toLowerCase())}</p>
            </div>
            <div class="contact-email">
                <p>${maxEmailChar(contact.email)}</p>
            </div>
        </div>
    </div>
    `;
}


/**
 * The function limits the maximum length of an email address and adds ellipsis if necessary.
 * @param email - The email parameter is a string representing an email address.
 * @param [maxLength=28] - The maximum length that the email string can be before it is truncated. The
 * default value is 28 characters if no value is provided when the function is called.
 * @returns a modified version of the input email string. If the length of the email is less than or
 * equal to the maxLength parameter, the original email is returned. If the length of the email is
 * greater than maxLength, the function returns a truncated version of the email with an ellipsis (...)
 * added to the end.
 */
function maxEmailChar(email, maxLength = 28) {
    if (email.length <= maxLength) {
        return email;
    } else {
        return email.slice(0, maxLength - 3) + '...';
    }
}

/**
 * The function returns a combined name and surname string, truncated to a maximum length of 18
 * characters.
 * @param name - The first name of a person.
 * @param surname - The parameter "surname" is a string variable that represents the last name of a
 * person.
 * @param [maxLength=18] - The maximum length of the combined name and surname string. If the length of
 * the combined string is greater than maxLength, the function will truncate the surname and add
 * ellipsis to the end of the name. The default value of maxLength is 18.
 * @returns If the length of the combined name is less than or equal to the maxLength parameter, the
 * function will return the combined name. Otherwise, it will return the first 13 characters of the
 * name followed by ellipsis.
 */
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
/**
 * The function displays the contact information of a selected contact and highlights it in the list of
 * contacts.
 * @param i - The parameter "i" is an index that represents the position of a contact in an array of
 * contacts. It is used to access the specific contact information in the "contacts" array and to
 * highlight the selected contact in the user interface.
 */
function showContactInfo(i) {
    const contactinfo = contacts[i];
    const formattedName = contactinfo.name.charAt(0).toUpperCase() + contactinfo.name.slice(1).toLowerCase();
    const formattedSurname = contactinfo.surname.charAt(0).toUpperCase() + contactinfo.surname.slice(1).toLowerCase();
    const formattedEmail = contactinfo.email.toLowerCase();
    const showClickedContact = document.getElementById('contactinfo');
    document.querySelector('.contact-info-section').style.display = 'block';
    renderContactInfo(formattedName, formattedSurname, formattedEmail, showClickedContact, contactinfo, i);
    // Highlight a contact if its clicked
    const highlightContact = document.getElementsByClassName('contacts');
    for (let j = 0; j < highlightContact.length; j++) {
        highlightContact[j].classList.remove('selected-contact-info');
    }
    highlightContact[i].classList.add('selected-contact-info');
}

/**
 * The function renders contact information and options for editing and deleting a contact.
 * @param formattedName - A string containing the formatted first name of the contact.
 * @param formattedSurname - A string variable containing the formatted surname of the contact.
 * @param formattedEmail - A string variable that contains the formatted email address of the contact.
 * @param showClickedContact - This is a DOM element where the rendered contact information will be
 * displayed.
 * @param contactinfo - an object containing information about a contact, including their initials,
 * profile color, phone number, and email address
 * @param i - The index of the contact in the contacts array.
 */
function renderContactInfo(formattedName, formattedSurname, formattedEmail, showClickedContact, contactinfo, i) {
    showClickedContact.innerHTML = /*html*/`
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
}

/**
 * The function hides the contact information section if the window width is less than or equal to 1360
 * pixels.
 */
function hideContactInfo() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 1360) {
        document.querySelector('.contact-info-section').style.display = 'none';
    }
}

//**************************************************************************************************************************************//

//***********************************FUNCTION FOR NOT CLOSING THE FORMS CONTAINER IF ITS CLICKED***********************************//
function doNotClose(event) {
    event.stopPropagation();
}
//**************************************************************************************************************************************//

//***********************************FUNKTION FOR FOCUSING ON THE INPUT FIELD***********************************//
/**
 * The function focuses on the input field within a given container.
 * @param container - The container parameter is a reference to an HTML element that contains an input
 * field. The function uses this parameter to find the input field within the container and set focus
 * on it.
 */
function focusInputField(container) {
    const input = container.querySelector('input');
    input.focus();
}
//**************************************************************************************************************************************//

//***********************************FUNCTION FOR CLOSE THE ADD CONTACT FORM WITH ANIMATION***********************************//
/**
 * This function closes a form and hides any error messages associated with it.
 */
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
/**
 * The function clears the input fields of a form after it is closed.
 */
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
/**
 * This function creates a new contact object and saves it to the backend if the name and email input
 * values pass regex tests.
 */
async function createNewContact() {
    const newContactNameInput = document.getElementById('newContactName');
    const newContactEmailInput = document.getElementById('newContactEmail');

    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/; // Check if the name consists of two words.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Check if the email address is valid.

    if (nameRegex.test(newContactNameInput.value) && emailRegex.test(newContactEmailInput.value)) {
        await loadContactsfromBackend();
        const newContact = createNewContactObject();
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

/**
 * The function creates a new contact object with input values and generates a unique profile color and
 * initials.
 * @returns a new contact object with properties such as name, surname, email, profilecolor, Initials,
 * phonenumber, and contactid.
 */
function createNewContactObject() {
    const newContactNameInput = document.getElementById('newContactName');
    const newContactEmailInput = document.getElementById('newContactEmail');
    const newContactPhoneInput = document.getElementById('newContactPhone');
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
    return newContact;
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

//***********************************FUNCTION THAT CHECKS IF THE INPUT IS VALID***********************************//
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

/**
 * The function hides an error message by setting its display property to 'none'.
 * @param id - The parameter "id" is a string that represents the id attribute of an HTML element. This
 * function uses the id to select the element and hide it by setting its display property to "none".
 */
function hideErrorMessage(id) {
    const errorLabel = document.getElementById(id);
    errorLabel.style.display = 'none';
}

/**
 * Validates the new contact information entered by the user.
 * Displays error messages for invalid input and creates a new contact if all inputs are valid.
 */
function validateContact() {
    const nameValue = document.getElementById('newContactName').value;
    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

    const emailValue = document.getElementById('newContactEmail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneValue = document.getElementById('newContactPhone').value;
    const phoneRegex = /^\d{10,15}$/;

    let isValid = true;

    /**
     * Displays an error message if the name input is invalid, otherwise hides the error message.
     * @param {boolean} isValid - Whether or not the name input is valid.
     * @returns {boolean} isValid - Whether or not the name input is valid.
     */
    function validateName(isValid) {
        if (!nameRegex.test(nameValue)) {
            showErrorMessage('nameError', 'Please enter a valid name (first and last name).');
            isValid = false;
        } else {
            hideErrorMessage('nameError');
        }
        return isValid;
    }

    /**
     * Displays an error message if the email input is invalid, otherwise hides the error message.
     * @param {boolean} isValid - Whether or not the email input is valid.
     * @returns {boolean} isValid - Whether or not the email input is valid.
     */
    function validateEmail(isValid) {
        if (!emailRegex.test(emailValue)) {
            showErrorMessage('emailError', 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideErrorMessage('emailError');
        }
        return isValid;
    }

    /**
     * Displays an error message if the phone input is invalid, otherwise hides the error message.
     * @param {boolean} isValid - Whether or not the phone input is valid.
     * @returns {boolean} isValid - Whether or not the phone input is valid.
     */
    function validatePhone(isValid) {
        if (!phoneRegex.test(phoneValue)) {
            showErrorMessage('phoneError', 'Please enter a valid phone number (10-15 digits).');
            isValid = false;
        } else {
            hideErrorMessage('phoneError');
        }
        return isValid;
    }

    isValid = validateName(isValid);
    isValid = validateEmail(isValid);
    isValid = validatePhone(isValid);

    if (isValid) {
        createNewContact();
    }
}


//**************************************************************************************************************************************//

/**
 * The function "editContact" opens a form to edit a contact based on the index passed as a parameter.
 * @param i - The parameter "i" is likely an index or identifier for a specific contact that needs to
 * be edited. It is passed as an argument to the function "editContact", which then calls another
 * function "openEditContactForm" with the same argument. The purpose of this code is to allow the user
 */
function editContact(i) {
    openEditContactForm(i);
}

/**
 * This function opens an edit contact form and fills it with the details of a specific contact.
 * @param i - The index of the contact in the `contacts` array that needs to be edited.
 */
function openEditContactForm(i) {
    const contact = contacts[i];
    const editContactContainer = document.querySelector('.edit-contact-container');
    const editContactSection = document.querySelector('.edit-contact-section');
    const profileOfContact = document.getElementById('profileofcontact');
    profileOfContact.innerHTML = getProfileInitials(contact);
    fillInEditContactFormFields(contact);
    showEditContactForm(editContactContainer, editContactSection);
    attachEventListenersToCloseEditContactForm(editContactContainer, editContactSection);
    editContactContainer.dataset.contactIndex = i;
}

/**
 * The function returns a div element containing the initials of a contact and a background color based
 * on the contact's profile color.
 * @param contact - The parameter "contact" is an object that contains information about a contact,
 * such as their name, email, phone number, and profile color. The function is using the "contact"
 * object to retrieve the contact's initials and profile color, and then using that information to
 * generate HTML code for a contact
 * @returns A string of HTML code that creates a div element with a class of "contact-info-initials"
 * and a background color based on the "profilecolor" property of the "contact" object. Inside the div,
 * there is a paragraph element with the text content of the "Initials" property of the "contact"
 * object.
 */
function getProfileInitials(contact) {
    return `
        <div class="contact-info-initials" style="background-color: ${contact.profilecolor}">
            <p>${contact.Initials}</p>
        </div>
    `;
}

/**
 * The function fills in the fields of an edit contact form with the information from a given contact
 * object.
 * @param contact - The parameter "contact" is an object that contains information about a contact,
 * including their name, surname, email, and phone number.
 */
function fillInEditContactFormFields(contact) {
    document.getElementById('editContactName').value = contact.name + ' ' + contact.surname;
    document.getElementById('editContactEmail').value = contact.email;
    document.getElementById('editContactPhone').value = contact.phonenumber;
}

/**
 * The function shows an edit contact form by removing the 'd-none' class and adding animation classes.
 * @param editContactContainer - It is a variable that represents the container element that holds the
 * form for editing a contact.
 * @param editContactSection - It is a reference to a section element in the HTML document that
 * contains the form for editing a contact.
 */
function showEditContactForm(editContactContainer, editContactSection) {
    editContactSection.classList.remove('d-none');
    editContactContainer.classList.remove('d-none');
    setTimeout(function () {
        editContactContainer.classList.add('slide-in');
        editContactSection.classList.add('fade-in');
    }, 50);
}

/**
 * This function attaches event listeners to a close button and a section to close an edit contact
 * form.
 * @param editContactContainer - It is a DOM element that contains the form for editing a contact.
 * @param editContactSection - It is a reference to the HTML element that contains the form for editing
 * a contact.
 */
function attachEventListenersToCloseEditContactForm(editContactContainer, editContactSection) {
    editContactContainer.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    editContactSection.addEventListener('click', function () {
        closeEditContactForm();
    });
}

/**
 * The function closes an edit contact form by removing and adding CSS classes to hide the form with
 * animation effects.
 */
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

/**
 * This function validates and updates a contact's information, shows a confirmation popup, saves the
 * updated contacts to the backend, closes the edit contact form, reloads the contacts, and shows the
 * updated contact's information.
 */
async function validateEditContact() {
    const editContactContainer = document.querySelector('.edit-contact-container');
    const i = editContactContainer.dataset.contactIndex;
    const contact = contacts[i];

    const nameValue = document.getElementById('editContactName').value;
    const emailValue = document.getElementById('editContactEmail').value;
    const phoneValue = document.getElementById('editContactPhone').value;

    const isValidName = validateName(nameValue);
    const isValidEmail = validateEmail(emailValue);
    const isValidPhone = validatePhone(phoneValue);

    if (isValidName && isValidEmail && isValidPhone) {
        updateContact(contact, nameValue, emailValue, phoneValue);
        showConfirmationPopup('editcontact');
        await saveContactstoBackend(contacts);
        closeEditContactForm();
        loadContacts();
        showContactInfo(i);
    }
}

/**
 * The function validates if a given name value contains only first and last name using a regular
 * expression.
 * @param nameValue - The value of the name input field that needs to be validated.
 * @returns a boolean value (either true or false) depending on whether the nameValue parameter matches
 * the regular expression pattern defined in the nameRegex variable. If the nameValue is valid, the
 * function returns true, otherwise it returns false.
 */
function validateName(nameValue) {
    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
    if (!nameRegex.test(nameValue)) {
        showErrorMessage('editNameError', 'Please enter a valid name (first and last name).');
        return false;
    } else {
        hideErrorMessage('editNameError');
        return true;
    }
}

/**
 * The function validates if an email address is in a valid format using a regular expression.
 * @param emailValue - The email address that needs to be validated.
 * @returns a boolean value - either true or false. It returns true if the emailValue parameter matches
 * the emailRegex pattern and false if it does not.
 */
function validateEmail(emailValue) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
        showErrorMessage('editEmailError', 'Please enter a valid email address.');
        return false;
    } else {
        hideErrorMessage('editEmailError');
        return true;
    }
}

/**
 * The function validates if a phone number is valid based on a regular expression and returns a
 * boolean value.
 * @param phoneValue - The phone number value that needs to be validated.
 * @returns a boolean value (true or false) depending on whether the phoneValue parameter matches the
 * phoneRegex pattern or not. If it matches, the function returns true, otherwise it returns false.
 */
function validatePhone(phoneValue) {
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phoneValue)) {
        showErrorMessage('editPhoneError', 'Please enter a valid phone number (10-15 digits).');
        return false;
    } else {
        hideErrorMessage('editPhoneError');
        return true;
    }
}

/**
 * The function updates a contact object with new name, email, and phone number values.
 * @param contact - an object representing a contact with properties such as name, surname, email, and
 * phonenumber.
 * @param nameValue - A string value representing the full name of the contact, with the first name and
 * last name separated by a space.
 * @param emailValue - The email value parameter is a string that represents the email address of a
 * contact.
 * @param phoneValue - phoneValue is a parameter that represents the phone number value of a contact.
 * It is used in the function updateContact to update the phone number of a contact object.
 */
function updateContact(contact, nameValue, emailValue, phoneValue) {
    contact.name = nameValue.split(' ')[0];
    contact.surname = nameValue.split(' ')[1];
    contact.email = emailValue;
    contact.phonenumber = phoneValue;
}

/**
 * This function deletes a contact from an array, saves the updated array to a server, and then updates
 * the webpage with the new contact list.
 * @param i - The parameter "i" is the index of the contact to be deleted from the "contacts" array.
 */
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

/**
 * This function saves an array of contacts as a JSON string to the backend using the backend.setItem()
 * method.
 * @param contacts - The `contacts` parameter is an array of objects representing contact information.
 * Each object in the array should have properties such as name, email, phone number, etc.
 */
async function saveContactstoBackend(contacts) {
    // Convert the contacts array to a JSON string
    const contactsJson = JSON.stringify(contacts);

    // Save the contacts JSON to the backend
    await backend.setItem('contacts', contactsJson);
}


/**
 * This function displays a popup asking the user to confirm the deletion of a contact and handles the
 * user's response.
 * @param i - The index of the contact to be deleted from the "contacts" array.
 */
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

/**
 * The function opens a dialog box for adding a task and renders it with the selected contact's
 * information.
 * @param contactIndex - The parameter `contactIndex` is a variable that represents the index of a
 * contact in a list or array. It is used as an argument to select and render the details of a specific
 * contact in the `openAddTaskDialogBord` function.
 */
function openAddTaskDialogBord(contactIndex) {
    document.getElementById('overlay-bord-addTaskId').classList.remove('d-none');
    document.getElementById('bodyBordId').classList.add('overflow-dialog');
    selectContact(contactIndex);
    renderAddTaskDialog(contactIndex);
}

/**
 * This function renders an add task dialog with contact and category options, and selects a specific
 * contact if provided.
 * @param contactIndex - The parameter `contactIndex` is a variable that represents the index of the
 * selected contact in the list of contacts. It is used to render the selected contact in the add task
 * dialog.
 */
function renderAddTaskDialog(contactIndex) {
    document.getElementById('add-task-contact-contentId').innerHTML = templateAddTaskContactDialog();
    renderContacts();
    renderCategory();
    renderSelectedContact(contactIndex);
}

/**
 * The function deletes the content of an HTML element with the ID 'add-task-contact-contentId'.
 */
function deleteAddTaskDialog() {
    document.getElementById('add-task-contact-contentId').innerHTML = "";
}

/**
 * The function selects a contact by its index and adds its ID to an array.
 * @param contactIndex - The index of the contact in the "contacts" array that is being selected.
 */
function selectContact(contactIndex) {
    document.querySelectorAll("input[type = 'checkbox'")[contactIndex];
    selectedContacts.push(contacts[contactIndex]['contactid']);
}

/**
 * The function adds selected contacts' IDs to an array.
 */
function addContactsToArray() {
    selectedContacts = [];
    let checkbox = document.querySelectorAll("input[type = 'checkbox'");

    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked == true) {
            selectedContacts.push(contacts[i]['contactid']);
        }
    }
}

/**
 * The function renders a selected contact's profile color and initials in a color circle container.
 * @param contactIndex - The index of the selected contact in the `contacts` array.
 */
function renderSelectedContact(contactIndex) {
    const selectedContact = contacts[contactIndex];
    const colorContainer = document.getElementById('inicial-circles');
    colorContainer.innerHTML = /*html*/ `
        <div class="color-circle-contact" style="background-color: ${selectedContact['profilecolor']}">
            ${selectedContact['Initials']}
        </div>
    `;
}


/**
 * The function renders a list of contacts with checkboxes.
 */
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

/**
 * This function returns a template for an HTML form to add a task with various input fields and
 * buttons.
 * @returns A HTML template for a dialog box to add a task, including input fields for title,
 * description, category, assigned contact, due date, priority, and subtasks, as well as buttons to
 * clear the form and create the task.
 */
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

/**
 * This function creates a task for a contact on a board and saves it to the backend.
 */
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