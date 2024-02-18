import { checkNeighborsSolve } from "../components/Maze/Maze-Helper"

export default function aStar(startCol, startRow, finishCol, finishRow, maze) {
	const openNodes = []
	const visitedNodesInOrder = []

	maze[startCol][startRow].distance = 0
	openNodes.push(maze[startCol][startRow])

	while (!!openNodes.length) {
		openNodes.sort((nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance)

		const closestNode = openNodes.shift()
		closestNode.visited = true
		visitedNodesInOrder.push(closestNode)
		if (closestNode === maze[finishCol][finishRow]) return visitedNodesInOrder

		const neighbors = checkNeighborsSolve(closestNode.col, closestNode.row, maze)

		/*const validNeighbors = checkNeighborsSolve(
			closestNode.col,
			closestNode.row,
			neighbors,
			maze
		)
        */

		//TODO Check if we can remove the duplicate code
		for (const neighbor of neighbors) {
			console.log(neighbor)
			const distance = closestNode.distance + 1
			if (!isNeighborInOpenNodes(neighbor, openNodes)) {
				openNodes.unshift(neighbor)
				neighbor.distance = distance
				neighbor.totalDistance =
					distance + getManhattan(neighbor, finishRow, finishCol)
				neighbor.previousNode = closestNode
			} else if (distance < neighbor.distance) {
				neighbor.distance = distance
				neighbor.totalDistance =
					distance + getManhattan(neighbor, finishRow, finishCol)
				neighbor.previousNode = closestNode
			}
		}
	}
	return visitedNodesInOrder
}

function getManhattan(node, finishCol, finishRow) {
	return Math.abs(node.col - finishCol) + Math.abs(node.row - finishRow)
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
