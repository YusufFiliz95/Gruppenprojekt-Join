const menuTemplate = [    
    {        
    'menuselection': '../summary.html',        
    'menuicon': '../img/summary_icon.svg',        
    'menuname': 'Summary'
    },    
    
    {        
    'menuselection': '../board.html',        
    'menuicon': '../img/board_icon.svg',        
    'menuname': 'Board'
    },    
    
    {
    'menuselection': '../add_task.html',        
    'menuicon': '../img/add_task_icon.svg',        
    'menuname': 'Add Task'
    },    
    
    {
    'menuselection': '../contacts.html',        
    'menuicon': '../img/contacts_icon.svg',        
    'menuname': 'Contacts'    
    },    
    
];

function loadMenu() {
    document.getElementById('joinmenuselection').innerHTML = '';
    for (let i = 0; i < menuTemplate.length; i++) {
        const joinMenu = menuTemplate[i];
        document.getElementById('joinmenuselection').innerHTML += /*html*/`
            <div class="menu-icon-text" onclick="window.location.href = '${joinMenu.menuselection}'">
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
