/**
 * this function reset the complete form
 */
function resetForm() {
    resetRequired();
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('selected-category').innerHTML = 'Select task category';
    document.getElementById('inicial-circles').innerHTML = '';
    resetCheckbox();
    document.getElementById('due-date').value = '';
    addPrio(0);
    document.getElementById('subtasks-container').innerHTML = '';
}


/**
 * This function is used to create a task into a Json, save task and category to the Backend and leads to the board.
 */
async function createTask() {
    resetRequired();
    if (checkRequired() == true) {
        await createTaskIntoJson();
        await saveTaskstoBackend();
        await saveCategorystoBackend();
        showConfirmationPopup('createtask');
        goToBoard();
    }
}


/**
 * 
 * This function is used to create a task into a Json
 */
async function createTaskIntoJson() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('due-date').value;
    let task = {
        'id': tasks.length,
        'title': title,
        'description': description,
        'category': selectedCategoryName,
        'category-color': selectedCategoryColor,
        'contacts': selectedContacts,
        'date': dueDate,
        'prio': prio,
        'subtasks': subtasks,
        'subtasks-value': subtaskValue,
        'status': 'toDo'
    }
    tasks.push(task);
}

/**
 * This function is used to go to the board, if the task is create
 */
function goToBoard() {
    setTimeout(function () {
        window.location.href = "board.html";
    }, 2000)
}

/**
 * This function checked the validation of all form fields
 * @returns validatrion = true
 */
function checkRequired() {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    let dueDate = document.getElementById('due-date').value;
    let selectedCategory = document.getElementById('selected-category');
    let allData = [title, desc, selectedCategory, selectedContacts, dueDate,]
    let validation = true;
    for (let i = 0; i < allData.length; i++) {
        input = allData[i];
        if (input == '') {
            document.getElementById(`required${i}`).innerText += "This field is required";
            validation = false;
        }
    }
    checkprioRequired(validation);
    return validation;
}

/**
 * This fuction checked the validartion of the prio buttons
 * @param {boolean} validation - true form is valid
 * @returns false if the prio buttons are not valid
 */
function checkprioRequired(validation) {
    if (prio == 0) {
        document.getElementById(`required5`).innerText += "A priority button is required";
        return validation = false;
    }
}

/**
 * This function is used to reset the required alert
 */
function resetRequired() {
    for (let i = 0; i <= 5; i++) {
        document.getElementById(`required${i}`).innerText = "";

    }
}
