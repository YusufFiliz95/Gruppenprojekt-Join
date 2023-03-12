const contacts = [
    {
        'name': 'AMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com',
        'color': ''
    },
    {
        'name': 'BMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com'
    },
    {
        'name': 'FMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann1@hotmail.com'
    },
    {
        'name': 'HMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com'
    },
    {
        'name': 'KMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com'
    },
    {
        'name': 'JMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com'
    },
    {
        'name': 'OMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com'
    },
    {
        'name': 'CMax',
        'surname': 'Mustermann',
        'email': 'max.mustermann@hotmail.com'
    },
]


function loadContacts() {
    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    document.getElementById('contactlist').innerHTML = '';
    let currentChar = '';
    for (let i = 0; i < sortedContacts.length; i++) {
        const list = sortedContacts[i];
        const color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0'); //Generates random colors

        // Check if the first character of the name is different from the previous contact
        if (list.name.charAt(0) != currentChar) {
            currentChar = list.name.charAt(0);
            document.getElementById('contactlist').innerHTML += /*html*/ `
                <div class="contact-char">${currentChar}</div>
            `;
        }
        // Render the contact
        document.getElementById('contactlist').innerHTML += /*html*/ `
            <div class="contact" onclick="showContactInfo()">
                <div class="contact-initials" style="background-color: ${color}">
                    <p>${list.name.charAt(0)}</p>
                    <p>${list.surname.charAt(0)}</p>
                </div>
                <div class="contact-name-email">
                    <div class="contact-name">
                        <p>${list.name}</p>
                        <p>${list.surname}</p>
                    </div>
                    <div class="contact-email">
                        <p>${list.email}</p>
                    </div>
                </div>
            </div>
        `;
    }
}


