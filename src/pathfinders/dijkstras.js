import { checkNeighborsSolve, removeRandNode } from "../components/Maze/Maze-Helper"

/* Given starting node, finish node, maze state
 * Find path from start to finish in maze with randomized Dijkstra's Algorithm
 * Return list of visited nodes while processing
 */
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

// Flatten maze (2d array of nodes) to 1d array
function getAllNodes(maze) {
	const nodes = []
	for (const row of maze) {
		for (const node of row) {
			nodes.push(node)
		}
	}
	return nodes
}

// Set distance of all neighbors to current distance + 1 and prevNode to current node
function updateUnvisited(node, maze) {
	const validNeighbors = checkNeighborsSolve(node.col, node.row, maze)
	for (const neighbor of validNeighbors) {
		neighbor.distance = node.distance + 1
		neighbor.prevNode = node
	}
}

/* Return list of nodes in path from start to finish.
 * Use finish node to backstep through prevNodes to get path
 * Only works after dijkstras function is called
 */
export function getShortestPath_dijkstras(finishNode) {
	const nodesInShortestPathOrder = []
	let currentNode = finishNode
	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode)
		currentNode = currentNode.prevNode
	}
	return nodesInShortestPathOrder
}
