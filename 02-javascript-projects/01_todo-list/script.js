// ===== STATE =====
let todos = [];
let nextId = 1;

// ===== CORE LOGIC =====
function addTask(title) {
  if (!title || title.trim() === "") return null;

  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: false
  };

  todos.push(todo);
  return todo;
}

function toggleTask(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
}

function deleteTask(id) {
  todos = todos.filter(t => t.id !== id);
}

// ===== DOM RENDER =====
function renderTodos() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.textContent = todo.title + (todo.completed ? " ✔" : "");

    // toggle on click
    li.addEventListener("click", () => {
      toggleTask(todo.id);
      renderTodos();
    });

    // delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(todo.id);
      renderTodos();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// ===== EVENTS =====
document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("taskInput");
  addTask(input.value);
  input.value = "";
  renderTodos();
});
