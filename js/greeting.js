const form = document.querySelector("#login-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector("#greeting"),
      todo = document.querySelector("#todo"),
      logoutBtn = document.querySelector("#logout-btn");

const LS_USER = "currentUser",
      CN_DISPLAY_BLOCK = "display-block";

function askLogout(event) {
  if (confirm("Do you want to logout?")) {
    logout(event);
  }
}

function logout(event) {
  event.preventDefault();

  localStorage.clear();
  location.reload();
}

function savaName(text) {
  localStorage.setItem(LS_USER, text);
}

function handleSubmit(event) {
  event.preventDefault();

  const currentValue = input.value;
  paintGreeting(currentValue);
  savaName(currentValue);
}

function askForName() {
  form.classList.add(CN_DISPLAY_BLOCK);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(CN_DISPLAY_BLOCK);
  greeting.classList.add(CN_DISPLAY_BLOCK);
  greeting.innerText = `Hello, ${text}.`;
  greeting.addEventListener("click", askLogout);
  todo.classList.remove("hidden");
}

function loadName() {
  const currentUser = localStorage.getItem(LS_USER);
  
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();