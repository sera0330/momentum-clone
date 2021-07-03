const toDoForm = document.querySelector("#todo-form"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector("#todo-list");

const LS_TODOS = "toDos";
let toDos = [];

function deleteToDo(event) {
  const li = event.target.parentNode;
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

function paintDoto(text) {
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const li = document.createElement("li");
  const newId = toDos.length + 1;
  
  span.innerText = text;
  
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);

  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();

  const currenValue = toDoInput.value;
  paintDoto(currenValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(LS_TODOS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintDoto(toDo.text);
    });
  }
}

function init() {
  loadToDos();

  toDoForm.addEventListener("submit", handleSubmit)
}

init();