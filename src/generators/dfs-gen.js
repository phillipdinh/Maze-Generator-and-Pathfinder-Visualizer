import {
	getNeighbors,
	getRand,
	checkNeighbors,
	getOppDir
} from "../components/Maze/Maze-Helper"

export default function dfsGen(maze) {
	function backTrack(node) {
		node.visited = true

		if (visitedCount < maze.length * maze[0].length) {
			// Choose a random neighbor
			const neighbors = getNeighbors(node.col, node.row)
			const validNeighbors = checkNeighbors(neighbors, maze)
			const randDir = getRand(validNeighbors)

			// Add randDir to DFS path if valid
			if (randDir) {
				visitedCount = visitedCount + 1
				const [nCol, nRow] = neighbors[randDir]
				stack.push(node)

				visitedNodesInOrder.push([node, [randDir]])
				visitedNodesInOrder.push([maze[nCol][nRow], getOppDir(randDir)])
				return backTrack(maze[nCol][nRow])
			}
			visitedNodesInOrder.push([node])
			// Called when current node has no valid neighbors
			if (stack.length > 0) {
				const lastNode = stack.pop()
				return backTrack(lastNode)
			}
			return
		}
	}

	const visitedNodesInOrder = []
	const stack = []
	var visitedCount = 0
	backTrack(maze[0][0])

	return visitedNodesInOrder
}
