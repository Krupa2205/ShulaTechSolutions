const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
    saveTasks();

    taskInput.value = "";
}

function createTaskElement(taskText) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed", checkbox.checked);
        saveTasks();
    });

    let span = document.createElement("span");
    span.textContent = taskText;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach((task) => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector("input").checked,
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        let taskItem = createTaskElement(task.text);
        taskItem.querySelector("input").checked = task.completed;
        if (task.completed) taskItem.classList.add("completed");
        taskList.appendChild(taskItem);
    });
}
