import { checkNeighborsSolve, removeRandNode } from "../components/Maze/Maze-Helper"

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

function updateNeighbor(neighbor, distance, closestNode, finishNode) {
	neighbor.distance = distance
	neighbor.totalDistance = distance + getManhattan(neighbor, finishNode)
	neighbor.prevNode = closestNode
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
		currentNode = currentNode.prevNode
	}

	return nodesInShortestPathOrder
}
