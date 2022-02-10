// console.log('hey!')
// let m = generate(40, 40)
// console.log(m)
// renderMaze(m)

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

let maze = generate(10, 10)
renderMaze(maze)
