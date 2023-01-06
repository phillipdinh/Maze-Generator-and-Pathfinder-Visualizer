import { getNeighbors, getRand, checkNeighbors } from "../components/Maze/Maze";

export default function dfsGen(grid) {
  function backTrack(col, row, maze) {
    maze[col][row].visited = true;

    visitedNodesInOrder.push(maze[col][row]);

    if (visitedCount < maze.length * maze[0].length) {
      const neighbors = getNeighbors(col, row);

      const goodNeighbors = checkNeighbors(col, row, neighbors, maze);
      console.log(goodNeighbors);
      const randDir = getRand(goodNeighbors);

      if (randDir) {

        const [nCol, nRow] = neighbors[randDir];
        list.push([col, row]);
        visitedCount = visitedCount + 1;

        //Wall
        //updateMaze(col, row, randDir, true);
        visitedNodesInOrder.push(randDir);

        // random neighbor
        return backTrack(nCol, nRow, maze);
      }

      if (list.length > 0) {
        const lastNode = list.pop();
        return backTrack(lastNode[0], lastNode[1], maze);
      }
      return;
    }
  }

  const maze = getAllNodes(grid);
  const visitedNodesInOrder = [];
  const list = [];
  var visitedCount = 0;

  console.log(maze);
  backTrack(0, 0, maze);

  console.log(visitedCount);
  console.log(visitedNodesInOrder);

  return visitedNodesInOrder;
}

function getAllNodes(maze) {
  const nodes = [];
  for (let x = 0; x < 16; x++) {
    const currRow = [];
    for (let y = 0; y < 16; y++) {
      currRow.push(maze[x][y]);
    }
    nodes.push(currRow);
  }
  return nodes;
}
