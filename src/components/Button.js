import React, { useState } from "react"

function Button(props) {
	// Define state to track whether the button is active or not
	const [isSelected, setIsSelected] = useState(false)

	const combinedClassName = [props.className, isSelected ? "selected" : ""].join(" ")

	// Function to handle click event and toggle the button's active state
	const handleClick = () => {
		setIsSelected(true)
		props.onClick &&
			props.onClick(() => {
				setIsSelected(false)
			})
	}

	return (
		<button onClick={handleClick} className={combinedClassName}>
			{props.label}
		</button>
	)
}

export default Button
