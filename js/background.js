const body = document.querySelector("body");
const background = document.querySelector(".background-item");

const IMG_NUMBER = 11;

function paintImage(imgNum) {
  const image = new Image();
  image.src = `images/${imgNum}.jpg`;
  
  background.style.backgroundImage = "url('" + `images/${imgNum}.jpg` + "')";
}

function generateRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
  return number;
}

function init() {
  const randomNumber = generateRandom();
  paintImage(randomNumber);
}

init();