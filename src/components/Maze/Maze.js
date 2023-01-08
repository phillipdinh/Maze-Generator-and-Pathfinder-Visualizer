import React from "react";

import { getNeighbors, ifStartFinish} from "./Maze-Helper";
import Node from "../Node/Node";

import dijkstra, { getNodesInShortestPathOrder } from "../../solvers/dijkstras";
import dfsSolve from "../../solvers/dfs-solve";

import dfsGen from "../../generators/dfs-gen";
import divGen from "../../generators/div-gen";
import primGen from "../../generators/prim-gen";

import "./Maze.css";

/*TODO:
	Add one more algorithm
	Clear maze everytime a button is clicked
	Better reset maze name
	Change Animations
	Add overlay
	Add step counter
	Add Clear maze button
*/
export default function Maze() {

	function animateMazeGen(visitedNodesInOrder, flag){
		for (let i = 0; i < visitedNodesInOrder.length; i++) {
			// If a direction
			if (!oppDir.hasOwnProperty(visitedNodesInOrder[i])) {
				const node = visitedNodesInOrder[i];

				if (oppDir.hasOwnProperty(visitedNodesInOrder[i + 1])) {
					const direction = visitedNodesInOrder[i + 1];

					setTimeout(() => {
						updateMaze(node.col, node.row, direction, flag);
					}, 1 * i);
				}

				if (!ifStartFinish(node.col, node.row)){
					setTimeout(() => { 
						updateMaze(node.col, node.row, "walls", true);
					}, 1 * i);
				}
			}
		}
	}

  function visualizeDfsGen() {
		resetMaze();
    const visitedNodesInOrder = dfsGen(maze);
		animateMazeGen(visitedNodesInOrder, true)
  }

	function visualizeDivGen(){
		resetMaze();
		delWalls();
		const visitedNodesInOrder = divGen(maze);
		animateMazeGen(visitedNodesInOrder, false)
	};

	
	function visualizePrimGen(){
		resetMaze();
		const visitedNodesInOrder = primGen(maze);
		animateMazeGen(visitedNodesInOrder, true)
	}

	function visualizeDfsSolve(){
		resetMaze();
    const visitedNodesInOrder = dfsSolve(maze);

		const len = visitedNodesInOrder.length;
		// Skip first node
		for (let i = 1; i < len; i++) {
			if (visitedNodesInOrder[i] === false) continue;
			const node = visitedNodesInOrder[i];

			setTimeout(() => {
				setShortestPath(node.col, node.row)
			}, 10 * i);

			if ( (i < len - 1) && (visitedNodesInOrder[i+1] === false)){
				setTimeout(() => {
					setChecked(node.col, node.row);
				}, 10 * i);
			}
		}
	}

	function animateShortestPathDij() {
		const nodesInShortestPath = getNodesInShortestPathOrder(maze[15][15]);

    for (let i = 0; i < nodesInShortestPath.length; i++) {
			const node = nodesInShortestPath[i];

			if (!ifStartFinish(node.col, node.row)) {
				setTimeout(() => {
					setShortestPath(node.col, node.row)
				}, 50 * i);
			}
    }
  }
	
  function visualizeDijkstras() {
    resetMaze();
    const visitedNodesInOrder = dijkstra(maze);

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length - 1) {
				setTimeout(() => {
					animateShortestPathDij();
				}, 10 * i);
      }

			const node = visitedNodesInOrder[i];
			if (!ifStartFinish(node.col, node.row)){
				setTimeout(() => {
					setChecked(node.col, node.row);
				}, 10 * i); 
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
		updateMaze(col, row, "sp", false);
	}

	function delWalls() {
    maze.map((row, r) => {
      row.map((node, c) => {
        updateMaze(c, r, "left", true);
        updateMaze(c, r, "right", true);
        updateMaze(c, r, "top", true);
        updateMaze(c, r, "bottom", true);
				
				// Put Border Back
        if (r == 0) {
          updateMaze(c, r, "top", false);
        } else if (r == 15) {
          updateMaze(c, r, "bottom", false);
        }
        if (c == 0) {
          updateMaze(c, r, "left", false);
        } else if (c == 15) {
          updateMaze(c, r, "right", false);
        }
      });
    });
  }

  function resetMaze() {
    maze.map((row, r) => {
      row.map((node, c) => {
        updateMaze(c, r, "visited", false);
      });
    });
  }

  const oppDir = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  };

  const [maze, setMaze] = React.useState(mazeInit());

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
      </div>

      <div className="maze-div">
        <div style={styles} className="maze">
          {maze.map((block, rowIdx) => {
            return (
              <div key={rowIdx}>
                {block.map((node, nodeIdx) => {
                  const {
                    col,
                    row,
                    top,
                    bottom,
                    left,
                    right,
										walls,
                    visited,
                    distance,
                    previousNode,
										sp,
										checked,
                  } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}
                      top={top}
                      bottom={bottom}
                      left={left}
                      right={right}
											walls={walls}
                      visited={visited}
                      distance={distance}
                      previousNode={previousNode}
											sp={sp}
											checked={checked}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const createNode = (row, col) => {
  return {
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
  };
};

const mazeInit = () => {
  const grid = [];
  for (let x = 0; x < 16; x++) {
    const currRow = [];
    for (let y = 0; y < 16; y++) {
      currRow.push(createNode(y, x));
    }
    grid.push(currRow);
  }
  return grid;
};

