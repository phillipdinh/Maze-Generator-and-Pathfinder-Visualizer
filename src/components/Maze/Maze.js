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
	Add all my other algorithms
	Clear maze everytime a button is clicked
	Better reset maze name
	Change Animations
	Add overlay
	Add step counter
	Add Clear maze button
*/
export default function Maze() {

  function visualizeDfsGen() {
		resetMaze();
    const visitedNodesInOrder = dfsGen(maze);

		for (let i = 0; i < visitedNodesInOrder.length; i++) {
			// If a direction
			if (!oppDir.hasOwnProperty(visitedNodesInOrder[i])) {
				const node = visitedNodesInOrder[i];

				if (oppDir.hasOwnProperty(visitedNodesInOrder[i + 1])) {
					const direction = visitedNodesInOrder[i + 1];

					setTimeout(() => {
						updateMaze(node.col, node.row, direction, true);
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

	function visualizeDivGen(){
		resetMaze();
		delWalls();

		const visitedNodesInOrder = divGen(maze);
		
		for (let i = 0; i < visitedNodesInOrder.length; i++) {
      // If a direction
      if (!oppDir.hasOwnProperty(visitedNodesInOrder[i])) {
        const node = visitedNodesInOrder[i];

        if (oppDir.hasOwnProperty(visitedNodesInOrder[i + 1])) {
          const direction = visitedNodesInOrder[i + 1];

          setTimeout(() => {
            updateMaze(node.col, node.row, direction, false);
          }, 10 * i);
        }

				if (!ifStartFinish(node.col, node.row)){
          setTimeout(() => {
						updateMaze(node.col, node.row, "walls", true);
          }, 10 * i);
        }
      }
    }

	};

	
	function visualizePrimGen(){
		resetMaze();
		const visitedNodesInOrder = primGen(maze);

		for (let i = 0; i < visitedNodesInOrder.length; i++) {
      // If a direction
      if (!oppDir.hasOwnProperty(visitedNodesInOrder[i])) {
        const node = visitedNodesInOrder[i];
				
        if (oppDir.hasOwnProperty(visitedNodesInOrder[i + 1])) {
          const direction = visitedNodesInOrder[i + 1];

          setTimeout(() => {
            updateMaze(node.col, node.row, direction, true);
          }, 10 * i);
        }
        if (!ifStartFinish(node.col, node.row)){
          setTimeout(() => {
						updateMaze(node.col, node.row, "walls", true);
          }, 10 * i);
        }
      }
    }
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
				updateMaze(node.col, node.row, "walls", false);
				updateMaze(node.col, node.row, "sp", true);
			}, 10 * i);

			if ( (i < len - 1) && (visitedNodesInOrder[i+1] === false)){
				setTimeout(() => {
					updateMaze(node.col, node.row, "sp", false);
					updateMaze(node.col, node.row, "checked", true);
				}, 10 * i);
			}
		}
	}

	function animateShortestPathDij(nodesInShortestPath) {
    for (let i = 0; i < nodesInShortestPath.length; i++) {
			const node = nodesInShortestPath[i];
			if (!ifStartFinish(node.col, node.row)) {
				setTimeout(() => {
					updateMaze(node.col, node.row, "walls", false);
					updateMaze(node.col, node.row, "sp", true);
				}, 50 * i);
			}
    }
  }
	
  function visualizeDijkstras() {
    resetMaze();
    const visitedNodesInOrder = dijkstra(maze);
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
			
			if (i === visitedNodesInOrder.length - 1) {
        const lastNode = maze[15][15];
        const nodesInShortestPath = getNodesInShortestPathOrder(lastNode);

				setTimeout(() => {
					animateShortestPathDij(nodesInShortestPath);
				}, 10 * i);
      }

			const node = visitedNodesInOrder[i];

			if (ifStartFinish(node.col, node.row)) continue;

      setTimeout(() => {
				updateMaze(node.col, node.row, "walls", false);
				updateMaze(node.col, node.row, "checked", true);
      }, 10 * i); 
    }
  }

  function updateMaze(col, row, prop, update) {
    let copyMaze = [...maze];
    copyMaze[col][row][prop] = update;
    setMaze(copyMaze);
  }

	function delWalls() {
    maze.map((row, rowIdx) => {
      row.map((node, colIdx) => {
        updateMaze(colIdx, rowIdx, "left", true);
        updateMaze(colIdx, rowIdx, "right", true);
        updateMaze(colIdx, rowIdx, "top", true);
        updateMaze(colIdx, rowIdx, "bottom", true);
				
				// Put Border Back
        if (rowIdx == 0) {
          updateMaze(colIdx, rowIdx, "top", false);
        } else if (rowIdx == 15) {
          updateMaze(colIdx, rowIdx, "bottom", false);
        }
        if (colIdx == 0) {
          updateMaze(colIdx, rowIdx, "left", false);
        } else if (colIdx == 15) {
          updateMaze(colIdx, rowIdx, "right", false);
        }
      });
    });
  }

  function resetMaze() {
    maze.map((row, rowIdx) => {
      row.map((node, colIdx) => {
        updateMaze(colIdx, rowIdx, "visited", false);
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

