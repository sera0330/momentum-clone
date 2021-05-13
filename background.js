const body = document.querySelector("body");

const IMG_NUMBER = 9;

function paintImage(imgNum) {
  const image = new Image();
  image.src = `images/${imgNum}.jpg`;
  image.classList.add('background');
  body.appendChild(image);
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