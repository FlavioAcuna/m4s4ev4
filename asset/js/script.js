// Crear un Map y un Set para almacenar tareas y completadas
const taskMap = new Map();
const completedTasks = new Set();

// Cargar tareas y completadas desde localStorage
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = localStorage.getItem("taskMap");
  const storedCompleted = localStorage.getItem("completedTasks");

  if (storedTasks) {
    const parsedTasks = JSON.parse(storedTasks);
    parsedTasks.forEach(([id, task]) => taskMap.set(id, task));
    updateTaskList();
  }

  if (storedCompleted) {
    const parsedCompleted = JSON.parse(storedCompleted);
    parsedCompleted.forEach((id) => completedTasks.add(id));
  }
});

// Función para agregar tareas
function addTask() {
  const taskInput = document.getElementById("task");
  const taskValue = taskInput.value.trim();

  if (taskValue === "") return;

  // Obtener la próxima id disponible
  const nextId = taskMap.size + 1;

  // Agregar tarea al Map
  taskMap.set(nextId, taskValue);

  // Actualizar la lista de tareas
  updateTaskList();

  // Limpiar el campo de entrada
  taskInput.value = "";

  // Almacenar tareas y completadas en localStorage
  storeData();
}
// Función para marcar tarea como completada
function markTaskAsCompleted(taskId) {
  if (completedTasks.has(taskId)) {
    completedTasks.delete(taskId);
    console.log(`Tarea ${taskId} completada`);
  } else {
    completedTasks.add(taskId);
    console.log(`Tarea ${taskId} marcada como completada`);
  }

  // Actualizar la lista de tareas
  updateTaskList();

  // Almacenar tareas y completadas en localStorage
  storeData();
}

// Función para actualizar la lista de tareas en el DOM
// Función para actualizar la lista de tareas en el DOM
function updateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  for (const [id, task] of taskMap) {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    // Usar destructuring para crear el checkbox y el texto
    const [checkbox, taskText] = [
      document.createElement("input"),
      document.createTextNode(task),
    ];

    checkbox.type = "checkbox";
    checkbox.id = `task-${id}`;
    checkbox.checked = completedTasks.has(id); // Marca el checkbox según el estado en completedTasks
    checkbox.onclick = () => markTaskAsCompleted(id);

    // Aplicar estilo para tachar el texto si la tarea está completada
    if (completedTasks.has(id)) {
      listItem.style.textDecoration = "line-through";
    } else {
      listItem.style.textDecoration = "none"; // Asegúrate de que no esté tachado si no está completado
    }

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);

    taskList.appendChild(listItem);
  }
}
// Función para almacenar datos en localStorage
function storeData() {
  localStorage.setItem("taskMap", JSON.stringify([...taskMap]));
  localStorage.setItem("completedTasks", JSON.stringify([...completedTasks]));
}

// Función para limpiar tareas
function clearTasks() {
  taskMap.clear();
  completedTasks.clear();
  updateTaskList();
  localStorage.removeItem("taskMap");
  localStorage.removeItem("completedTasks");
}
