import React from "react";
import Node from "../Node/Node";
import dijkstra from "../../solvers/dijkstras";
import "./Maze.css";
/*TODO:
	Add all my other algorithms
*/
export default function Maze() {
  function animateDijkstra(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        console.log(node);
        document.getElementById(`node-${node.col}-${node.row}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }
  function visualizeDijkstras() {
    const visitedNodesInOrder = dijkstra(maze);
    console.log(visitedNodesInOrder);
    animateDijkstra(visitedNodesInOrder);
  }

  // eslint-disable-next-line no-unused-vars
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
                    visited,
                    distance,
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
                      visited={visited}
                      distance={distance}
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
    distance: Infinity,
    previousNode: null,
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
