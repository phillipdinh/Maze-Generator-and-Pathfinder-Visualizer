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
 * return array of unvisited neighbors with valid indexes
 */
export function checkNeighbors(neighbors, maze) {
	return Object.keys(neighbors).filter((direction) => {
		const [c, r] = neighbors[direction]

		if (c === -1 || r === -1) return false

		if (!maze[c][r].visited) {
			const validNeighbor = maze[c][r]
			return validNeighbor
		}
		return false
	})
}

/* Similar to checkNeighbors() but also checks if neighbor is blocked by a wall
 */
export function checkNeighborsSolve(col, row, neighbors, maze) {
	return Object.keys(neighbors).filter((direction) => {
		const [c, r] = neighbors[direction]

		if (c === -1 || r === -1 || maze[col][row][direction] === false) return false

		if (!maze[c][r].visited) {
			const validNeighbor = maze[c][r]
			return validNeighbor
		}
		return false
	})
}

/* Choose random index in array
 * Used to choose a random neighbor
 */
export function getRand(arr) {
	return arr[Math.floor(Math.random() * arr.length)]
}

/* Return the opposite direction given
 */
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
