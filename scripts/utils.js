const randomChoice = (list) => {
  return list[Math.floor(Math.random() * list.length)];
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
