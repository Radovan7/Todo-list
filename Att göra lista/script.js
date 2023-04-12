let bindTaskEvents = function(taskListItem, confirmEventHandler) {
    let editButton = taskListItem.querySelector("button.edit");
    let confirmButton = taskListItem.querySelector("button.confirm");
    let deleteButton = taskListItem.querySelector("button.delete");
    editButton.onclick = editTask;
    confirmButton.onclick = confirmEventHandler;
    deleteButton.onclick = deleteTask;
}

let editTask = function() {
    let listItem = this.parentNode;
    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");
    let button = listItem.querySelector("button");
    let containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
        button.innerText = "Ändra";
    } else {
        editInput.value = label.innerText;
        button.innerText = "Spara";
    }
    listItem.classList.toggle("editMode");
}

let deleteTask = function() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

let taskCompleted = function() {
    let listItem = this.parentNode;
    let confirmButton = listItem.querySelector("button.confirm");
    listItem.removeChild(confirmButton);
    completedTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function() {
    let listItem = this.parentNode;
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

let clear = function() {
    incompleteTasks.innerHTML = "";
    completedTasks.innerHTML = "";
}

let taskInput = document.getElementById("new-task");
let addButton = document.getElementById("add-button");
let incompleteTasks = document.getElementById("incomplete-tasks");
let completedTasks = document.getElementById("completed-tasks");
let clearButton = document.getElementById("clear");
let createNewTask = function(taskName) {
    let listItem = document.createElement("li");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let confirmButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    editInput.type = "text";
    editButton.innerText = "Ändra";
    editButton.className = "edit";
    confirmButton.innerText = "Färdig";
    confirmButton.className = "confirm";
    deleteButton.innerText = "Radera";
    deleteButton.className = "delete";
    label.innerText = taskName;
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(confirmButton);
    listItem.appendChild(deleteButton);

    return listItem;
}
let addTask = function() {
    if (taskInput.value == "") {
        let errorMessageDiv = document.querySelector("div#error-message");
        errorMessageDiv.innerText = "Får ej skapa tomma sysslor";
        return;
    }
    let listItem = createNewTask(taskInput.value);
    incompleteTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

addButton.addEventListener("click", addTask);
clearButton.addEventListener('click', clear);
let removeErrorMessage = function(){
    let errorMessageDiv = document.querySelector("div#error-message");
        errorMessageDiv.innerText = "";

}
taskInput.addEventListener("keydown", removeErrorMessage);
let clearTextBtn = document.querySelector("button#clear-text");
let clearTextFn = function(){
    taskInput.value = "";  
}

clearTextBtn.addEventListener("click", clearTextFn);

