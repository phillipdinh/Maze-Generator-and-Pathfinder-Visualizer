import {
	getRand,
	checkNeighbors,
	oppDir,
	getDirection
} from "../components/Maze/Maze-Helper"

/* Given maze state
 * Generate walls of maze with recursive randomized Prim's Algorithm
 * Return list of visited nodes while processing
 */
export default function primGen(maze) {
	function recurse(node) {
		node.visited = true
		updateNeighbors(node, openNodes, maze)

		do {
			if (openNodes.length <= 0) return

			var randNode = getRand(openNodes)
			var prevNode = randNode.prevNode
			var dir = getDirection(randNode, prevNode)

			removeNode(randNode, openNodes, maze)
		} while (randNode.visited === true)

		visitedNodes.push([randNode, dir])
		visitedNodes.push([prevNode, oppDir(dir)])
		return recurse(randNode)
	}
	const visitedNodes = []
	const openNodes = []
	recurse(maze[0][0])
	return visitedNodes
}

// Set prevNode to current node of all neighbors of current node
function updateNeighbors(node, openNodes, maze) {
	const neighbors = checkNeighbors(node.col, node.row, maze)
	for (const n of neighbors) {
		n.prevNode = node
		openNodes.push(n)
	}
}

// Remove node from list of open nodes when done processing
function removeNode(randNode, openNodes) {
	const index = openNodes.indexOf(randNode)
	if (index > -1) {
		openNodes.splice(index, 1)
	}
}
