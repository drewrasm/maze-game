// var ratio = 10 / mazeHeight

let mazeHeight = 10;
let mazeWidth = 10;


var cellWidth = 10;
var cellHeight = 10;

let ratio = cellWidth / mazeWidth

var canvas = document.getElementById("id-canvas");
var context = canvas.getContext("2d");

var morty = {
  imageSrc: "images/morty.png",
  center: { x: 50, y: 50 },
  width: 75 * ratio,
  height: 75 * ratio,
  rotation: 0,
  image: new Image(),
};
morty.image.src = morty.imageSrc;
var rick = {
  imageSrc: "images/rick.png",
  center: { x: 50, y: 50 },
  width: 95 * ratio,
  height: 95 * ratio,
  rotation: 0,
  image: new Image(),
};
rick.image.src = rick.imageSrc;

const renderMaze = (maze) => {
  cellWidth = canvas.width / maze.length;
  cellHeight = canvas.height / maze[0].length;
  for (let row of maze) {
    for (let cell of row) {
      drawCell(cell);
    }
  }
};

const clearMaze = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

const drawCell = (cell) => {
  let x = cell.x == 0 ? 0 : cellWidth * cell.x;
  let y = cell.y == 0 ? 0 : cellHeight * cell.y;
  context.save();

  context.beginPath();
  context.strokeStyle = 'white'
  context.lineWidth = 6 * ratio;
  context.moveTo(x, y);

  cell.top
    ? context.lineTo(x + cellWidth, y)
    : context.moveTo(x + cellWidth, y);
  cell.right
    ? context.lineTo(x + cellWidth, y + cellHeight)
    : context.moveTo(x + cellWidth, y + cellHeight);
  cell.bottom
    ? context.lineTo(x, y + cellHeight)
    : context.moveTo(x, y + cellHeight);
  cell.left ? context.lineTo(x, y) : context.moveTo(x, y);
  context.stroke();
};

function drawTexture(texture) {
  context.save();

  context.translate(texture.center.x, texture.center.y);
  context.rotate(texture.rotation);
  context.translate(-texture.center.x, -texture.center.y);

  context.drawImage(
    texture.image,
    texture.center.x - texture.width / 2,
    texture.center.y - texture.height / 2,
    texture.width,
    texture.height
  );

  context.restore();
}

const setMorty = (point, width = null, height = null) => {
  morty.center = point;
  morty.width = width || morty.width;
  morty.height = height || morty.height;
};
const setRick = (point, width = null, height = null) => {
  rick.center = point;
  rick.width = width || rick.width;
  rick.height = height || rick.height;
};

const renderMorty = (cell) => {
  let point = {x: (cell.x * cellWidth) + cellWidth / 2, y: (cell.y * cellHeight) + cellHeight / 2}
  setMorty(point);
  drawTexture(morty);
};

const renderRick = (cell) => {
  let point = {x: (cell.x * cellWidth) + cellWidth / 2, y: (cell.y * cellHeight) + cellHeight / 2}
  setRick(point);
  drawTexture(rick);
};

const renderHelpPoint = (cell) => {
  let point = {x: (cell.x * cellWidth) + cellWidth / 2, y: (cell.y * cellHeight) + cellHeight / 2}
  let helpPoint = {
    imageSrc: "images/helpPoint.png",
    center: point,
    width: 50 * ratio,
    height: 50 * ratio,
    rotation: 0,
    image: new Image(),
  }
  helpPoint.image.src = helpPoint.imageSrc;
  drawTexture(helpPoint);
}

const renderHistoryPoint = (cell) => {
  let point = {x: (cell.x * cellWidth) + cellWidth / 2, y: (cell.y * cellHeight) + cellHeight / 2}
  let historyPoint = {
    imageSrc: "images/history.png",
    center: point,
    width: 40 * ratio,
    height: 40 * ratio,
    rotation: 0,
    image: new Image(),
  }
  historyPoint.image.src = historyPoint.imageSrc;
  drawTexture(historyPoint);
}
