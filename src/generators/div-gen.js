import { getAllNodes } from "../components/Maze/Maze-Helper"

export default function divGen(grid) {
	function divide(col, row, width, height, orientation) {
		
		if (width < 2 || height < 2) return

		// Boolean (True if orientation is horizontal)
		const horizontal = orientation === "horizontal"

		// col + 0 if (horizontal) is TRUE
		// col + rand(0 ... width - 2) if FALSE
		var wx = col + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)))

		// row + 0 if (horizontal) is FALSE
		// row + rand(0 ... height - 2) if TRUE
		var wy = row + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0)

		// passage
		const px = wx + (horizontal ? Math.floor(Math.random() * width) : 0)
		const py = wy + (horizontal ? 0 : Math.floor(Math.random() * height))

		// length of wall extends entire width or height
		const length = horizontal ? width : height

		drawMaze(wx, wy, px, py, length, horizontal)

		var nx = col
		var ny = row

		var w = horizontal ? width : wx - col + 1
		var h = horizontal ? wy - row + 1 : height

		divide(nx, ny, w, h, chooseOrientation(w, h))

		nx = horizontal ? col : wx + 1
		ny = horizontal ? wy + 1 : row

		w = horizontal ? width : col + width - wx - 1
		h = horizontal ? row + height - wy - 1 : height

		divide(nx, ny, w, h, chooseOrientation(w, h))
	}

	function drawMaze(wx, wy, px, py, length, horizontal) {
		// direction
		const dx = horizontal ? 1 : 0
		const dy = horizontal ? 0 : 1

		for (let i = 0; i < length; i++) {
			if (wx !== px || wy !== py) {
				if (horizontal) {
					visitedNodesInOrder.push([maze[wx][wy], "bottom"])
					visitedNodesInOrder.push([maze[wx][wy + 1], "top"])
				} else {
					visitedNodesInOrder.push([maze[wx][wy], "right"])
					visitedNodesInOrder.push([maze[wx + 1][wy], "left"])
				}
			} else {
				if (horizontal) {
					visitedNodesInOrder.push([maze[px][py]])
					visitedNodesInOrder.push([maze[px][py + 1]])
				} else {
					visitedNodesInOrder.push([maze[px][py]])
					visitedNodesInOrder.push([maze[px + 1][py]])
				}
			}

			// go to next node
			wx += dx
			wy += dy
		}
	}

	// Have to set maze to empty first
	const maze = getAllNodes(grid)
	const visitedNodesInOrder = []

	divide(0, 0, 16, 16, chooseOrientation(16, 16))

	return visitedNodesInOrder
}

/* Horizontal   if Height is larger
 * Vertical     if Width if larger
 * Return either randomly if equal
 */
function chooseOrientation(width, height) {
	if (width < height) return "horizontal"
	else if (height < width) return "vertical"
	else {
		return Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical"
	}
}
