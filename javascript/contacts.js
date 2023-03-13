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
    <div class="contact-info-initials-name">
        <div class="contact-info-initials" style="background-color: ${contactinfo.profilecolor}">
            <p>${contactinfo.name.charAt(0).toUpperCase()}</p>
            <p>${contactinfo.surname.charAt(0).toUpperCase()}</p>
        </div>
        <div>
            
        </div>
    </div>
    `;
}

/**
 *   const color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0'); //Generates random colors
 * 
 */