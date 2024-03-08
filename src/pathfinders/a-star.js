import { checkNeighborsSolve, removeRandNode } from "../components/Maze/Maze-Helper"

/* Given starting node, finish node, maze state
 * Find path from start to finish in maze with randomized A* Search Algorithm
 * Return list of visited nodes while processing
 */
export default function aStar(startNode, finishNode, maze) {
	const openNodes = []
	const visitedNodes = []

	startNode.distance = 0
	openNodes.push(startNode)

	while (!!openNodes.length) {
		openNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance)

		let closestNodes = openNodes.filter(
			(node) => node.totalDistance === openNodes[0].totalDistance
		)
		const closestNode = removeRandNode(closestNodes, openNodes)
		closestNode.visited = true
		visitedNodes.push(closestNode)

		if (closestNode === finishNode) return visitedNodes

		const neighbors = checkNeighborsSolve(closestNode.col, closestNode.row, maze)

		for (const nbr of neighbors) {
			const distance = closestNode.distance + 1

			if (!isNeighborInOpenNodes(nbr, openNodes)) {
				openNodes.unshift(nbr)
				updateNeighbor(nbr, distance, closestNode, finishNode)
			} else if (distance < nbr.distance) {
				updateNeighbor(nbr, distance, closestNode, finishNode)
			}
		}
	}
	return visitedNodes
}

// Set distance, total distance, and prevNode of given neighbor node
function updateNeighbor(neighbor, distance, closestNode, finishNode) {
	neighbor.distance = distance
	neighbor.totalDistance = distance + getManhattan(neighbor, finishNode)
	neighbor.prevNode = closestNode
}

// Calculate manhattan distance of current node from finish node
function getManhattan(node, finishNode) {
	return Math.abs(node.col - finishNode.col) + Math.abs(node.row - finishNode.col)
}

// Check if neighbornode is in list of open nodes
function isNeighborInOpenNodes(neighbor, openNodes) {
	for (const node of openNodes) {
		if (node.row === neighbor.row && node.col === neighbor.col) return true
	}
	return false
}

/* Return list of nodes in path from start to finish.
 * Use finish node to backstep through prevNodes to get path
 * Only works after aStar function is called
 */
export function getShortestPath_aStar(finishNode) {
	const nodesInShortestPathOrder = []
	let currentNode = finishNode

	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode)
		currentNode = currentNode.prevNode
	}
	return nodesInShortestPathOrder
}
