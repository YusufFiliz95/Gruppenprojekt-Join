const menuTemplate = [
    {
        'id': '1',
        'menuselection': '../summary.html',
        'menuicon': '../img/summary_icon.svg',
        'menuname': 'Summary'
    },

    {
        'id': '2',
        'menuselection': '../board.html',
        'menuicon': '../img/board_icon.svg',
        'menuname': 'Board'
    },

    {
        'id': '3',
        'menuselection': '../add_task.html',
        'menuicon': '../img/add_task_icon.svg',
        'menuname': 'Add Task'
    },

    {
        'id': '4',
        'menuselection': '../contacts.html',
        'menuicon': '../img/contacts_icon.svg',
        'menuname': 'Contacts'
    },

    {
        'id': '5',
        'menuselection': '../legal_notice.html',
        'menuicon': '../img/legal_notice_icon.svg',
        'menuname': 'Legal notice'
    },
];

function loadMenu() {
    document.getElementById('joinmenuselection').innerHTML = '';
    for (let i = 0; i < 4; i++) {
        const joinMenu = menuTemplate[i];
        document.getElementById('joinmenuselection').innerHTML += /*html*/`
            <div class="menu-icon-text" onclick="window.location.href = '${joinMenu.menuselection}'" id='${joinMenu.id}'>
                <div class="icon">
                    <img src=${joinMenu.menuicon} alt="">
                </div>
                <div class="text">
                    <p>${joinMenu.menuname}</p>
                </div>
            </div>
        `;
    }
    
}

function setSelectedMenu() {
    document.getElementById(selectedMenu).classList.add('clicked');
}



