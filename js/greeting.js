const form = document.querySelector("#login-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector("#greeting"),
      logoutBtn = document.querySelector("#logout-btn");

const LS_USER = "currentUser",
      CN_DISPLAY_BLOCK = "display-block";

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
  paintLogout();
  savaName(currentValue);
}

function askForName() {
  form.classList.add(CN_DISPLAY_BLOCK);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(CN_DISPLAY_BLOCK);
  greeting.classList.add(CN_DISPLAY_BLOCK);
  greeting.innerText = `Hello ${text}`;
}

function paintLogout() {
  logoutBtn.classList.remove("hidden");
  logoutBtn.classList.add(CN_DISPLAY_BLOCK);
  logoutBtn.addEventListener("click", logout);
}

function loadName() {
  const currentUser = localStorage.getItem(LS_USER);
  
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
    paintLogout();
  }
}

function init() {
  loadName();
}

init();