import {
	getNeighbors,
	getRand,
	checkNeighbors,
	getOppDir,
	getDirection
} from "../components/Maze/Maze-Helper"

export default function primGen(maze) {
	function recurse(node) {
		node.visited = true
		const validNeighbors = checkNeighbors(node.col, node.row, maze)

		//TODO: update so it uses the previous node prop and clean up neighbor functions

		//Push all valid neighbors with its opposite direction to openNodes
		//to delete the connected wall from the original node when neighbor is processed

		// Set current node as previous node for all neighbors
		for (const neighbor of validNeighbors) {
			neighbor.previousNode = node
			openNodes.push(neighbor)
		}

		// Randomly chose and remove nodes from openNodes if it is visited or its prevNode is the border
		do {
			if (openNodes.length <= 0) return

			var randNode = getRand(openNodes)
			var prevNode = randNode.previousNode
			var dirOfPrev = getDirection(randNode, prevNode)

			// Remove node from openNodes
			const index = openNodes.indexOf(randNode)
			if (index > -1) openNodes.splice(index, 1)
		} while (randNode.visited === true)

		visitedNodes.push([randNode, dirOfPrev])
		visitedNodes.push([prevNode, getOppDir(dirOfPrev)])
		return recurse(randNode)
	}

	const visitedNodes = []
	const openNodes = []
	recurse(maze[0][0])

	return visitedNodes
}
