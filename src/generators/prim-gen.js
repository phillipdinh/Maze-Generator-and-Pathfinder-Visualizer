import { getNeighbors, getRand, checkNeighbors, getAllNodes, getOppDir } from "../components/Maze/Maze-Helper";

export default function primGen(startCol, startRow, grid) {
		// clearMaze();
	function recurse(col, row) {
		//await setNewNode(col, row);
		maze[col][row].visited = true;

		const neighbors = getNeighbors(col, row);
		const goodNeighbors = checkNeighbors(col, row, neighbors, maze);

		// push all good neighbors with the opposite direction to the list.
		// (So we can delete the connected wall from the original node when the neighbor is processed)
		goodNeighbors.map((direction) => {
			// give neighbors at given direction the opposite direction at [2]
			neighbors[direction].push(getOppDir(direction));
			// push neighbor at given direction to list
			list.push(neighbors[direction]);
		});

		do {
			if (list.length <= 0) {
				return;
			}

			const randNode = getRand(list);
			var [c, r, dir] = randNode;

			const randNodeNeighbor = getNeighbors(c, r);
			const oppNode = randNodeNeighbor[dir];
			var [nCol, nRow] = oppNode;

			const index = list.indexOf(randNode);

			// remove randNode from list
			if (index > -1) list.splice(index, 1);
		} while ( // If the random chosen node is already visited or its oppNode is the border continue
			nCol === -1 ||
			nRow === -1 ||
			maze[c][r].visited === true
		);

		visitedNodesInOrder.push(maze[c][r]);
		visitedNodesInOrder.push(dir);
		
		visitedNodesInOrder.push(maze[nCol][nRow]);
		visitedNodesInOrder.push(getOppDir(dir));


		return recurse(c, r);
	}

	
	
	const maze = getAllNodes(grid);
  const visitedNodesInOrder = [];
	const list = [];
	
	recurse(startCol, startRow);

	return visitedNodesInOrder;
}