document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let Tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    Tasks.forEach(task => displayTasks(task));

    addTaskBtn.addEventListener("click", () => {
        if (todoInput.value === '') return;

        const newTask = {
            id: Date.now(),
            text: todoInput.value,
            completed: false,
        }

        Tasks.push(newTask);
        todoInput.value = '';
        saveTasks();
        displayTasks(newTask);
    })


    function displayTasks(task) {

        const li = document.createElement("li");
        li.setAttribute('data-id', task.id)
        li.innerHTML =
        `<span> ${task.text} </span>
        <button class="btn">delete</button> 
        `
        li.querySelector("button").classList.add("btn")
        
        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();

            Tasks = Tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();

        })

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(Tasks));
    }

})