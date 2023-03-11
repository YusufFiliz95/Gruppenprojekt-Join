const menuTemplate = [
    {
        'id': 'summary',
        'menuselection': '../summary.html',
        'menuicon': '../img/summary_icon.svg',
        'menuname': 'Summary'
    },

    {
        'id': 'board',
        'menuselection': '../board.html',
        'menuicon': '../img/board_icon.svg',
        'menuname': 'Board'
    },

    {
        'id': 'task',
        'menuselection': '../add_task.html',
        'menuicon': '../img/add_task_icon.svg',
        'menuname': 'Add Task'
    },

    {
        'id': 'contacts',
        'menuselection': '../contacts.html',
        'menuicon': '../img/contacts_icon.svg',
        'menuname': 'Contacts'
    },

    {
        'id': 'legalnotice',
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



