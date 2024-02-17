import {
	getNeighbors,
	getRand,
	checkNeighbors,
	getAllNodes,
	getOppDir
} from "../components/Maze/Maze-Helper"

/*
 * Generates maze path with a randomized dfs method
 */
export default function dfsGen(startCol, startRow, grid) {
	function backTrack(col, row, maze) {
		maze[col][row].visited = true

		// VisitedCount used to check if dfs is complete
		if (visitedCount < maze.length * maze[0].length) {
			const neighbors = getNeighbors(col, row)
			const goodNeighbors = checkNeighbors(col, row, neighbors, maze)
			const randNeighbor = getRand(goodNeighbors)

			if (randNeighbor) {
				const [nCol, nRow] = neighbors[randNeighbor]
				list.push([col, row])
				visitedCount = visitedCount + 1

				visitedNodesInOrder.push([maze[col][row], [randNeighbor]])
				visitedNodesInOrder.push([maze[nCol][nRow], getOppDir(randNeighbor)])

				// Random neighbor
				return backTrack(nCol, nRow, maze)
			} else {
				visitedNodesInOrder.push([maze[col][row]])
			}

			if (list.length > 0) {
				const lastNode = list.pop()
				return backTrack(lastNode[0], lastNode[1], maze)
			}
			return
		}
	}

	const maze = getAllNodes(grid)
	const visitedNodesInOrder = []
	const list = []
	var visitedCount = 0

	backTrack(startCol, startRow, maze)

	return visitedNodesInOrder
}
