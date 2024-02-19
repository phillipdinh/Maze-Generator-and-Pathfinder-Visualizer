import { checkNeighborsSolve, removeRandNode } from "../components/Maze/Maze-Helper"
export default function dijkstra(startNode, finishNode, maze) {
	startNode.distance = 0
	const visitedNodes = []
	const openNodes = getAllNodes(maze)

	while (!!openNodes.length) {
		openNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)

		let closestNodes = openNodes.filter(
			(node) => node.distance === openNodes[0].distance
		)
		const closestNode = removeRandNode(closestNodes, openNodes)

		// If the closest node is at a distance of infinity,
		// we must be trapped and should therefore stop.
		if (closestNode.distance === Infinity) {
			return visitedNodes
		}
		closestNode.visited = true
		visitedNodes.push(closestNode)

		if (closestNode === finishNode) {
			return visitedNodes
		}
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
	for (const neighbor of validNeighbors) {
		neighbor.distance = node.distance + 1
		neighbor.prevNode = node
	}
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getShortestPath_dijkstras(finishNode) {
	const nodesInShortestPathOrder = []
	let currentNode = finishNode
	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode)
		currentNode = currentNode.prevNode
	}
	return nodesInShortestPathOrder
}
