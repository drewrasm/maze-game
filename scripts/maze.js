var mazeGrid = [];

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

const generate = (width, height) => {
  mazeGrid = [];
  generateGrid(width, height);
  fronteir = getNeighbors(0, 0);
  mazeGrid[0][0].included = true;
  populateMaze(mazeGrid[0][0], fronteir);
  return mazeGrid;
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
