const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings");

const LS_USER = "currentUser",
CN_DISPLAY_BLOCK = "display-block";

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
  greeting.innerText = `Hello ${text}`;
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