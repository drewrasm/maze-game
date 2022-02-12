MyGame.game = (function (graphics, mazeGenerator) {
  let lastTimeStamp = performance.now();
  let cancelNextRequest = true;

  let history = [];
  let historyTextures = [];

  let fastestPath = [];

  let position;

  let goal;

  let showBreadCrumbs = false;
  let showHelp = false;
  let showPath = false;

  let maze;

  let morty = graphics.CellTexture({
    imageSrc: "images/morty.png",
    center: {x: 40, y: 40},
    sizeRatio: .6
  })

  let rick = graphics.CellTexture({
    imageSrc: "images/rick.png",
    center: {x: 50, y: 50},
    sizeRatio: .7
  })

  const up = () => {
    if (!position.top) {
      if(!history.includes(position)) {
        history.push(position);
        historyTextures.push(graphics.generateHistoryPoint(position))
      }
      position = mazeGrid[position.x][position.y - 1];
    }
  };
  const down = () => {
    if (!position.bottom) {
      if(!history.includes(position)) {
        history.push(position);
        historyTextures.push(graphics.generateHistoryPoint(position))
      }
      position = mazeGrid[position.x][position.y + 1];
    }
  };
  const left = () => {
    if (!position.left) {
      if(!history.includes(position)) {
        history.push(position);
        historyTextures.push(graphics.generateHistoryPoint(position))
      }
      position = mazeGrid[position.x - 1][position.y];
    }
  };
  const right = () => {
    if (!position.right) {
      if(!history.includes(position)) {
        history.push(position);
        historyTextures.push(graphics.generateHistoryPoint(position))
      }
      position = mazeGrid[position.x + 1][position.y];
    }
  };
  const help = () => {
    showHelp = !showHelp;
  };
  const breadcrumbs = () => {
    showBreadCrumbs = !showBreadCrumbs;
  };
  const path = () => {
    showPath = !showPath;
  };

  const renderHelpPoints = () => {
    for (let cell of fastestPath) {
      renderHelpPoint(cell);
    }
  };

  function update(elapsedTime) {
    rick.goTo(position)
  }

  function render() {
    graphics.clear()
    morty.draw()
    graphics.renderMaze(maze)
    if (showPath || showHelp) {
      fastestPath = getBestPath(position, goal);
    }
    if (showPath) {
      renderHelpPoints();
    }
    if (showBreadCrumbs) {
      for (let texture of historyTextures) {
        texture.draw()
      }
    }
    if (showHelp) {
      renderHelpPoint(fastestPath[fastestPath.length - 2]);
    }
    rick.draw();
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
    // clearMaze();
    // renderMaze(generate(mazeWidth, mazeHeight));
    // position = mazeGrid[0][0];
    // goal = mazeGrid[mazeWidth - 1][mazeHeight - 1];
    // history = [];
    // fastestPath = [];
  }

  function run() {
    lastTimeStamp = performance.now();
    cancelNextRequest = false;
    requestAnimationFrame(gameLoop);
  }

  const commands = {
    ArrowUp: up,
    ArrowLeft: left,
    ArrowRight: right,
    ArrowDown: down,
    w: up,
    d: right,
    a: left,
    s: down,
    i: up,
    l: right,
    j: left,
    k: down,
    h: help,
    b: breadcrumbs,
    p: path,
  };

  window.addEventListener("keydown", (e) => {
    if (e.key in commands) {
      commands[e.key]();
    }
  });

  for (let b of document.getElementsByTagName("button")) {
    b.addEventListener("click", (e) => {
      graphics.clear()
      let dimensions = Number(e.target.value)
      maze = mazeGenerator.maze(dimensions, dimensions).generate()
      position = maze[0][0]
      goal = maze[maze.length - 1][maze[0].length - 1]
      graphics.renderMaze(maze)
      rick.goTo(position)
      rick.draw()
      morty.goTo(goal)
      morty.draw()
      // initialize();
      run();
    });
  }
})(MyGame.graphics, MyGame.mazeGenerator);
