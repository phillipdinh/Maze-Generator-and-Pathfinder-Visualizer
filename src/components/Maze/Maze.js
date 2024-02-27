import React, { useState, useRef } from "react"
import Node from "../Node/Node"
import Button from "../Button"
import Loading from "../Loading"

import dijkstra, { getShortestPath_dijkstras } from "../../solvers/dijkstras"
import aStar, { getShortestPath_aStar } from "../../solvers/a-star"
import dfsSolve from "../../solvers/dfs-solve"

import dfsGen from "../../generators/dfs-gen"
import divGen from "../../generators/div-gen"
import primGen from "../../generators/prim-gen"

import "./Maze.css"

/*TODO:
	Add algorithm info
    Add Cancel
    Add header
*/
const DELAY_GEN = 2
const DELAY_SOLVE = 12

export default function Maze() {
	function animateMazeGen(visitedNodes, flag, callback) {
		const len = visitedNodes.length
		for (let i = 0; i < len; i++) {
			const node = visitedNodes[i][0]

			if (visitedNodes[i][1]) {
				const direction = visitedNodes[i][1]
				setTimeout(() => {
					updateMaze(node.col, node.row, direction, flag)
				}, DELAY_GEN * i)
			}
			if (!ifStartFinish(node.col, node.row)) {
				setTimeout(() => {
					updateMaze(node.col, node.row, "active", true)
				}, DELAY_GEN * i)
			}
		}
		resetVisited(DELAY_GEN, visitedNodes.length)
		setGeneratedState(true)
		setTimeout(() => {
			callback()
		}, DELAY_GEN * len)
	}
	function animateShortestPath(nodesInShortestPath, callback) {
		const len = nodesInShortestPath.length
		for (let i = 0; i < len; i++) {
			const node = nodesInShortestPath[i]

			if (!ifStartFinish(node.col, node.row)) {
				setTimeout(() => {
					setShortestPath(node.col, node.row)
				}, DELAY_SOLVE * i)
			}
		}
		resetVisited(DELAY_SOLVE, nodesInShortestPath.length)
		setGeneratedState(true)
		setTimeout(() => {
			callback()
		}, DELAY_SOLVE * len)
	}
	function animateDFSSolve(visitedNodes, callback) {
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
		setTimeout(() => {
			callback()
		}, DELAY_SOLVE * len)
	}
	const visualize_dfsGen = (callback) => {
		resetMaze()
		const visitedNodes = dfsGen(maze)
		animateMazeGen(visitedNodes, true, callback)
	}
	const visualize_divGen = (callback) => {
		resetMaze()
		delWalls()
		const visitedNodes = divGen(maze)
		animateMazeGen(visitedNodes, false, callback)
	}
	const visualize_primGen = (callback) => {
		resetMaze()
		const visitedNodes = primGen(maze)
		animateMazeGen(visitedNodes, true, callback)
	}

	const visualize_dfsSolve = (callback) => {
		if (!generatedState) {
			callback()
			return
		}
		resetSolve()
		const visitedNodes = dfsSolve(
			maze[start.current.col][start.current.row],
			maze[finish.current.col][finish.current.row],
			maze
		)
		animateDFSSolve(visitedNodes, callback)
	}

	const visualize_dijkstras = (callback) => {
		if (!generatedState) {
			callback()
			return
		}
		resetSolve()
		const visitedNodes = dijkstra(
			maze[start.current.col][start.current.row],
			maze[finish.current.col][finish.current.row],
			maze
		)
		const nodesInShortestPath = getShortestPath_dijkstras(
			maze[finish.current.col][finish.current.row]
		)
		markNodes(visitedNodes, nodesInShortestPath, callback)
	}
	const visualize_aStar = (callback) => {
		if (!generatedState) {
			callback()
			return
		}
		resetSolve()
		const visitedNodes = aStar(
			maze[start.current.col][start.current.row],
			maze[finish.current.col][finish.current.row],
			maze
		)
		const nodesInShortestPath = getShortestPath_aStar(
			maze[finish.current.col][finish.current.row]
		)
		markNodes(visitedNodes, nodesInShortestPath, callback)
	}

	/* Used by visualize_dijkstras and visualize_aStar
	 *
	 */
	function markNodes(visitedNodes, nodesInShortestPath, callback) {
		const len = visitedNodes.length
		for (let i = 0; i < len; i++) {
			const node = visitedNodes[i]
			if (!ifStartFinish(node.col, node.row)) {
				setTimeout(() => {
					stepCount.current = stepCount.current + 1
					setMarked(node.col, node.row)
				}, DELAY_SOLVE * i)
			}
		}
		setTimeout(() => {
			animateShortestPath(nodesInShortestPath, callback)
		}, DELAY_SOLVE * len)
	}

	function updateMaze(col, row, prop, update) {
		let copyMaze = [...maze]
		copyMaze[col][row][prop] = update
		setMaze(copyMaze)
	}

	function setMarked(col, row) {
		updateMaze(col, row, "inPath", false)
		updateMaze(col, row, "walls", false)
		updateMaze(col, row, "marked", true)
	}

	function setShortestPath(col, row) {
		updateMaze(col, row, "walls", false)
		updateMaze(col, row, "inPath", true)
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
					updateMaze(c, r, "inPath", false)
					updateMaze(c, r, "marked", false)
					updateMaze(c, r, "active", false)
				}
				updateMaze(c, r, "prevNode", null)
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
		start.current.col = Math.floor(Math.random() * 16)
		start.current.row = Math.floor(Math.random() * 16)
		finish.current.col = Math.floor(Math.random() * 16)
		finish.current.row = Math.floor(Math.random() * 16)

		// Make sure start and finish are more than 5 nodes aways
		if (
			Math.abs(start.current.col - finish.current.col) < 5 ||
			Math.abs(start.current.row - finish.current.row) < 5
		) {
			getRandStartFinish()
		}
	}

	function ifStartFinish(col, row) {
		if (
			(col === start.current.col && row === start.current.row) ||
			(col === finish.current.col && row === finish.current.row)
		) {
			return true
		} else {
			return false
		}
	}

	function resetMaze() {
		setLoadingState(true)
		setGeneratedState(false)
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
		updateMaze(start.current.col, start.current.row, "start", true)
		updateMaze(finish.current.col, finish.current.row, "finish", true)
	}

	const [maze, setMaze] = useState(mazeInit())
	const [loadingState, setLoadingState] = useState(false)
	const [generatedState, setGeneratedState] = useState(false)

	const stepCount = useRef(0)
	const start = useRef({ col: 0, row: 0 })
	const finish = useRef({ col: 0, row: 0 })

	const styles = {
		display: "inline-grid",
		gridTemplateColumns: `repeat(${16}, 1fr)`
	}

	// prettier-ignore
	return (
		<div className="maze-container">
			<div className="buttons-div">
				<div className="buttons-column">
					<p className="buttons-header">Generate</p>
                    <Button className="alg-button" onClick={visualize_dfsGen} label="DFS"/>
                    <Button className="alg-button" onClick={visualize_primGen} label="Prim's"/>
                    <Button className="alg-button" onClick={visualize_divGen} label="Division"/>
				</div>
				<div className="buttons-column">
					<p className="buttons-header">Solve</p>
                    <Button className="alg-button" onClick={visualize_dfsSolve} label="DFS"/>
                    <Button className="alg-button" onClick={visualize_dijkstras} label="Dijkstra's"/>
                    <Button className="alg-button" onClick={visualize_aStar} label="A* Search"/>
				</div>
                <div className="footer">
                    <button
                        className="reset-button"
                        onClick={() => {
                            resetMaze() 
                            setLoadingState(false)
                        }}
                    >
                        Reset
                    </button>

                    <div className="step-count">
                        Steps:
                        <p className="step-text"> {stepCount.current}</p>
                    </div>
                </div>
                {loadingState && <Loading className="loading-overlay"/>}
                {!generatedState && <div className="warning">Please generate maze first!</div>}
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
										inPath
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
											inPath={inPath}
										></Node>
									)
								})}
							</div>
						)
					})}
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
		inPath: false,
		visited: false,
		distance: Infinity,
		totalDistance: Infinity,
		prevNode: null
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
