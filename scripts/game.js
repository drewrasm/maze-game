let lastTimeStamp = performance.now();
let cancelNextRequest = true;

let mazeHeight = 10;
let mazeWidth = 10;

let history = [];

let fastestPath = [];

let position;

let goal;

let showBreadCrumbs = false;
let showHelp = false;

const up = () => {
  if(!position.top) {
    history.push(position)
    position = mazeGrid[position.x][position.y - 1]
  }
}
const down = () => {
  if(!position.bottom) {
    history.push(position)
    position = mazeGrid[position.x][position.y + 1]
  }
}
const left = () => {
  if(!position.left) {
    history.push(position)
    position = mazeGrid[position.x - 1][position.y]
  }
}
const right = () => {
  if(!position.right) {
    history.push(position)
    position = mazeGrid[position.x + 1][position.y]
  }
}
const help = () => {
  showHelp = !showHelp
}
const breadcrumbs = () => {
  showBreadCrumbs = !showBreadCrumbs
}
const path = () => {
  showPath = !showPath
}

const renderHistoryPoints = () => {
  for(let cell of history) {
    renderHistoryPoint(cell)
  }
}
const renderHelpPoints = () => {
  for(let cell of fastestPath) {
    renderHelpPoint(cell)
  }
}

function update(elapsedTime) {}

function render() {
  clearMaze()
  renderMorty(goal)
  renderMaze(mazeGrid)
  if(showHelp) {
    fastestPath = getBestPath(position, goal)
    renderHelpPoints()
  }
  if(showBreadCrumbs) {
    renderHistoryPoints()
  }
  renderRick(position)
}

function gameLoop(time) {
  let elapsedTime = time - lastTimeStamp;
  lastTimeStamp = time;

  update(elapsedTime);
  render();

  if (!cancelNextRequest) {
    requestAnimationFrame(gameLoop);
  }
}

function initialize() {
  clearMaze()
  renderMaze(generate(mazeWidth, mazeHeight))
  position = mazeGrid[0][0]
  goal = mazeGrid[mazeWidth - 1][mazeHeight - 1]
  history = []
  fastestPath = []
}

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


initialize()
run()