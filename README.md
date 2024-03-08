# Maze Generator and Pathfinder Visualizer using React

React-based website that renders a Maze and provides algorithms to choose from that will traverse the maze to either generate the maze walls or show the path to the end.

## Generator Algorithms

-   Depth First Search
-   Recursive Division
-   Prim's Algorithm

![](https://github.com/phillipdinh/Maze-Generator-and-Pathfinder-Visualizer/blob/master/demo/generator.gif)

## Pathfinder Algorithms

-   Depth First Search
-   Dijkstra's Algorithm
-   A\* Search Algorithm

![](https://github.com/phillipdinh/Maze-Generator-and-Pathfinder-Visualizer/blob/master/demo/solver.gif)

## Maze Component

Main component of the project.

### Ref Variables

-   **stepCount:** Integer to keep track of algorithm steps
-   **start:** Tuple of start node's column and row
-   **finish:** Tuple of finish node's column and row

### State Variables

-   **maze:** 2d array of Nodes
-   **loadingState:** Used to stop user inputs while algorithms are visualized
-   **generatedState:** Used to style button while algorithms are visualized

## Node Component

-   **col, row:** Maze index
-   **start, finish:** Flags to set as starting or finish node
-   **top, bottom, left, right:** Flags to set "walls"
-   **active, marked, inPath:** Flags for visualizing algorithm
-   **visited:** Flag to prevent repeated node processing
-   **distance:** Distance from starting node
-   **totalDistance:** Distance + Manhattan distance from finish node
-   **prevNode:** References previous node in processing

## Installation

1. Clone the repository:

```bash
git clone https://github.com/phillipdinh/Maze-Generator-and-Pathfinder-Visualizer.git
```

2. Install dependencies:

```
npm install
```

3. Run the application:

```
npm start
```
