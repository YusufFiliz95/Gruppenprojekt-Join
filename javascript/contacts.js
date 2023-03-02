
let letters = [];

async function contactInit() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    letters = JSON.parse(backend.getItem('letters')) || [];
    activeUser = backend.getItem('activeUser') || 0;
    loadHeader();
    loadLetters();
    renderLetters();
    renderContactList();
    navBarHighlight(4);
}


function loadLetters() {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        let name = users[activeUser]['contacts'][i]['contactName'];
        let firstLetter = name.charAt(0);
        if (!letters.includes(firstLetter)) {
            letters.push(firstLetter);
            letters.sort();
        }
    }
}

// display the box to create a new contact
function showContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'block';
    document.getElementById('newContactBoxBckgr').style.display = 'flex';
    document.getElementById('newContactBox').classList.add('animation');
}


// Add names, emailAdress, phoneNumber into InputFields and create JSON
async function addContact() {
    let color = getRandomColor();
    let contact = {
        'contactName': document.getElementById('input1').value,
        'contactEmail': document.getElementById('input2').value,
        'contactPhone': document.getElementById('input3').value,
        'contactColor': color,
        'contactInitials': getFirstLetters(document.getElementById('input1').value),
    };
    pushLetterToArray(contact.contactName.charAt(0));
    users[activeUser].contacts.push(contact);
    sortNamesAndCreateLetters();
    saveUsersAndLetters(users, letters);
    lastStepsBeforeContactCreate();
}


function pushLetterToArray(firstLetter) {
    if (!letters.includes(firstLetter)) {
        letters.push(firstLetter);
        letters.sort();
    }
}


function sortNamesAndCreateLetters() {
    sortNames();
    createLetters();
}


// Sort the names alphabeticaly
function sortNames() {
    users[activeUser]['contacts'] = users[activeUser]['contacts'].sort((a, b) => {
        if (a.contactName < b.contactName) {
            return -1;
        }
    });
}


// to create the letter headlines
function createLetters() {
    let contact = document.getElementById('contactList');
    contact.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        let firstLetter = letters[i];
        contact.innerHTML += contactLetterHeadline(firstLetter);
    }
    createContact();
}


async function saveUsersAndLetters(users, letters) {
    await backend.setItem('users', JSON.stringify(users));
    await backend.setItem('letters', JSON.stringify(letters));
}


// Create contact from the inputFields and show at the contactlist
function createContact() {
    for (let i = 0; i < users[activeUser]['contacts'].length; i++) {
        let name = users[activeUser]['contacts'][i]['contactName'];
        let email = users[activeUser]['contacts'][i]['contactEmail'];
        let letter = users[activeUser]['contacts'][i]['contactInitials'];
        let color = users[activeUser]['contacts'][i]['contactColor'];
        let firstLetter = name.charAt(0);
        createBigSection(name, email, letter, color, firstLetter, i);
    }
}


// to display the contactlist in alphabeticaly order with the letter headlines
// and show the letter headlines only once
function createBigSection(name, email, letter, color, firstLetter, i) {
    let contactList = document.getElementById(`contactLetter-${firstLetter}`);
    if (!contactList) {
        contactList = document.createElement('div');
        contactList.id = `contactLetter-${firstLetter}`;
        document.getElementById('contactList').appendChild(contactList);
    }
    if (!firstLetter || firstLetter == firstLetter) {
        let contactDiv = showContactDiv(name, email, letter, color, i);
        contactList.innerHTML += contactDiv;
    }
}


function lastStepsBeforeContactCreate() {
    emptyInputFields();
    closeContactBox();
    showContactBtn();
}


// empty the inputFields from the contact box
function emptyInputFields() {
    let input1 = document.getElementById('input1');
    let input2 = document.getElementById('input2');
    let input3 = document.getElementById('input3');
    input1.value = '';
    input2.value = '';
    input3.value = '';
}


// close the contactBox on purpose or after creation of new contant
function closeContactBox() {
    document.getElementById('newContactBoxBckgr').style.display = 'none';
}


// Show the Button after a contact is created
function showContactBtn() {
    document.getElementById('contactCreated').style.display = 'block';
    setTimeout(closeContactBtn, 800);
}


// Hide the Button after showContactBtn()
function closeContactBtn() {
    document.getElementById('contactCreated').style.display = 'none';
}

// Templates von contact.js
function contactLetterHeadline(firstChar) {
    return `<div id="contactLetter-${firstChar}" class="letter">
                <p class="letterP">${firstChar}</p>
                <div class="letterUnderline"></div>
            </div>`;
}


function showContactDiv(name, email, str, color, i) {
    return `<div id="contactDiv${i}" onclick="showContact(${i});" class="contactDiv hover">
                    <div id="contactLetter${i}" style="background-color: ${color}" class="contactLetter">
                        ${str}
                    </div>
                <div class="contactName">
                    <p class="name">${name}</p>
                    <p class="email">${email}</p>
                </div>
            </div>`;
}


function showBigConactDiv(str, name, email, phone, i, color) {
    return `<div id="contactBox${i}" class="contactBox d-none">
                <div class="contact">
                    <p style="background-color: ${color}" class="contactP">${str}</p>
                    <div class="contactNameRight">
                        <p class="contactNameRightP">${name}</p>
                        <a href="./add_task.html"><div class="addTaskBox">
                            <img src="./asseds/img/blueplus.png">
                            <p class="addTask">Add Task</p>
                        </div></a>
                    </div>
                </div>

                <div class="contactInfo">
                    <p class="contactInfoP">Contact Information</p>
                    <div onclick="showEditContactBox(${i})" class="contactInfoEdit">
                        <img src="./asseds/img/pencil.png">
                        <p class="contactInfoEditP">Edit Contact</p>
                    </div>
                </div>

                <div class="phoneMailBox">
                    <div class="mail">
                        <p class="mailP">Email</p>
                        <p class="mailAdress">${email}</p>
                    </div>
                    <div class="mail">
                        <p class="mailP">Phone</p>
                        <p class="phoneNumber">${phone}</p>
                    </div>
                </div>
            </div>
            <div onclick="showEditContactBox(${i})" class="editMobileBox d-none">
                <img src="./asseds/img/whitePencil.png">
            </div>`;
}

