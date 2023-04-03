let input = document.getElementById("subtask-input");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("enter-button").click();
    }
});

