import { checkNeighborsSolve } from "../components/Maze/Maze-Helper"

export default function aStar(startNode, finishNode, maze) {
	const openNodes = []
	const visitedNodesInOrder = []

	startNode.distance = 0
	openNodes.push(startNode)

	while (!!openNodes.length) {
		openNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance)

		const closestNode = openNodes.shift()
		closestNode.visited = true
		visitedNodesInOrder.push(closestNode)
		if (closestNode === finishNode) return visitedNodesInOrder

		const neighbors = checkNeighborsSolve(closestNode.col, closestNode.row, maze)

		//TODO Try remove the duplicate code
		for (const neighbor of neighbors) {
			const distance = closestNode.distance + 1

			if (!isNeighborInOpenNodes(neighbor, openNodes)) {
				openNodes.unshift(neighbor)
				updateNeighbor(neighbor, distance, closestNode, finishNode)
			} else if (distance < neighbor.distance) {
				updateNeighbor(neighbor, distance, closestNode, finishNode)
			}
		}
	}
	return visitedNodesInOrder
}

function updateNeighbor(neighbor, distance, closestNode, finishNode) {
	neighbor.distance = distance
	neighbor.totalDistance = distance + getManhattan(neighbor, finishNode)
	neighbor.previousNode = closestNode
}
function getManhattan(node, finishNode) {
	return Math.abs(node.col - finishNode.col) + Math.abs(node.row - finishNode.col)
}

function isNeighborInOpenNodes(neighbor, openNodes) {
	for (const node of openNodes) {
		if (node.row === neighbor.row && node.col === neighbor.col) return true
	}

	return false
}

export function getShortestPath_aStar(finishNode) {
	const nodesInShortestPathOrder = []
	let currentNode = finishNode

	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode)
		currentNode = currentNode.previousNode
	}

	return nodesInShortestPathOrder
}
