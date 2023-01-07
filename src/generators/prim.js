import { getNeighbors, getRand, checkNeighbors } from "../components/Maze/Maze";

export default function prim(grid) {
	// clearMaze();
	const oppDir = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  };
	
	function recurse(col, row) {

		//await setNewNode(col, row);
		maze[col][row].visited = true;
	
		const neighbors = getNeighbors(col, row);
		const goodNeighbors = checkNeighbors(col, row, neighbors, maze);

		// push all good neighbor directions to list
		goodNeighbors.map((direction) => {
			// give neighbors at given direction the opposite direction at [2]
			neighbors[direction].push(oppDir[direction]);

			// push neighbor at given direction to list
			list.push(neighbors[direction]);
		});

		do {
			if (list.length <= 0) {
				//console.log("reset");
				//console.log(list.current);
				return;
			}

			var randWall = getRand(list);
			var randWallNeighbor = getNeighbors(randWall[0], randWall[1]);
			var oppWall = randWallNeighbor[randWall[2]];

			var index = list.indexOf(randWall);
			if (index > -1) list.splice(index, 1);
		} while (
			oppWall[0] === -1 ||
			oppWall[1] === -1 ||
			maze[randWall[0]][randWall[1]].visited === true
		);

		const [c, r, dir] = randWall;
		visitedNodesInOrder.push(maze[c][r]);
		visitedNodesInOrder.push(dir);
		//updateMaze(oppWall[0], oppWall[1], oppDir[randWall[2]], true);
		//updateMaze(randWall[0], randWall[1], randWall[2], true);

		return recurse(randWall[0], randWall[1]);
	}

	const maze = getAllNodes(grid);
  const visitedNodesInOrder = [];
	const list = [];
	
	recurse(0, 0);

	return visitedNodesInOrder;
}

function getAllNodes(maze) {
  const nodes = [];
  for (let x = 0; x < 16; x++) {
    const currRow = [];
    for (let y = 0; y < 16; y++) {
      currRow.push(maze[x][y]);
    }
    nodes.push(currRow);
  }
  return nodes;
}