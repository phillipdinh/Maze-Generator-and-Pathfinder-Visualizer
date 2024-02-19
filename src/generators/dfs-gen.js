import {
	getRand,
	checkNeighbors,
	oppDir,
	getDirection
} from "../components/Maze/Maze-Helper"

export default function dfsGen(maze) {
	function backTrack(node) {
		node.visited = true

		if (count < maze.length * maze[0].length) {
			const neighbors = checkNeighbors(node.col, node.row, maze)
			const nbr = getRand(neighbors)

			if (nbr) {
				count = count + 1
				stack.push(node)
				const dir = getDirection(node, nbr)

				visitedNodes.push([node, dir])
				visitedNodes.push([nbr, oppDir(dir)])
				return backTrack(nbr)
			}
			visitedNodes.push([node])

			if (stack.length > 0) {
				const lastNode = stack.pop()
				return backTrack(lastNode)
			}
			return
		}
	}
	const visitedNodes = []
	const stack = []
	var count = 0

	backTrack(maze[0][0])
	return visitedNodes
}
