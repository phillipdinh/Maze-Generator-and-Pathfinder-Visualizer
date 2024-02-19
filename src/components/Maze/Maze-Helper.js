// Shared functions used by generators and solvers

/* Return object with the indexes of all ajacent neighbors
 * or set direction to [-1, -1] if given indexes are on the border
 */
export function getNeighbors(col, row) {
	return {
		top: row <= 0 ? [-1, -1] : [col, row - 1],
		right: col >= 15 ? [-1, -1] : [col + 1, row],
		bottom: row >= 15 ? [-1, -1] : [col, row + 1],
		left: col <= 0 ? [-1, -1] : [col - 1, row]
	}
}

/* Given an object neighbors with direction keys and index values
 * return array of unvisited neighbors as directions
 */
export function checkNeighbors(col, row, maze) {
	const neighbors = getNeighbors(col, row)
	const validNeighbors = []

	for (const dir in neighbors) {
		const [c, r] = neighbors[dir]

		if (c === -1 || r === -1) {
			continue
		} else if (!maze[c][r].visited) {
			validNeighbors.push(maze[c][r])
		}
	}

	return validNeighbors
}

/* Similar to checkNeighbors() but also checks if neighbor is blocked by a wall
 * Returns an array of nodes
 */
export function checkNeighborsSolve(col, row, maze) {
	const neighbors = getNeighbors(col, row)
	const validNeighbors = []

	for (const dir in neighbors) {
		const [c, r] = neighbors[dir]

		if (c === -1 || r === -1 || maze[col][row][dir] === false) {
			continue
		} else if (!maze[c][r].visited) {
			validNeighbors.push(maze[c][r])
		}
	}

	return validNeighbors
}

/* Choose random index in array
 * Used to choose a random neighbor
 */
export function getRand(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

/* Return the opposite direction given
 */
export function oppDir(dir) {
	if (dir === "top") {
		return "bottom"
	} else if (dir === "bottom") {
		return "top"
	} else if (dir === "left") {
		return "right"
	} else if (dir === "right") {
		return "left"
	}
}

export function getDirection(nodeA, nodeB) {
	const col = nodeA.col - nodeB.col
	const row = nodeA.row - nodeB.row

	if (col < 0) {
		return "right"
	} else if (col > 0) {
		return "left"
	} else if (row > 0) {
		return "top"
	} else if (row < 0) {
		return "bottom"
	}
}

export function removeRandNode(closest, openNodes) {
	for (let i = closest.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[closest[i], closest[j]] = [closest[j], closest[i]]
	}
	const closestIndex = openNodes.findIndex((node) => node === closest[0])

	return openNodes.splice(closestIndex, 1)[0]
}
