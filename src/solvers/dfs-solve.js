import { getNeighbors, getRand, checkNeighborsSolve, getAllNodes } from "../components/Maze/Maze-Helper";

export default function dfsSolve(startCol, startRow, 
																finishCol, finishRow, grid) {

  function backTrack(col, row, maze) {
    maze[col][row].visited = true;

		if(col === finishCol && row === finishRow){
			return;
		}
		
    visitedNodesInOrder.push(maze[col][row]);

    if (visitedCount < maze.length * maze[0].length) {
      const neighbors = getNeighbors(col, row);
      const goodNeighbors = checkNeighborsSolve(col, row, neighbors, maze);
      const randDir = getRand(goodNeighbors);

      if (randDir) {

        list.push([col, row]);
        visitedCount = visitedCount + 1;


        // random neighbor
				const [nCol, nRow] = neighbors[randDir];
        return backTrack(nCol, nRow, maze);
      }
			else{
				visitedNodesInOrder.push(false);
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

  backTrack(startCol, startRow, maze);
	
  return visitedNodesInOrder;
}
