/* Given maze state
 * Generate walls of maze with recursive randomized Recursive Division
 * Return list of visited nodes while processing
 */
export default function divGen(maze) {
	function divide(col, row, width, height, orientation) {
		if (width < 2 || height < 2) return

		const horizontal = orientation === "horizontal"
		const length = horizontal ? width : height

		// Choose wall
		var wx = col + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)))
		var wy = row + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0)

		// Choose passage in wall
		const px = wx + (horizontal ? Math.floor(Math.random() * width) : 0)
		const py = wy + (horizontal ? 0 : Math.floor(Math.random() * height))

		drawMaze(wx, wy, px, py, length, horizontal)

		// One side of wall
		var nx = col
		var ny = row
		var w = horizontal ? width : wx - col + 1
		var h = horizontal ? wy - row + 1 : height
		divide(nx, ny, w, h, chooseOrientation(w, h))

		// Other side of wall
		nx = horizontal ? col : wx + 1
		ny = horizontal ? wy + 1 : row
		w = horizontal ? width : col + width - wx - 1
		h = horizontal ? row + height - wy - 1 : height
		divide(nx, ny, w, h, chooseOrientation(w, h))
	}

	function drawMaze(wx, wy, px, py, length, horizontal) {
		// Direction
		const dx = horizontal ? 1 : 0
		const dy = horizontal ? 0 : 1

		for (let i = 0; i < length; i++) {
			if (wx !== px || wy !== py) {
				if (horizontal) {
					visitedNodes.push([maze[wx][wy], "bottom"])
					visitedNodes.push([maze[wx][wy + 1], "top"])
				} else {
					visitedNodes.push([maze[wx][wy], "right"])
					visitedNodes.push([maze[wx + 1][wy], "left"])
				}
			} else {
				if (horizontal) {
					visitedNodes.push([maze[px][py]])
					visitedNodes.push([maze[px][py + 1]])
				} else {
					visitedNodes.push([maze[px][py]])
					visitedNodes.push([maze[px + 1][py]])
				}
			}
			wx += dx
			wy += dy
		}
	}

	const visitedNodes = []
	divide(0, 0, 16, 16, chooseOrientation(16, 16))
	return visitedNodes
}

// Return smaller orientation or random if equal
function chooseOrientation(width, height) {
	if (width < height) return "horizontal"
	else if (height < width) return "vertical"
	else {
		return Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical"
	}
}
