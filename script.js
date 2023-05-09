const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

let todos;

document.addEventListener("DOMContentLoaded", () => {
  todos = JSON.parse(localStorage.getItem("todos"));
  if (!todos) {
    todos = [];
  }
  todos.forEach((todo) => {
    addTodo(todo);
  });
});

function addTodo(todo) {
  const todoEl = document.createElement("li");
  todoEl.textContent = todo.text;
  if (todo.completed) {
    todoEl.classList.add("completed");
  }
  todosUL.appendChild(todoEl);

  input.value = "";

  todoEl.addEventListener("click", () => {
    todoEl.classList.toggle("completed");
    updateLS();
  });

  todoEl.addEventListener("contextmenu", () => {
    todoEl.remove();
    updateLS();
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = { text: input.value, completed: false };
  addTodo(obj);

  updateLS();
});

function updateLS() {
  const todosEl = document.querySelectorAll("li");
  const _todos = [];
  todosEl.forEach((todoEl) => {
    _todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(_todos));
}

// function getTodoFromLS(todo) {
//     return JSON.parse(localStorage.getItem(todo))
// }
