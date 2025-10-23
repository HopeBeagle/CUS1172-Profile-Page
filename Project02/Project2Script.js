let tasks = [];

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

taskForm.onsubmit = function (event) {
  event.preventDefault();

  const title = document.getElementById("taskTitle").value.trim();
  const priority = document.getElementById("taskPriority").value;
  const status = document.querySelector('input[name="taskStatus"]:checked').value;

  if (!title) return;

  const newTask = {
    id: Date.now(),
    title: title,
    priority: priority,
    status: status
  };

  tasks.push(newTask);

  addTaskToDOM(newTask);

  taskForm.reset();
  document.getElementById("pending").checked = true;
};

function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.setAttribute("data-id", task.id);

  const taskText = document.createElement("span");
  taskText.innerHTML = `<strong>${task.title}</strong> 
    <small class="text-muted">(${task.priority} Priority, ${task.status})</small>`;
  if (task.status === "Completed") taskText.classList.add("completed");

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const completeBtn = document.createElement("button");
  completeBtn.className = "btn btn-sm btn-outline-primary";
  completeBtn.textContent = "Mark Complete";
  completeBtn.onclick = () => markTaskComplete(task.id);

  const removeBtn = document.createElement("button");
  removeBtn.className = "btn btn-sm btn-outline-danger";
  removeBtn.textContent = "Remove";
  removeBtn.onclick = () => removeTask(task.id);

  actions.appendChild(completeBtn);
  actions.appendChild(removeBtn);

  li.appendChild(taskText);
  li.appendChild(actions);
  taskList.appendChild(li);
}

function markTaskComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = "Completed";
    const li = document.querySelector(`li[data-id='${id}'] span`);
    li.classList.add("completed");
  }
}

function removeTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  const li = document.querySelector(`li[data-id='${id}']`);
  if (li) li.remove();
}
