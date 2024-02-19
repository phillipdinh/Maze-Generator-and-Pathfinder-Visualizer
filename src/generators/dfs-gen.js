import {
	getRand,
	checkNeighbors,
	getOppDir,
	getDirection
} from "../components/Maze/Maze-Helper"

export default function dfsGen(maze) {
	function backTrack(node) {
		node.visited = true

		if (visitedCount < maze.length * maze[0].length) {
			// Choose a random neighbor
			const validNeighbors = checkNeighbors(node.col, node.row, maze)
			const randNeighbor = getRand(validNeighbors)

			// Add randDir to DFS path if valid
			if (randNeighbor) {
				visitedCount = visitedCount + 1
				//const [nCol, nRow] = neighbors[randDir]
				stack.push(node)
				const dir = getDirection(node, randNeighbor)

				visitedNodes.push([node, dir])
				visitedNodes.push([randNeighbor, getOppDir(dir)])
				return backTrack(randNeighbor)
			}
			visitedNodes.push([node])
			// Called when current node has no valid neighbors
			if (stack.length > 0) {
				const lastNode = stack.pop()
				return backTrack(lastNode)
			}
			return
		}
	}

	const visitedNodes = []
	const stack = []
	var visitedCount = 0
	backTrack(maze[0][0])

	return visitedNodes
}
