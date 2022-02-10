let lastTimeStamp = performance.now();
let cancelNextRequest = true;

const up = () => {
  console.log('up')
}
const down = () => {
  console.log('down')
}
const left = () => {
  console.log('left')
}
const right = () => {
  console.log('right')
}
const help = () => {
  console.log('help')
}
const breadcrumbs = () => {
  console.log('breadcrumbs')
}
const path = () => {
  console.log('path')
}

function update(elapsedTime) {}

function render() {}

function gameLoop(time) {
  let elapsedTime = time - lastTimeStamp;
  lastTimeStamp = time;

  processInput(elapsedTime);
  update(elapsedTime);
  render();

  if (!cancelNextRequest) {
    requestAnimationFrame(gameLoop);
  }
}

function initialize() {}

function run() {
  lastTimeStamp = performance.now();
  cancelNextRequest = false;
  requestAnimationFrame(gameLoop);
}

const commands = {
  'ArrowUp': up,
  'ArrowLeft': left,
  'ArrowRight': right,
  'ArrowDown': down,
  'w': up,
  'd': right,
  'a': left,
  's': down,
  'i': up,
  'l': right,
  'j': left,
  'k': down,
  'h': help,
  'b': breadcrumbs,
  'p': path
}

window.addEventListener('keydown', (e) => {
  if(e.key in commands) {
    commands[e.key]()
  }
})

let maze = generate(10, 10)
renderMaze(maze)
