
let date1 = new Date("10/23/2015");
let date2 = new Date("2022.03.24");
let date3 = new Date("2022.03.23");


dates = [date1, date2, date3];

filter = Math.min.apply(null, dates);
filterDate = new Date(filter);

function loadSummaryContent() {
    calcAmountTasksOnBoard();
    calcAmountTasksInProgress();
    calcAwaitingFeedbackTasksInProgress();
    calcPrioUrgent();
    calcAmountTasksInToDo();
    calcAmountTasksInDone();
    getRightGreeting();
    getUpcomingDeadline();
}

function calcAmountTasksOnBoard() {
    let amountTasks = tasks.length;
    document.getElementById('tasksId').innerHTML = amountTasks;
}

function calcAmountTasksInProgress() {
    let amountInProgress = 0;

    for (let i = 0; i < tasks.length; i++) {
        let status = tasks[i].status;
        if (status == 'toProgress') amountInProgress++;
    }
    document.getElementById('toProgressId').innerHTML = amountInProgress;
}

function calcAwaitingFeedbackTasksInProgress() {
    let amountAwaitingFeedbacks = 0;

    for (let i = 0; i < tasks.length; i++) {
        let status = tasks[i].status;
        if (status == 'awaitingFeedback') amountAwaitingFeedbacks++;
    }
    document.getElementById('awaitingFeedbackId').innerHTML = amountAwaitingFeedbacks;
}

function calcPrioUrgent() {
    let amountUrgents = 0;

    for (let i = 0; i < tasks.length; i++) {
        let status = tasks[i].prio;
        if (status == 1) amountUrgents++;
    }
    document.getElementById('urgentsId').innerHTML = amountUrgents;
}

function calcAmountTasksInToDo() {
    let amountToDoes = 0;

    for (let i = 0; i < tasks.length; i++) {
        let status = tasks[i].status;
        if (status == 'toDo') amountToDoes++;
    }
    document.getElementById('toDoId').innerHTML = amountToDoes;
}

function calcAmountTasksInDone() {
    let amountDone = 0;

    for (let i = 0; i < tasks.length; i++) {
        let status = tasks[i].status;
        if (status == 'done') amountDone++;
    }
    document.getElementById('doneId').innerHTML = amountDone;
}

function getRightGreeting() {
    let greetingField = document.getElementById('greetingId');
    let day = new Date();
    let hr = day.getHours();
    if (hr >= 0 && hr < 12) {
        greetingField.innerHTML = ("Good morning,");
    } else if (hr == 12) {
        greetingField.innerHTML = ("Good noon,");
    } else if (hr >= 12 && hr <= 17) {
        greetingField.innerHTML = ("Good afternoon,");
    } else {
        greetingField.innerHTML = ("Good evening,");
    }
}

function getUpcomingDeadline() {
    let dates = [];
    for (let i = 0; i < tasks.length; i++) {
        let prio = tasks[i].prio;
        if (prio == 1) {
            let date = tasks[i].date;
            date = date.replace(/./gi, '/');
            console.log(date);
            date = new Date(date);
            dates.push(date);
        }
    }
    console.log(dates);
    /* filterUrgentDates(dates); */

}

function filterUrgentDates(dates) {
    upcomingDate = Math.min.apply(null, dates);

    console.log(upcomingDate);

}


