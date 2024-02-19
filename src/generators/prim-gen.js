import {
	getNeighbors,
	getRand,
	checkNeighbors,
	getOppDir,
	getDirection
} from "../components/Maze/Maze-Helper"

//TODO: Update to use previous node
export default function primGen(maze) {
	function recurse(node) {
		node.visited = true
		const neighbors = getNeighbors(node.col, node.row)
		const validNeighbors = checkNeighbors(neighbors, maze)

		/* Push all valid neighbors with its opposite direction to openNodes
		 * to delete the connected wall from the original node when neighbor is processed
		 */
		for (const direction of validNeighbors) {
			neighbors[direction].push(getOppDir(direction))
			openNodes.push(neighbors[direction])
		}

		// Set current node as previous node for all neighbors
		/* for (const neighbor of validNeighbors) {
			neighbor.previousNode = node
			openNodes.push(neighbor)
		} */

		// Randomly chose and remove nodes from openNodes if it is visited or its prevNode is the border
		do {
			if (openNodes.length <= 0) return

			// Choose random node in openNodes. dir will be direction of previous node
			const randNode = getRand(openNodes)
			var [c, r, dir] = randNode

			//TODO: update so it uses the previous node prop and clean up neighbor functions
			// Get index of previous node in path

			const randNeighbors = getNeighbors(c, r)
			console.log(randNeighbors[dir])
			var [nCol, nRow] = randNeighbors[dir]

			/* var prevNode = randNode.previousNode
			var dirOfPrev = getDirection(randNode, prevNode)
			console.log(prevNode) */

			// Get index of previous node in path

			// Remove node from openNodes
			const index = openNodes.indexOf(randNode)
			if (index > -1) openNodes.splice(index, 1)
		} while (maze[c][r].visited === true)
		//} while (prevNode.col === -1 || prevNode.row === -1 || randNode.visited === true)

		//visitedNodes.push([randNode, dirOfPrev])
		//visitedNodes.push([prevNode, getOppDir(dirOfPrev)])
		visitedNodes.push([maze[c][r], dir])
		visitedNodes.push([maze[nCol][nRow], getOppDir(dir)])
		return recurse(maze[c][r])
	}

	const visitedNodes = []
	const openNodes = []
	recurse(maze[0][0])

	return visitedNodes
}
