
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');


const STORAGE_KEY = 'todo-tasks';


let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];


function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');

        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));

        
        const span = document.createElement('span');
        span.className = 'task-name';
        span.textContent = task.text;

        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '❌';
        removeBtn.title = 'Remove task';
        removeBtn.addEventListener('click', () => removeTask(index));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    });
}


function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}


function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }
}


function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}


function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}


addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});


renderTasks(); 