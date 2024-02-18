import { getRand, checkNeighborsSolve } from "../components/Maze/Maze-Helper"

/* Solve maze with recursive DFS and track path taken
 */
export default function dfsSolve(startNode, finishNode, maze) {
	function backTrack(node, maze) {
		node.visited = true

		if (node === finishNode) {
			return
		}
		visitedNodesInOrder.push(node)

		// backTrack() and mark node as false if no valid neighbors are found
		if (visitedCount < maze.length * maze[0].length) {
			const validNeighbors = checkNeighborsSolve(node.col, node.row, maze)
			const randNeighbor = getRand(validNeighbors)

			if (randNeighbor) {
				openNodes.push(node)
				visitedCount = visitedCount + 1
				return backTrack(maze[randNeighbor.col][randNeighbor.row], maze)
			}
			visitedNodesInOrder.push(false)

			if (openNodes.length > 0) {
				const lastNode = openNodes.pop()
				return backTrack(lastNode, maze)
			}
			return
		}
	}

	const visitedNodesInOrder = []
	const openNodes = []
	var visitedCount = 0

	backTrack(startNode, maze)

	return visitedNodesInOrder
}
