# Maze Generator and Pathfinder Visualizer using React

This project renders a maze using React and provides algorithms to choose from that will animate their path for generating walls or finding the path from start to finish.

## Install Dependencies

```bash
    npm install
```

## Run Project

```bash
    npm start
```

## Generator Algorithms

-   Depth First Search
-   Recursive Division
-   Prim's Algorithm

![](https://github.com/phillipdinh/maze-2/blob/master/demo/generator.gif)

## Pathfinder Algorithms

-   Depth First Search
-   Dijkstra's Algorithm
-   A\* Search Algorithm

![](https://github.com/phillipdinh/maze-2/blob/master/demo/solver.gif)

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

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
