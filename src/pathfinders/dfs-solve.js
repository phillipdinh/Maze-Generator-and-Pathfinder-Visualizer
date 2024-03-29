import { getRand, checkNeighborsSolve } from "../components/Maze/Maze-Helper"

/* Given starting node, finish node, maze state
 * Find path from start to finish in maze with randomized recursive Depth First Search
 * Return list of visited nodes while processing
 */
export default function dfsSolve(startNode, finishNode, maze) {
	function backTrack(node, maze) {
		node.visited = true

		if (node === finishNode) {
			return
		}
		visitedNodes.push(node)

		// backTrack() and mark node as false if no valid neighbors are found
		if (visitedCount < maze.length * maze[0].length) {
			const neighbors = checkNeighborsSolve(node.col, node.row, maze)
			const nbr = getRand(neighbors)

			if (nbr) {
				openNodes.push(node)
				visitedCount = visitedCount + 1
				return backTrack(maze[nbr.col][nbr.row], maze)
			}
			visitedNodes.push(false)

			if (openNodes.length > 0) {
				const lastNode = openNodes.pop()
				return backTrack(lastNode, maze)
			}
			return
		}
	}
	const visitedNodes = []
	const openNodes = []
	var visitedCount = 0

	backTrack(startNode, maze)
	return visitedNodes
}
