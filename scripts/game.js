MyGame.game = (function (graphics, mazeGenerator) {
  let lastTimeStamp = performance.now();
  let cancelNextRequest = true;

  let dimensions = 10;

  let history = [];

  let fastestPath = [];

  let position;

  let goal;

  let gameTimer = 0;
  let timerDisplay = document.getElementById("id-time");

  let showBreadCrumbs = false;
  let showHelp = false;
  let showPath = false;

  let maze;

  let morty = graphics.CellTexture({
    imageSrc: "images/morty.png",
    center: { x: 40, y: 40 },
    sizeRatio: 0.6,
  });

  let rick = graphics.CellTexture({
    imageSrc: "images/rick.png",
    center: { x: 50, y: 50 },
    sizeRatio: 0.7,
  });

  let helpPoint = graphics.CellTexture({
    imageSrc: "images/helpPoint.png",
    center: { x: 100, y: 100 },
    sizeRatio: 0.5,
  });

  let historyPoint = graphics.CellTexture({
    imageSrc: "images/history.png",
    center: { x: 100, y: 100 },
    sizeRatio: 0.5,
  });

  const storeScore = () => {
    let scores = localStorage.getItem("scores");
    if (scores !== null) {
      scores = JSON.parse(scores);
    } else {
      scores = []
    }
    let scoreNum = (1000 - ((gameTimer/ 1000))) - history.length
    scores.push(`size - ${dimensions}, score - ${scoreNum.toFixed(0)}`);
    localStorage.setItem("scores", JSON.stringify(scores))
    graphics.insertScores()
    graphics.setMessage(`Wubba Lubba Dub Dub! Here\'s your score: ${scoreNum.toFixed(0)}`)
  };
  graphics.insertScores()

  const up = () => {
    if (!position.top) {
      if (!history.includes(position)) {
        history.push(position);
      }
      position = mazeGrid[position.x][position.y - 1];
    }
  };
  const down = () => {
    if (!position.bottom) {
      if (!history.includes(position)) {
        history.push(position);
      }
      position = mazeGrid[position.x][position.y + 1];
    }
  };
  const left = () => {
    if (!position.left) {
      if (!history.includes(position)) {
        history.push(position);
      }
      position = mazeGrid[position.x - 1][position.y];
    }
  };
  const right = () => {
    if (!position.right) {
      if (!history.includes(position)) {
        history.push(position);
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

  function update(elapsedTime) {
    gameTimer += elapsedTime;
    rick.goTo(position);
    if (showPath || showHelp) {
      fastestPath = mazeGenerator.getBestPath(position, goal);
    }
    if (position === goal) {
      cancelNextRequest = true;
      storeScore();
    }
  }

  function render() {
    timerDisplay.innerHTML = (gameTimer / 1000).toFixed(1);
    graphics.clear();
    morty.draw();
    graphics.renderMaze(maze);
    if (showPath) {
      for (let cell of fastestPath) {
        helpPoint.goTo(cell);
        helpPoint.draw();
      }
    }
    if (showBreadCrumbs) {
      for (let cell of history) {
        historyPoint.goTo(cell);
        historyPoint.draw();
      }
    }
    if (showHelp) {
      if (fastestPath.length > 1) {
        helpPoint.goTo(fastestPath[fastestPath.length - 2]);
        helpPoint.draw();
      }
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
    graphics.setMessage('SAVE MORTY!')
    maze = mazeGenerator.maze(dimensions, dimensions).generate();
    position = maze[0][0];
    goal = maze[maze.length - 1][maze[0].length - 1];
    graphics.renderMaze(maze);
    rick.goTo(position);
    rick.draw();
    morty.goTo(goal);
    morty.draw();
    history = [];
    fastestPath = [];
    gameTimer = 0;
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
      graphics.clear();
      dimensions = Number(e.target.value);
      initialize();
      run();
    });
  }
})(MyGame.graphics, MyGame.mazeGenerator);
