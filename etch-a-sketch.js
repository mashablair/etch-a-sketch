console.log("it works!");

// cache vars
const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakebutton = document.querySelector(".shake");
const MOVE_AMOUNT = 50;

// setup canvas for drawing
// const width = canvas.width;
// const height = canvas.height;

const { width, height } = canvas;

console.log(width, height);

// create random x and y
let x = Math.floor(Math.random() * width);
let y = Math.random() * height;

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // starts drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write draw fuctnion
function draw({ key }) {
  // increment the hue
  hue += 10;
  ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;

  console.log(key);
  // start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move x & y values depending on what user did

  switch (key) {
    case "ArrowUp":
      y = y - MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x = x + MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y = y + MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x = x - MOVE_AMOUNT;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// handler for keys
function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// clear/shake function
function clearCanvas() {
  canvas.classList.add("shake");
  ctx.clearRect(0, 0, width, height); // clears the whole thing
  canvas.addEventListener(
    "animationend",
    function() {
      canvas.classList.remove("shake");
    },
    { once: true }
  );
}

// listen for arrow keys
window.addEventListener("keydown", handleKey);
shakebutton.addEventListener("click", clearCanvas);
