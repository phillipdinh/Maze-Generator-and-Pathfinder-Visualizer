import { checkNeighborsSolve } from "../components/Maze/Maze-Helper"
export default function dijkstra(startCol, startRow, finishCol, finishRow, maze) {
	const visitedNodesInOrder = []

	maze[startCol][startRow].distance = 0

	const openNodes = getAllNodes(maze)
	while (!!openNodes.length) {
		openNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
		const closestNode = openNodes.shift()

		// If the closest node is at a distance of infinity,
		// we must be trapped and should therefore stop.
		if (closestNode.distance === Infinity) return visitedNodesInOrder
		closestNode.visited = true
		visitedNodesInOrder.push(closestNode)

		if (closestNode === maze[finishCol][finishRow]) return visitedNodesInOrder

		updateUnvisited(closestNode, maze)
	}
}

/////////////////// Helper Functions //////////////////////////
function getAllNodes(maze) {
	const nodes = []
	for (const row of maze) {
		for (const node of row) {
			nodes.push(node)
		}
	}
	return nodes
}

function updateUnvisited(node, maze) {
	const validNeighbors = checkNeighborsSolve(node.col, node.row, maze)

	for (const n of validNeighbors) {
		n.distance = node.distance + 1
		n.previousNode = node
	}
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getShortestPath_dijkstras(finishNode) {
	const nodesInShortestPathOrder = []
	let currentNode = finishNode
	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode)
		currentNode = currentNode.previousNode
	}
	return nodesInShortestPathOrder
}
