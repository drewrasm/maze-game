MyGame.graphics = (function () {
  "use strict";

  let canvas = document.getElementById("id-canvas");
  let context = canvas.getContext("2d");

  let cellWidth = 10;
  let cellHeight = 10;

  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function CellTexture(spec) {
    let that = {};
    let ready = false;
    let image = new Image();

    image.onload = function () {
      ready = true;
    };
    image.src = spec.imageSrc;

    const getWidth = () => {
      return spec.sizeRatio * cellWidth;
    };
    const getHeight = () => {
      return spec.sizeRatio * cellHeight;
    };

    // allows movements made for a maze based on cell
    that.goTo = function (cell) {
      let point = {
        x: cell.x * cellWidth + cellWidth / 2,
        y: cell.y * cellHeight + cellHeight / 2,
      };
      spec.center = point;
    };

    that.draw = function () {
      if (ready) {
        context.save();

        context.translate(spec.center.x, spec.center.y);
        context.translate(-spec.center.x, -spec.center.y);
        context.drawImage(
          image,
          spec.center.x - getWidth() / 2,
          spec.center.y - getHeight() / 2,
          getWidth(),
          getHeight()
        );

        context.restore();
      }
    };

    return that;
  }

  const drawCell = (cell) => {
    let x = cell.x == 0 ? 0 : cellWidth * cell.x;
    let y = cell.y == 0 ? 0 : cellHeight * cell.y;
    context.save();

    context.beginPath();
    context.strokeStyle = "white";
    context.lineWidth = 2;
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

  const renderMaze = (maze) => {
    cellWidth = canvas.width / maze.length;
    cellHeight = canvas.height / maze[0].length;
    for (let row of maze) {
      for (let cell of row) {
        drawCell(cell);
      }
    }
  };

  return {
    clear: clear,
    CellTexture: CellTexture,
    renderMaze: renderMaze,
    cellHeight: cellHeight,
    cellWidth: cellWidth,
  };
})();
