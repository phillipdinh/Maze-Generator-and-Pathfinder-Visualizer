import {
	getNeighbors,
	getRand,
	checkNeighbors,
	getOppDir
} from "../components/Maze/Maze-Helper"

/*
 * Generates maze path with a randomized recursive DFS method
 */
export default function dfsGen(startCol, startRow, maze) {
	function backTrack(col, row, maze) {
		maze[col][row].visited = true

		if (visitedCount < maze.length * maze[0].length) {
			// Choose a random neighbor
			const neighbors = getNeighbors(col, row)
			const validNeighbors = checkNeighbors(neighbors, maze)
			const randDir = getRand(validNeighbors)

			// Add randDir to DFS path if valid
			if (randDir) {
				visitedCount = visitedCount + 1
				const [nCol, nRow] = neighbors[randDir]
				stack.push([col, row])

				visitedNodesInOrder.push([maze[col][row], [randDir]])
				visitedNodesInOrder.push([maze[nCol][nRow], getOppDir(randDir)])
				return backTrack(nCol, nRow, maze)
			}
			visitedNodesInOrder.push([maze[col][row]])
			// Called when current node has no valid neighbors
			if (stack.length > 0) {
				const lastNode = stack.pop()
				return backTrack(lastNode[0], lastNode[1], maze)
			}
			return
		}
	}

	const visitedNodesInOrder = []
	const stack = []
	var visitedCount = 0
	backTrack(startCol, startRow, maze)

	return visitedNodesInOrder
}
