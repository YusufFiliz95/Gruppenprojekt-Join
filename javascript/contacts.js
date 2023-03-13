let contacts = [
    {
        'name': 'AMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#e04f3f',
        'phonenumber': '012345789'
    },
    {
        'name': 'AMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#e04f3f',
        'phonenumber': '012345789'
    },
    {
        'name': 'AMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#e04f3f',
        'phonenumber': '012345789'
    },
    {
        'name': 'BMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#564eab',
        'phonenumber': '012345789'
    },
    {
        'name': 'BMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#564eab',
        'phonenumber': '012345789'
    },
    {
        'name': 'BMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#564eab',
        'phonenumber': '012345789'
    },
    {
        'name': 'CMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#239177',
        'phonenumber': '012345789'
    },
    {
        'name': 'CMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#239177',
        'phonenumber': '012345789'
    },
    {
        'name': 'CMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#239177',
        'phonenumber': '012345789'
    },
    {
        'name': 'DMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#b983c5',
        'phonenumber': '012345789'
    },
    {
        'name': 'DMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#b983c5',
        'phonenumber': '012345789'
    },
    {
        'name': 'DMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'profilecolor': '#b983c5',
        'phonenumber': '012345789'
    },
]


function loadContacts() {
    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    document.getElementById('contactlist').innerHTML = '';
    let currentChar = '';
    for (let i = 0; i < sortedContacts.length; i++) {
        const list = sortedContacts[i];
        // Check if the first character of the name is different from the previous contact
        if (list.name.charAt(0) != currentChar) {
            currentChar = list.name.charAt(0);
            document.getElementById('contactlist').innerHTML += /*html*/ `
                <div class="contact-char"><p>${currentChar.charAt(0).toUpperCase()}</p></div>
            `;
        }
        // Render the contact
        document.getElementById('contactlist').innerHTML += /*html*/ `
            <div class="contact" onclick="showContactInfo(${i})">
                <div class="contact-initials" style="background-color: ${list.profilecolor}">
                    <p>${list.name.charAt(0).toUpperCase()}</p>
                    <p>${list.surname.charAt(0).toUpperCase()}</p>
                </div>
                <div class="contact-name-email">
                <div class="contact-name">
                    <p>${list.name.charAt(0).toUpperCase() + list.name.slice(1).toLowerCase()}</p>
                    <p>${list.surname.charAt(0).toUpperCase() + list.surname.slice(1).toLowerCase()}</p>
                </div>
                    <div class="contact-email">
                        <p>${list.email}</p>
                    </div>
                </div>
            </div>
        `;
    }
}


function showContactInfo(i) {
    const contactinfo = contacts[i];
    const showClickedContact = document.getElementById('contactinfo');
    showClickedContact.innerHTML = /*html*/`
    <div class="contact-info-initials-name-add-task">
        <div class="contact-info-initials" style="background-color: ${contactinfo.profilecolor}">
            <p>${contactinfo.name.charAt(0).toUpperCase()}</p>
            <p>${contactinfo.surname.charAt(0).toUpperCase()}</p>
        </div>
        <div class="contact-info-name-add-task">
            <p class="contact-info-name">${contactinfo.name} ${contactinfo.surname}</p>
            <div class="contact-info-add-task">
                <img src="img/add_task_for_contact.svg" alt="">
                <p>Add Task</p>
            </div>
        </div>
    </div>
    <div class="contact-information-edit-contact">
        <div class="contact-information">
            <p>Contact Information</p>
        </div>
        <div class="edit-contact">
            <img src="img/edit_contact_icon.svg" alt="">
            <p>Edit Contact</p>
        </div>
    </div>
    <div class="contact-info-email-phone">
        <div class="contact-info-email">
            <p class="weight-1000">Email</p>
            <p class="contact-info-email-underline">${contactinfo.email}</p>
        </div>
        <div class="contact-info-phone">
            <p class="weight-1000">Phone</p>
            <p>${contactinfo.phonenumber}</p>
        </div>
    </div>
    `;
}

/**
 *   const color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0'); //Generates random colors
 * 
 */