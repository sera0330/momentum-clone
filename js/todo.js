const toDoForm = document.querySelector("#todo-form"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector("#todo-list");

const LS_TODOS = "toDos";
let toDos = [];

function checkToDo(event) {
  const checkbox = event.target;
  const label = checkbox.nextSibling;
  if (checkbox.checked) {
    label.classList.add("todo-checked");
  } else {
    label.classList.remove("todo-checked");
  }
}

function deleteToDo(event) {
  const li = event.target.closest('li');
  const cleanToDos = toDos.filter(function filterTodo(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  li.remove();
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(LS_TODOS, JSON.stringify(toDos));
}

function paintToDo(todo) {
  const todoText = document.createElement("span");
  const trashSpan = document.createElement("span");
  const trash = document.createElement("i");
  const checkBox = document.createElement("input");
  const li = document.createElement("li");
    
  todoText.innerText = todo.text;
  todoText.classList.add("todo-text");
  
  trash.classList.add("fas", "fa-trash-alt", "fa-xs");
  trashSpan.appendChild(trash);
  trashSpan.addEventListener("click", deleteToDo);
  trashSpan.classList.add("cusor-default", "trash");

  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("name", "todo");
  checkBox.addEventListener("click", checkToDo);

  li.appendChild(checkBox);
  li.appendChild(todoText);
  li.appendChild(trashSpan);
  li.classList.add("todo");
  li.id = todo.id;
  
  toDoList.appendChild(li);

  const toDoObj = {
    text: todo.text,
    id: todo.id
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();

  const currenValue = toDoInput.value;
  const newId = toDos.length === 0 ? 1 : toDos[toDos.length - 1].id + 1;
  const newTodo = {
    text: currenValue,
    id: newId
  }

  paintToDo(newTodo);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(LS_TODOS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo);
    });
  }
}

function init() {
  loadToDos();

  toDoForm.addEventListener("submit", handleSubmit)
}

init();