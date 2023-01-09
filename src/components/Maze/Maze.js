import React from "react";

import {ifStartFinish} from "./Maze-Helper";
import Node from "../Node/Node";

import dijkstra, { getShortestPath } from "../../solvers/dijkstras";
import dfsSolve from "../../solvers/dfs-solve";

import dfsGen from "../../generators/dfs-gen";
import divGen from "../../generators/div-gen";
import primGen from "../../generators/prim-gen";

import "./Maze.css";

/*TODO:
	Add one more algorithm
	Add step counter
	Disable solve buttons if maze not generated

*/
const FINISH_COL = 15;
const FINISH_ROW = 15;
const DELAY_GEN = 1;
const DELAY_SOLVE = 20;

export default function Maze() {

	function animateMazeGen(visitedNodesInOrder, flag){
		setLoadingState(true);
		for (let i = 0; i < visitedNodesInOrder.length; i++) {
			// If a direction
			if (!oppDir.hasOwnProperty(visitedNodesInOrder[i])) {
				const node = visitedNodesInOrder[i];

				if (oppDir.hasOwnProperty(visitedNodesInOrder[i + 1])) {
					const direction = visitedNodesInOrder[i + 1];

					setTimeout(() => {
						updateMaze(node.col, node.row, direction, flag);
					}, DELAY_GEN * i);
				}

				if (!ifStartFinish(startCol.current, startRow.current, node.col, node.row)){
					setTimeout(() => { 
						updateMaze(node.col, node.row, "active", true);
					}, DELAY_GEN * i);
				}
			}
		}
		resetVisited(visitedNodesInOrder.length);
	}

  function visualizeDfsGen() {
		startCol.current = Math.floor(Math.random() * 16)
		startRow.current = Math.floor(Math.random() * 16)

		resetMaze();

    const visitedNodesInOrder = dfsGen(startCol.current, startRow.current, maze);
		animateMazeGen(visitedNodesInOrder, true)
  }

	function visualizeDivGen(){
		resetMaze();
		delWalls();
		const visitedNodesInOrder = divGen(maze);
		animateMazeGen(visitedNodesInOrder, false)
	};

	
	function visualizePrimGen(){
		resetMaze()
		const visitedNodesInOrder = primGen(maze);
		animateMazeGen(visitedNodesInOrder, true)
	}

	function visualizeDfsSolve(){
		setLoadingState(true);
		resetSolve();
		stepCount.current = 0;
    const visitedNodesInOrder = dfsSolve(maze);

		const len = visitedNodesInOrder.length;
		for (let i = 1; i < len; i++) {
			if (visitedNodesInOrder[i] === false) continue;
			const node = visitedNodesInOrder[i];

			setTimeout(() => {
				stepCount.current = stepCount.current + 1;
				setShortestPath(node.col, node.row)
			}, DELAY_SOLVE * i);

			if ( (i < len - 1) && (visitedNodesInOrder[i+1] === false)){
				setTimeout(() => {
					setChecked(node.col, node.row);
				}, DELAY_SOLVE * i);
			}
		}
		resetVisited(visitedNodesInOrder.length);
	}

	function animateShortestPathDij() {
		const nodesInShortestPath = getShortestPath(maze[FINISH_COL][FINISH_ROW]);

    for (let i = 0; i < nodesInShortestPath.length; i++) {
			const node = nodesInShortestPath[i];

			if (!ifStartFinish(node.col, node.row)) {
				setTimeout(() => {
					setShortestPath(node.col, node.row)
				}, DELAY_SOLVE * i);
			}
    }
		resetVisited(nodesInShortestPath.length);
  }
	
  function visualizeDijkstras() {
    setLoadingState(true);
		resetSolve();

		stepCount.current = 0
    const visitedNodesInOrder = dijkstra(maze);

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length - 1) {
				setTimeout(() => {
					animateShortestPathDij();
				}, DELAY_SOLVE * i);
      }

			const node = visitedNodesInOrder[i];
			if (!ifStartFinish(node.col, node.row)){
				setTimeout(() => {
					stepCount.current = stepCount.current + 1;
					setChecked(node.col, node.row);
				}, DELAY_SOLVE * i); 
			}
    }
  }

  function updateMaze(col, row, prop, update) {
    let copyMaze = [...maze];
    copyMaze[col][row][prop] = update;
    setMaze(copyMaze);
  }

	function setChecked(col, row){
		updateMaze(col, row, "sp", false);
		updateMaze(col, row, "walls", false);
		updateMaze(col, row, "checked", true);
	}

	function setShortestPath(col, row){
		updateMaze(col, row, "walls", false);
		updateMaze(col, row, "sp", true);
	}

	function delWalls() {
		for (let c = 0; c < 16; c++) {
			for (let r = 0; r < 16; r++) {
				updateMaze(c, r, "left", true);
        updateMaze(c, r, "right", true);
        updateMaze(c, r, "top", true);
        updateMaze(c, r, "bottom", true);
			
				if (r === 0) updateMaze(c, r, "top", false);
				else if (r === 15) updateMaze(c, r, "bottom", false);
				
				if (c === 0) updateMaze(c, r, "left", false);
				else if (c === 15) updateMaze(c, r, "right", false);
			}
		}
  }

	function resetSolve(){
		for (let c = 0; c < 16; c++) {
			for (let r = 0; r < 16; r++) {
				if (!ifStartFinish(c, r)){
					updateMaze(c, r, "sp", false);
					updateMaze(c, r, "checked", false);
					updateMaze(c, r, "active", false);
				}
			}
		}
	}

  function resetVisited(lengthNodes) {
		for (let c = 0; c < 16; c++) {
			for (let r = 0; r < 16; r++) {
				updateMaze(c, r, "visited", false);
			}
		}
		setTimeout(() => {
			setLoadingState(false);
		}, DELAY_GEN * lengthNodes); 
  }

	function resetMaze(){
		const newMaze = mazeInit();
		newMaze.map((col, colIdx) => {
      col.map((node, rowIdx) => {
				let copyMaze = [...maze];
				if (colIdx === startCol.current && rowIdx === startRow.current){
					newMaze[colIdx][rowIdx].start = true;
				}
				copyMaze[colIdx][rowIdx] = newMaze[colIdx][rowIdx];
				setMaze(copyMaze);
      });
    });
		stepCount.current = 0;
	}

  const oppDir = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  };

  const [maze, setMaze] = React.useState(mazeInit());
	const [loadingState, setLoadingState] = React.useState(false);
	const startCol = React.useRef(0);
	const startRow = React.useRef(0);
	const stepCount = React.useRef(0);

  const styles = {
    display: "inline-grid",
    gridTemplateColumns: `repeat(${16}, 1fr)`,
  };

  return (
    <div className="maze-container">
      <div className="maze-button-div">
        <div className="maze-generate-div">
          <p className="maze-button-header">Generate</p>
          <button 
						className="maze-button" 
						onClick={() => {visualizeDfsGen();}}>
            DFS
          </button>

					<button 
						className="maze-button"
            onClick={() => {visualizePrimGen();}}>
            Prim
          </button>

					<button
            className="maze-button"
            onClick={() => {visualizeDivGen();}}>
            DIV
          </button>
        </div>

        <div className="maze-solve-div">
          <p className="maze-button-header">Solve</p>
					<button
            className="maze-button"
            onClick={() => {visualizeDfsSolve();}}>
            DFS
          </button>

          <button
            className="maze-button"
            onClick={() => {visualizeDijkstras();}}>
            DIJ
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
                    col,
                    row,
                    top,
                    bottom,
                    left,
                    right,
										active,
                    visited,
                    distance,
                    previousNode,
										sp,
										checked,
										curr,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
											start={start}
                      col={col}
                      row={row}
                      top={top}
                      bottom={bottom}
                      left={left}
                      right={right}
											active={active}
                      visited={visited}
                      distance={distance}
                      previousNode={previousNode}
											sp={sp}
											checked={checked}
											curr={curr}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>

				<button className="clear-maze-button" onClick={() => resetMaze()}>
          Clear Maze
        </button>

				<div className="step-count">
          Steps:
          <p className="step-text"> {stepCount.current}</p>
        </div>
      </div>
    </div>
  );
}

const createNode = (col, row) => {
  return {
		start: false,
    col,
    row,
    top: false,
    bottom: false,
    left: false,
    right: false,
    visited: false,
		walls: false,
    distance: Infinity,
    previousNode: null,
		sp: false,
		checked: false,
		curr: false,
  };
};

const mazeInit = () => {
  const grid = [];
  for (let c = 0; c < 16; c++) {
    const currCol = [];
    for (let r = 0; r < 16; r++) {
      currCol.push(createNode(c, r));
    }
    grid.push(currCol);
  }
  return grid;
};

