MyGame.mazeGenerator = (function () {
  const randomChoice = (list) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const getNeighbors = (x, y, included = null) => {
    let top = y - 1 >= 0 ? mazeGrid[x][y - 1] : null;
    let bottom = y + 1 < mazeGrid[0].length ? mazeGrid[x][y + 1] : null;
    let right = x + 1 < mazeGrid.length ? mazeGrid[x + 1][y] : null;
    let left = x - 1 >= 0 ? mazeGrid[x - 1][y] : null;
    let neighbors = [top, bottom, right, left].filter(function (d) {
      return d !== null;
    });
    if (included !== null) {
      return neighbors.filter((d) => d.included === included);
    }
    return neighbors;
  };

  const getSharedWalls = (first, second) => {
    if (first.x != second.x) {
      return {
        first: first.x > second.x ? "left" : "right",
        second: first.x > second.x ? "right" : "left",
      };
    }
    return {
      first: first.y > second.y ? "top" : "bottom",
      second: first.y > second.y ? "bottom" : "top",
    };
  };

  const generateGrid = (width, height) => {
    for (let w = 0; w < width; w++) {
      let row = [];
      for (let h = 0; h < height; h++) {
        row.push({
          x: w,
          y: h,
          top: true,
          bottom: true,
          right: true,
          left: true,
          included: false,
        });
      }
      mazeGrid.push(row);
    }
  };

  const populateMaze = (node, fronteir) => {
    if (fronteir.length == 0) {
      return;
    }
    let neighbors = getNeighbors(node.x, node.y);
    for (let n of neighbors) {
      if (n.included == false && !fronteir.includes(n)) {
        fronteir.push(n);
      }
    }

    let next = randomChoice(fronteir);
    fronteir.splice(fronteir.indexOf(next), 1);

    let includedNeighbors = getNeighbors(next.x, next.y, true);
    let included = randomChoice(includedNeighbors);
    let sharedWalls = getSharedWalls(next, included);

    next[sharedWalls.first] = false;
    next.included = true;
    included[sharedWalls.second] = false;

    mazeGrid[included.x][included.y] = included;
    mazeGrid[next.x][next.y] = next;

    return populateMaze(next, fronteir);
  };

  const maze = (width, height) => {
    let that = {};
    that.mazeGrid = [];
    that.width = width;
    that.height = height;

    that.generate = () => {
      mazeGrid = [];
      generateGrid(that.width, that.height);
      fronteir = getNeighbors(0, 0);
      mazeGrid[0][0].included = true;
      populateMaze(mazeGrid[0][0], fronteir);
      return mazeGrid;
    };

    return that;
  };

  const getAdjacentCells = (cell) => {
    let neighbors = [];
    if (!cell.top) {
      neighbors.push(mazeGrid[cell.x][cell.y - 1]);
    }
    if (!cell.right) {
      neighbors.push(mazeGrid[cell.x + 1][cell.y]);
    }
    if (!cell.bottom) {
      neighbors.push(mazeGrid[cell.x][cell.y + 1]);
    }
    if (!cell.left) {
      neighbors.push(mazeGrid[cell.x - 1][cell.y]);
    }
    return neighbors;
  };

  const getShortestCostNeighbor = (cell) => {
    let neighbors = getAdjacentCells(cell);
    let min = neighbors[0];
    for (let n of neighbors) {
      if (n.cost < min.cost) {
        min = n;
      }
    }
    return min;
  };

  const generateCosts = (start) => {
    mazeGrid[start.x][start.y].cost = 0;
    gatherCosts(start, [mazeGrid[start.x][start.y]]);
  };

  const gatherCosts = (cell, visited) => {
    let adjacents = getAdjacentCells(cell);
    for (let a of adjacents) {
      if (!visited.includes(a)) {
        mazeGrid[a.x][a.y].cost = cell.cost + 1;
        visited.push(a);
        gatherCosts(a, visited);
      }
    }
  };

  const getBestPath = (start, goal) => {
    let path = [];
    generateCosts(start);
    let current = goal;
    while (current != start) {
      let shortest = getShortestCostNeighbor(current);
      path.push(shortest);
      current = shortest;
    }
    return path;
  };

  return {
    maze,
    getBestPath,
  };
})();
