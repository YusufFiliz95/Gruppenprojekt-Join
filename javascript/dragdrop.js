/* ---------------------Drag and Drop-------------------------  */

function startDragging(id) {
    currentDraggedElement = id;
    rotateCardByDragging(id);
    document
}

function allowDrop(ev, id) {
    ev.preventDefault();
    onDropOverBorder(id);
}

function onDragLeave(id) {
    document.getElementById(id).classList.remove('ondroped');
}

function onDropOverBorder(id) {
    document.getElementById(id).classList.add('ondroped');
}

function onDropEnd(status) {
    id = status + 'Id';
    document.getElementById(id).classList.remove('ondroped');
}

async function moveTo(status) {
    let searchFieldId;
    tasks[currentDraggedElement].status = status;
    await saveTaskstoBackend();
    let inputSearchingField1 = document.getElementById('input-searchingId1').value;
    let inputSearchingField2 = document.getElementById('input-searchingId2').value;
    if (inputSearchingField1.length >= 1) searchFieldId = 1;
    if (inputSearchingField2.length >= 1) searchFieldId = 2;
    if (inputSearchingField1 == '' && inputSearchingField1 == '') await loadAllDataForTheBord();
    else filterTasksBySearching(searchFieldId);
    onDropEnd(status);
}

function rotateCardByDragging(id) {
    document.getElementById('card' + id).classList.add('rotate-card');
}

function endDragging(id) {
    rotateCardBack(id);
}

function rotateCardBack(id) {
    document.getElementById('card' + id).classList.remove('rotate-card');
}

function checkWindowInnerScreenForDragAndDrog() {
    if (window.innerWidth > 1280) {
        for (let i = 0; i < cardAmounts.length; i++) {
            id = cardAmounts[i];
            document.getElementById('card' + id).draggable = true;
            setMinHeightByScreenSizing('200px');
        }
    } else {
        for (let i = 0; i < cardAmounts.length; i++) {
            id = cardAmounts[i];
            document.getElementById('card' + id).draggable = false;
            setMinHeightByScreenSizing('0px');
        }
    }
}

function setMinHeightByScreenSizing(size) {
    document.getElementById('toDoId').style.minHeight = size;
    document.getElementById('toProgressId').style.minHeight = size;
    document.getElementById('awaitingFeedbackId').style.minHeight = size;
    document.getElementById('doneId').style.minHeight = size;
}