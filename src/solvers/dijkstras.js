import { getNeighbors } from "../components/Maze/Maze-Helper"
export default function dijkstra(
	startCol,
	startRow,
	finishCol,
	finishRow,
	maze
) {
	const visitedNodesInOrder = []

	maze[startCol][startRow].distance = 0

	const unvisitedNodes = getAllNodes(maze)
	while (!!unvisitedNodes.length) {
		unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
		const closestNode = unvisitedNodes.shift()

		// If the closest node is at a distance of infinity,
		// we must be trapped and should therefore stop.
		if (closestNode.distance === Infinity) return visitedNodesInOrder
		closestNode.visited = true
		visitedNodesInOrder.push(closestNode)

		if (closestNode === maze[finishCol][finishRow])
			return visitedNodesInOrder

		updateUnvisited(closestNode, maze)
	}
}

/////////////////// Helper FUnctions //////////////////////////
///////////////////////////////////////////////////////////////
function getAllNodes(maze) {
	const nodes = []
	for (const row of maze) {
		for (const node of row) {
			nodes.push(node)
		}
	}
	return nodes
}

function checkUnvisited(col, row, maze) {
	const neighbors = getNeighbors(col, row)
	const goodNeighbors = []

	for (const dir in neighbors) {
		// neighbor col and row
		const [c, r] = neighbors[dir]

		if (c === -1 || r === -1) {
			continue
		}

		// check original node (top, bottom, left, right)
		if (maze[col][row][dir] === false) {
			continue
		}

		// If neighbor has not been visited return good neighbor
		else if (!maze[c][r].visited) {
			goodNeighbors.push(maze[c][r])
		}
	}

	return goodNeighbors
}

function updateUnvisited(node, maze) {
	const goodNeighbors = checkUnvisited(node.col, node.row, maze)

	for (const n of goodNeighbors) {
		n.distance = node.distance + 1
		n.previousNode = node
	}
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getShortestPath(finishNode) {
	const nodesInShortestPathOrder = []
	let currentNode = finishNode
	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode)
		currentNode = currentNode.previousNode
	}
	return nodesInShortestPathOrder
}
