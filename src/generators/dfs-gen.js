import {
	getNeighbors,
	getRand,
	checkNeighbors,
	getAllNodes,
	getOppDir
} from "../components/Maze/Maze-Helper"

export default function dfsGen(startCol, startRow, grid) {
	function backTrack(col, row, maze) {
		maze[col][row].visited = true

		visitedNodesInOrder.push(maze[col][row])

		if (visitedCount < maze.length * maze[0].length) {
			const neighbors = getNeighbors(col, row)
			const goodNeighbors = checkNeighbors(col, row, neighbors, maze)
			const randDir = getRand(goodNeighbors)

			if (randDir) {
				const [nCol, nRow] = neighbors[randDir]
				list.push([col, row])
				visitedCount = visitedCount + 1

				//Wall
				//updateMaze(col, row, randDir, true);
				visitedNodesInOrder.push(randDir)

				//const oppD = getOppDir(randDir);
				//const neighbors = getNeighbors(node.col, node.row);
				//const nextNode = neighbors[direction];

				visitedNodesInOrder.push(maze[nCol][nRow])
				visitedNodesInOrder.push(getOppDir(randDir))

				// random neighbor
				return backTrack(nCol, nRow, maze)
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
