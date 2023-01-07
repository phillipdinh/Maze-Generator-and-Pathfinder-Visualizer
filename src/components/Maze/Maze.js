import React from "react";
import Node from "../Node/Node";
import dijkstra, { getNodesInShortestPathOrder } from "../../solvers/dijkstras";
import dfsGen from "../../generators/dfs-recursive-backtrack";
import prim from "../../generators/prim";
import "./Maze.css";

/*TODO:
	Add all my other algorithms
*/
export default function Maze() {
  function animateDFSGen(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      // If a direction
      if (!oppDir.hasOwnProperty(visitedNodesInOrder[i])) {
        const node = visitedNodesInOrder[i];
        if (oppDir.hasOwnProperty(visitedNodesInOrder[i + 1])) {
          const direction = visitedNodesInOrder[i + 1];
          const oppDirection = oppDir[direction];
          const neighbors = getNeighbors(node.col, node.row);
          const nextNode = neighbors[direction];

          setTimeout(() => {
            updateMaze(node.col, node.row, direction, true);
            updateMaze(nextNode[0], nextNode[1], oppDirection, true);
          }, 10 * i);
        }

        if (
          (node.col === 0 && node.row === 0) ||
          (node.col === 15 && node.row === 15)
        ) {
          continue;
        } else {
          setTimeout(() => {
						updateMaze(node.col, node.row, "walls", true);
          }, 10 * i);
					

					
        }
      }
    }
  }
  function visualizeDFSGen() {
		resetMaze()
    const visitedNodesInOrder = dfsGen(maze);
    animateDFSGen(visitedNodesInOrder);
  }

	function animatePrim(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      // If a direction
      if (!oppDir.hasOwnProperty(visitedNodesInOrder[i])) {
        const node = visitedNodesInOrder[i];
        if (oppDir.hasOwnProperty(visitedNodesInOrder[i + 1])) {
          const direction = visitedNodesInOrder[i + 1];
          const oppDirection = oppDir[direction];
          const neighbors = getNeighbors(node.col, node.row);
          const nextNode = neighbors[direction];

          setTimeout(() => {
            updateMaze(node.col, node.row, direction, true);
            updateMaze(nextNode[0], nextNode[1], oppDirection, true);
          }, 10 * i);
        }

        if (
          (node.col === 0 && node.row === 0) ||
          (node.col === 15 && node.row === 15)
        ) {
          continue;
        } else {
          setTimeout(() => {
						updateMaze(node.col, node.row, "walls", true);
          }, 10 * i);
        }
      }
    }
  }

	function visualizePrim(){
		resetMaze();
		const visitedNodesInOrder = prim(maze);
		animatePrim(visitedNodesInOrder);
	}
  function animateShortestPathDij(nodesInShortestPath) {
    for (let i = 0; i < nodesInShortestPath.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPath[i];
				updateMaze(node.col, node.row, "walls", false);
				updateMaze(node.col, node.row, "sp", true);
      }, 50 * i);
    }
  }

  function animateDijkstra(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
				updateMaze(node.col, node.row, "walls", false);
				updateMaze(node.col, node.row, "checked", true);
      }, 10 * i);

      if (i === visitedNodesInOrder.length - 1) {
        const lastNode = maze[15][15];
        const nodesInShortestPath = getNodesInShortestPathOrder(lastNode);
        if (i === visitedNodesInOrder.length - 1) {
          setTimeout(() => {
            animateShortestPathDij(nodesInShortestPath);
          }, 10 * i);
        }
      }
    }
  }

  function visualizeDijkstras() {
    resetMaze();
    const visitedNodesInOrder = dijkstra(maze);
    animateDijkstra(visitedNodesInOrder);
  }

  function updateMaze(col, row, prop, update) {
    let copyMaze = [...maze];
    copyMaze[col][row][prop] = update;
    setMaze(copyMaze);
  }

  function resetMaze() {
    // eslint-disable-next-line array-callback-return
    maze.map((row, rowIdx) => {
      // eslint-disable-next-line array-callback-return
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
            onClick={() => {
              visualizeDFSGen();
            }}
          >
            DFS
          </button>
					<button
            className="maze-button"
            onClick={() => {
              visualizePrim();
            }}
          >
            Prim
          </button>
        </div>

        <div className="maze-solve-div">
          <p className="maze-button-header">Solve</p>
          <button
            className="maze-button"
            onClick={() => {
              visualizeDijkstras();
            }}
          >
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

export function getNeighbors(col, row) {
  return {
    top: row <= 0 ? [-1, -1] : [col, row - 1],
    right: col >= 15 ? [-1, -1] : [col + 1, row],
    bottom: row >= 15 ? [-1, -1] : [col, row + 1],
    left: col <= 0 ? [-1, -1] : [col - 1, row],
  };
}

export function checkNeighbors(col, row, neighbors, maze) {
  return Object.keys(neighbors).filter((direction) => {
    const [c, r] = neighbors[direction];

    // If no neighbor return false
    if (c === -1 || r === -1) return false;
    // If neighbor has not been visited return good neighbor
    else if (!maze[c][r].visited) {
      const goodNeighbor = maze[c][r];
      return goodNeighbor;
    }
    return false;
  });
}
export function getRand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
