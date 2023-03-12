let selectedMenu;

//FUNCTION FOR LOADING OTHER FUNCTIONS
async function init(i) {
    await includeHTML();
    selectMenuPoint(i);
    setSelectedMenu();

    //setURL('https://gruppenarbeit-join-475.developerakademie.net/smallest_backend_ever');
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
    document.getElementById(selectedMenu).classList.add('clicked');
}

