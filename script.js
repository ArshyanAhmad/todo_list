document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let Tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    Tasks.forEach(task => displayTasks(task));

    addTaskBtn.addEventListener("click", () => {
        if (todoInput.value === '') return;

        const newTask = {
            id: new Date(Date.now()),
            text: todoInput.value,
            completed: false,
        }

        Tasks.push(newTask);
        todoInput.value = '';
        saveTasks();
        displayTasks(newTask);
    })


    function displayTasks(task) {
        console.log(task);
        
        const li = document.createElement("li");
        li.setAttribute('data-id', task.id)
        li.innerHTML =
            `<span> ${task.text} </span>
            <button>delete</button> 
            `

        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            // const allTasks = JSON.parse(localStorage.getItem("tasks"));
            const deletedId = Number.parseInt(li.getAttribute('data-id'));

            // allTasks.forEach(e => {

            //     if(e.id == deletedId){
            //         localStorage.removeItem(deletedId);
            //     }

            // });

            Tasks = Tasks.filter(t => t.id !== deletedId);
            saveTasks();

        })

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(Tasks));
        console.log(Tasks);
    }

})