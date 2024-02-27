import React from "react"
import Maze from "./components/Maze/Maze.js"
import Header from "./components/Header.js"
import "./styles.css"

function App() {
	return (
		<div className="App">
			<Header />
			<Maze />
		</div>
	)
}

export default App
