import {
	getNeighbors,
	getRand,
	checkNeighbors,
	getOppDir
} from "../components/Maze/Maze-Helper"

export default function primGen(startCol, startRow, maze) {
	// clearMaze();
	function recurse(col, row) {
		//await setNewNode(col, row);
		maze[col][row].visited = true

		const neighbors = getNeighbors(col, row)
		const goodNeighbors = checkNeighbors(col, row, neighbors, maze)

		// push all good neighbors with the opposite direction to the list.
		// (So we can delete the connected wall from the original node when the neighbor is processed)

		for (const direction of goodNeighbors) {
			neighbors[direction].push(getOppDir(direction))
			list.push(neighbors[direction])
		}

		do {
			if (list.length <= 0) {
				return
			}

			const randNode = getRand(list)
			var [c, r, dir] = randNode

			const randNodeNeighbor = getNeighbors(c, r)
			const oppNode = randNodeNeighbor[dir]
			var [nCol, nRow] = oppNode

			const index = list.indexOf(randNode)

			// remove randNode from list
			if (index > -1) list.splice(index, 1)
		} while (nCol === -1 || nRow === -1 || maze[c][r].visited === true) // If the random chosen node is already visited or its oppNode is the border continue

		visitedNodesInOrder.push([maze[c][r], dir])
		visitedNodesInOrder.push([maze[nCol][nRow], getOppDir(dir)])

		return recurse(c, r)
	}

	const visitedNodesInOrder = []
	const list = []

	recurse(startCol, startRow)

	return visitedNodesInOrder
}
