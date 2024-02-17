/*
 * Shared functions used by generators and solvers
 */

export function getNeighbors(col, row) {
	return {
		top: row <= 0 ? [-1, -1] : [col, row - 1],
		right: col >= 15 ? [-1, -1] : [col + 1, row],
		bottom: row >= 15 ? [-1, -1] : [col, row + 1],
		left: col <= 0 ? [-1, -1] : [col - 1, row]
	}
}

export function checkNeighbors(col, row, neighbors, maze) {
	return Object.keys(neighbors).filter((direction) => {
		const [c, r] = neighbors[direction]

		// If no neighbor return false
		if (c === -1 || r === -1) return false
		// If neighbor has not been visited return good neighbor
		else if (!maze[c][r].visited) {
			const goodNeighbor = maze[c][r]
			return goodNeighbor
		}
		return false
	})
}
export function checkNeighborsSolve(col, row, neighbors, maze) {
	return Object.keys(neighbors).filter((direction) => {
		const [c, r] = neighbors[direction]

		// If no neighbor return false
		if (c === -1 || r === -1) return false
		// If neighbor has not been visited return good neighbor
		if (maze[col][row][direction] === false) return false
		else if (!maze[c][r].visited) {
			const goodNeighbor = maze[c][r]
			return goodNeighbor
		}
		return false
	})
}

export function getRand(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

export function getOppDir(dir) {
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
