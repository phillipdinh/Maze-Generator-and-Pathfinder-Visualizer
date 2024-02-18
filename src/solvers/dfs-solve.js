import {
	getNeighbors,
	getRand,
	checkNeighborsSolve
} from "../components/Maze/Maze-Helper"

/* Solve maze with recursive DFS and track path taken
 */
export default function dfsSolve(startCol, startRow, finishCol, finishRow, maze) {
	function backTrack(col, row, maze) {
		maze[col][row].visited = true

		if (col === finishCol && row === finishRow) {
			return
		}
		visitedNodesInOrder.push(maze[col][row])

		// backTrack() and mark node as false if no valid neighbors are found
		if (visitedCount < maze.length * maze[0].length) {
			//const neighbors = getNeighbors(col, row)
			const validNeighbors = checkNeighborsSolve(col, row, maze)
			const randNeighbor = getRand(validNeighbors)

			if (randNeighbor) {
				openNodes.push([col, row])
				visitedCount = visitedCount + 1

				//const [nCol, nRow] = neighbors[randDir]
				return backTrack(randNeighbor.col, randNeighbor.row, maze)
			}
			visitedNodesInOrder.push(false)

			if (openNodes.length > 0) {
				const lastNode = openNodes.pop()
				return backTrack(lastNode[0], lastNode[1], maze)
			}
			return
		}
	}

	const visitedNodesInOrder = []
	const openNodes = []
	var visitedCount = 0

	backTrack(startCol, startRow, maze)

	return visitedNodesInOrder
}
