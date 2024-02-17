import React from "react"
import Node from "../Node/Node"

import dijkstra, { getShortestPath } from "../../solvers/dijkstras"
import dfsSolve from "../../solvers/dfs-solve"

import dfsGen from "../../generators/dfs-gen"
import divGen from "../../generators/div-gen"
import primGen from "../../generators/prim-gen"

import "./Maze.css"

/*TODO:
	Change UI
	Add algorithm inffo
*/
const DELAY_GEN = 10
const DELAY_SOLVE = 5

export default function Maze() {
	function animateMazeGen(visitedNodes, flag) {
		console.log(visitedNodes)
		// for (let i = 0; i < visitedNodes.length; i++) {
		// 	// If a node
		// 	if (!oppDir.hasOwnProperty(visitedNodes[i])) {
		// 		const node = visitedNodes[i]

		// 		if (oppDir.hasOwnProperty(visitedNodes[i + 1])) {
		// 			const direction = visitedNodes[i + 1]

		// 			setTimeout(() => {
		// 				updateMaze(node.col, node.row, direction, flag)
		// 			}, DELAY_GEN * i)
		// 		}

		// 		if (!ifStartFinish(node.col, node.row)) {
		// 			setTimeout(() => {
		// 				updateMaze(node.col, node.row, "active", true)
		// 			}, DELAY_GEN * i)
		// 		}
		// 	}
		// }
		for (let i = 0; i < visitedNodes.length; i++) {
			const node = visitedNodes[i][0]

			if (visitedNodes[i][1]) {
				const direction = visitedNodes[i][1]

				setTimeout(() => {
					updateMaze(node.col, node.row, direction, flag)
				}, DELAY_GEN * i)
			}

			console.log(node)
			if (!ifStartFinish(node.col, node.row)) {
				setTimeout(() => {
					updateMaze(node.col, node.row, "active", true)
				}, DELAY_GEN * i)
			}
		}
		resetVisited(DELAY_GEN, visitedNodes.length)
	}

	function visualizeDfsGen() {
		resetMaze()
		const visitedNodes = dfsGen(startCol.current, startRow.current, maze)
		animateMazeGen(visitedNodes, true)
	}

	function visualizeDivGen() {
		resetMaze()
		delWalls()
		const visitedNodes = divGen(maze)
		animateMazeGen(visitedNodes, false)
	}

	function visualizePrimGen() {
		resetMaze()
		const visitedNodes = primGen(startCol.current, startRow.current, maze)
		animateMazeGen(visitedNodes, true)
	}

	function visualizeDfsSolve() {
		resetSolve()
		const visitedNodes = dfsSolve(
			startCol.current,
			startRow.current,
			finishCol.current,
			finishRow.current,
			maze
		)

		const len = visitedNodes.length
		for (let i = 1; i < len; i++) {
			if (visitedNodes[i] === false) continue
			const node = visitedNodes[i]

			setTimeout(() => {
				stepCount.current = stepCount.current + 1
				setShortestPath(node.col, node.row)
			}, DELAY_SOLVE * i)

			if (i < len - 1 && visitedNodes[i + 1] === false) {
				setTimeout(() => {
					setMarked(node.col, node.row)
				}, DELAY_SOLVE * i)
			}
		}
		resetVisited(DELAY_SOLVE, visitedNodes.length)
	}

	function animateShortestPathDij() {
		const nodesInShortestPath = getShortestPath(
			maze[finishCol.current][finishRow.current]
		)

		for (let i = 0; i < nodesInShortestPath.length; i++) {
			const node = nodesInShortestPath[i]

			if (!ifStartFinish(node.col, node.row)) {
				setTimeout(() => {
					setShortestPath(node.col, node.row)
				}, DELAY_SOLVE * i)
			}
		}
		resetVisited(DELAY_SOLVE, nodesInShortestPath.length)
	}

	function visualizeDijkstras() {
		resetSolve()
		const visitedNodes = dijkstra(
			startCol.current,
			startRow.current,
			finishCol.current,
			finishRow.current,
			maze
		)

		for (let i = 0; i < visitedNodes.length; i++) {
			if (i === visitedNodes.length - 1) {
				setTimeout(() => {
					animateShortestPathDij()
				}, DELAY_SOLVE * i)
			}
			const node = visitedNodes[i]
			if (!ifStartFinish(node.col, node.row)) {
				setTimeout(() => {
					stepCount.current = stepCount.current + 1
					setMarked(node.col, node.row)
				}, DELAY_SOLVE * i)
			}
		}
	}

	function updateMaze(col, row, prop, update) {
		let copyMaze = [...maze]
		copyMaze[col][row][prop] = update
		setMaze(copyMaze)
	}

	function setMarked(col, row) {
		updateMaze(col, row, "sp", false)
		updateMaze(col, row, "walls", false)
		updateMaze(col, row, "marked", true)
	}

	function setShortestPath(col, row) {
		updateMaze(col, row, "walls", false)
		updateMaze(col, row, "sp", true)
	}

	function delWalls() {
		for (let c = 0; c < 16; c++) {
			for (let r = 0; r < 16; r++) {
				updateMaze(c, r, "left", true)
				updateMaze(c, r, "right", true)
				updateMaze(c, r, "top", true)
				updateMaze(c, r, "bottom", true)

				if (r === 0) updateMaze(c, r, "top", false)
				else if (r === 15) updateMaze(c, r, "bottom", false)

				if (c === 0) updateMaze(c, r, "left", false)
				else if (c === 15) updateMaze(c, r, "right", false)
			}
		}
	}

	function resetSolve() {
		setLoadingState(true)
		stepCount.current = 0

		for (let c = 0; c < 16; c++) {
			for (let r = 0; r < 16; r++) {
				if (!ifStartFinish(c, r)) {
					updateMaze(c, r, "sp", false)
					updateMaze(c, r, "marked", false)
					updateMaze(c, r, "active", false)
				}
			}
		}
	}

	function resetVisited(delay, lengthNodes) {
		for (let c = 0; c < 16; c++) {
			for (let r = 0; r < 16; r++) {
				updateMaze(c, r, "visited", false)
			}
		}
		setTimeout(() => {
			setLoadingState(false)
		}, delay * lengthNodes)
	}

	function getRandStartFinish() {
		startCol.current = Math.floor(Math.random() * 16)
		startRow.current = Math.floor(Math.random() * 16)
		finishCol.current = Math.floor(Math.random() * 16)
		finishRow.current = Math.floor(Math.random() * 16)

		// Make sure start and finish are more than 2 nodes aways
		if (
			Math.abs(startCol.current - finishCol.current) < 2 ||
			Math.abs(startRow.current - finishRow.current) < 2
		) {
			getRandStartFinish()
		}
	}

	function ifStartFinish(col, row) {
		if (
			(col === startCol.current && row === startRow.current) ||
			(col === finishCol.current && row === finishRow.current)
		) {
			return true
		} else {
			return false
		}
	}

	function resetMaze() {
		setLoadingState(true)
		getRandStartFinish()
		stepCount.current = 0

		const newMaze = mazeInit()

		for (let c = 0; c < 16; c++) {
			for (let r = 0; r < 16; r++) {
				let copyMaze = [...maze]
				copyMaze[c][r] = newMaze[c][r]
				setMaze(copyMaze)
			}
		}

		updateMaze(startCol.current, startRow.current, "start", true)
		updateMaze(finishCol.current, finishRow.current, "finish", true)
	}

	const oppDir = {
		top: "bottom",
		bottom: "top",
		left: "right",
		right: "left"
	}

	const [maze, setMaze] = React.useState(mazeInit())
	const [loadingState, setLoadingState] = React.useState(false)

	const stepCount = React.useRef(0)
	const startCol = React.useRef(0)
	const startRow = React.useRef(0)
	const finishCol = React.useRef(0)
	const finishRow = React.useRef(0)

	const styles = {
		display: "inline-grid",
		gridTemplateColumns: `repeat(${16}, 1fr)`
	}

	return (
		<div className="maze-container">
			<div className="maze-button-div">
				<div className="maze-generate-div">
					<p className="maze-button-header">Generate</p>
					<button
						className="maze-button"
						onClick={() => {
							visualizeDfsGen()
						}}
					>
						Depth First Search
					</button>

					<button
						className="maze-button"
						onClick={() => {
							visualizePrimGen()
						}}
					>
						Prim's MST
					</button>

					<button
						className="maze-button"
						onClick={() => {
							visualizeDivGen()
						}}
					>
						Recursive Division
					</button>
				</div>

				<div className="maze-solve-div">
					<p className="maze-button-header">Solve</p>
					<button
						className="maze-button"
						onClick={() => {
							visualizeDfsSolve()
						}}
					>
						Depth First Search
					</button>

					<button
						className="maze-button"
						onClick={() => {
							visualizeDijkstras()
						}}
					>
						Dijkstra's Shortest Path
					</button>

					<button
						className="maze-button"
						onClick={() => {
							visualizeDijkstras()
						}}
					>
						A* Search
					</button>
				</div>
				{loadingState && <div className="loading-overlay"></div>}
			</div>

			<div className="maze-div">
				<div style={styles} className="maze">
					{maze.map((block, rowIdx) => {
						return (
							<div key={rowIdx}>
								{block.map((node, nodeIdx) => {
									const {
										start,
										finish,
										top,
										bottom,
										left,
										right,
										active,
										marked,
										sp,
										g,
										f
									} = node
									return (
										<Node
											key={nodeIdx}
											start={start}
											finish={finish}
											top={top}
											bottom={bottom}
											left={left}
											right={right}
											active={active}
											marked={marked}
											sp={sp}
											g={g}
											f={f}
										></Node>
									)
								})}
							</div>
						)
					})}
				</div>

				<button
					className="clear-maze-button"
					onClick={() => {
						resetMaze()
						setLoadingState(false)
					}}
				>
					Clear Maze
				</button>

				<div className="step-count">
					Steps:
					<p className="step-text"> {stepCount.current}</p>
				</div>
			</div>
		</div>
	)
}

const createNode = (col, row) => {
	return {
		col,
		row,
		start: false,
		finish: false,
		top: false,
		bottom: false,
		left: false,
		right: false,
		active: false,
		marked: false,
		sp: false,
		visited: false,
		distance: Infinity,
		previousNode: null,
		g: Infinity,
		f: Infinity
	}
}

const mazeInit = () => {
	const grid = []
	for (let c = 0; c < 16; c++) {
		const currCol = []
		for (let r = 0; r < 16; r++) {
			currCol.push(createNode(c, r))
		}
		grid.push(currCol)
	}
	return grid
}
