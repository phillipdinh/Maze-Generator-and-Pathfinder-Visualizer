import {
	getNeighbors,
	getRand,
	checkNeighbors,
	getOppDir
} from "../components/Maze/Maze-Helper"

export default function primGen(startCol, startRow, maze) {
	function recurse(col, row) {
		maze[col][row].visited = true
		const neighbors = getNeighbors(col, row)
		const validNeighbors = checkNeighbors(neighbors, maze)

		/* Push all valid neighbors with its opposite direction to list
		 * to delete the connected wall from the original node when neighbor is processed
		 */
		for (const direction of validNeighbors) {
			neighbors[direction].push(getOppDir(direction))
			list.push(neighbors[direction])
		}

		// Randomly chose and remove nodes from list if it is visited or its prevNode is the border
		do {
			if (list.length <= 0) return

			// Choose random node in list. dir will be direction of previous node
			const randNode = getRand(list)
			var [c, r, dir] = randNode

			// Get index of previous node in path
			const randNodeNeighbor = getNeighbors(c, r)
			const prevNode = randNodeNeighbor[dir]
			var [nCol, nRow] = prevNode

			// Remove node from list
			const index = list.indexOf(randNode)
			if (index > -1) list.splice(index, 1)
		} while (nCol === -1 || nRow === -1 || maze[c][r].visited === true)

		visitedNodesInOrder.push([maze[c][r], dir])
		visitedNodesInOrder.push([maze[nCol][nRow], getOppDir(dir)])
		return recurse(c, r)
	}

	const visitedNodesInOrder = []
	const list = []
	recurse(startCol, startRow)

	return visitedNodesInOrder
}
