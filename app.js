const showForm = document.querySelector('#showForm');
const taskForm = document.querySelector('#taskForm');
const taskList = document.querySelector('#taskList');
const btnCloseForm = document.querySelector("#closeForm");

document.addEventListener("DOMContentLoaded", () => { // When the DOM is loaded, check if there are tasks in localStorage
  if (localStorage.getItem('tasks')) {
    showTasks();
  }
})

showForm.addEventListener('click', () => { // Show the task form when the button is clicked
  taskForm.style.display = 'block';
});

taskForm.addEventListener('submit', saveTask);

btnCloseForm.addEventListener("click", () => { // Hide the task form when the button is clicked
    taskForm.style.display = "none";
});

function saveTask(event){ // Function to save a new task
    event.preventDefault();

    const taskName = document.querySelector('#taskInput').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDueDate = document.querySelector('#taskDate').value;
    const taskPriority = document.querySelector('#taskPriority').value;

    const newTask = {  // Create a new task object
      // Using Date.now() to generate a unique ID for the task
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
      completed: false
    }

    let arrayTasks;

    if (localStorage.getItem('tasks')){ // Check if there are existing tasks in localStorage
      arrayTasks = JSON.parse(localStorage.getItem('tasks'));
    }
    else{
      arrayTasks = [];
    } 
    
    arrayTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(arrayTasks));
    taskForm.reset();
    taskForm.style.display = 'none';
    showTasks();
}

function showTasks() { // Function to display tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  taskList.innerHTML = '';

  if (tasks) {
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="task ${task.completed ? 'completed' : ''} priority-${task.priority}">
          <div class="task-header">
            <span class="task-title">${task.name}</span>
            <span class="task-priority">${task.priority}</span>
          </div>
          ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
          <div class="task-details">${task.dueDate ? `Fecha: ${task.dueDate}` : ''}</div>
          <div class="task-actions">
            <button class="btn-delete" data-id="${task.id}">Eliminar</button>
            <button class="btn-complete" data-id="${task.id}">${task.completed ? 'Desmarcar' : 'Completar'}</button>
            <button class="btn-edit" data-id="${task.id}">Editar</button>
          </div>
        </div>
      `;
      // Ajoute la classe d'animation à la dernière tâche ajoutée
      if (index === tasks.length - 1) {
        li.classList.add('task-animate-in');
      }
      taskList.appendChild(li);
    });

    const btnsDelete = document.querySelectorAll(".btn-delete");
    const btnsComplete = document.querySelectorAll(".btn-complete");
    const btnsEdit = document.querySelectorAll(".btn-edit");

    btnsDelete.forEach(btn => {
        btn.addEventListener("click", (e) => {
            deleteTask(e);
            showCockyMessage(1); // Show message for deletion
        });
    });

    btnsComplete.forEach(btn => {
        btn.addEventListener("click", (e) => {
            completeTask(e);
            showCockyMessage(0); // Show message for completion
        });
    });

    btnsEdit.forEach(btn => {
        btn.addEventListener("click", editTask);
    });
  }
}

function deleteTask(e) { // Function to delete a task
    const id = e.target.dataset.id;
    const arrayTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = arrayTasks.filter(task => task.id != id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    showTasks();
}

function editTask(e) { // Function to edit a task
    const id = e.target.dataset.id;
    const arrayTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToEdit = arrayTasks.find(task => task.id == id);
    
    if (taskToEdit) {
        document.querySelector('#taskInput').value = taskToEdit.name;
        document.querySelector('#taskDescription').value = taskToEdit.description;
        document.querySelector('#taskDate').value = taskToEdit.dueDate;
        document.querySelector('#taskPriority').value = taskToEdit.priority;
        
        const updatedTasks = arrayTasks.filter(task => task.id != id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        
        taskForm.style.display = 'block';
        document.querySelector('#taskInput');
    }
}

function completeTask(e) { // Function to mark a task as completed
    const id = e.target.dataset.id;
    const arrayTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToUpdate = arrayTasks.find(task => task.id == id);

    if (taskToUpdate) {
        taskToUpdate.completed = !taskToUpdate.completed;
        localStorage.setItem('tasks', JSON.stringify(arrayTasks));
        showTasks();
    }
}

function formatDate(dateString) { // Function to format date
    if (!dateString) return '';
    // Format the date to 'dd/mm/yyyy' in Spanish locale
    // Using 'es-ES' locale for Spanish formatting
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

const cockyMessage = [ //
  {
    title: "¡Muy bien!",
    message: "Has completado una tarea. ¡Sigamos adelante!",
    icon: "✅"
  },
  {
    title: "¡Genial!",
    message: "Tu tarea ha sido eliminada. ¡A por la siguiente!",
    icon: "🗑️"
  }
];
function showCockyMessage(type) { // Function to show a toast message
  const message = cockyMessage[type];
  if (message) {
    showToast(`${message.icon} ${message.title}`, message.message);
  }
}

function showToast(title, message) { // Function to create and show toast notification
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close">&times;</button>
  `;

  // Add toast to body
  document.body.appendChild(toast);

  // Add close functionality
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 5000);

  // Show toast with animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);//
}

function checkTaskReminder() {
  const currentDate = new Date();
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    if (!task.dueDate || task.completed) return;
    const dueDate = new Date(task.dueDate);
    // Calculer la différence en jours
    const diffTime = dueDate.setHours(0,0,0,0) - currentDate.setHours(0,0,0,0);
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      showToast("⏰ Recordatorio", `La tarea "${task.name}" es para mañana.`);
    }
    // Optionnel : garder le rappel existant pour les tâches en retard
    if (diffDays < 0) {
      showToast(`⚠️ Retrasado : ${task.name}`, `La tarea "${task.name}" está retrasada.`);
    }
  });
}
setInterval(checkTaskReminder, 60 * 1000); // Vérifie toutes les minutes


