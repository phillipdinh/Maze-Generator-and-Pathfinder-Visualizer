import { getNeighbors } from "../components/Maze/Maze-Helper";

export default function aStar(startCol, startRow, 
															finishCol, finishRow, maze) {


}

function getManhattan(col, row, finishCol, finishRow){
	return Math.abs(col-finishCol) + Math.abs(row-finishRow);
}