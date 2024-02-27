import React from "react"

function Button(props) {
	// Define state to track whether the button is active or not
	const [isSelected, setIsSelected] = React.useState(false)

	const combinedClassName = [props.className, isSelected ? "selected" : ""].join(" ")

	// Function to handle click event and toggle the button's active state
	const handleClick = () => {
		setIsSelected(true) // Toggle the active state

		// Call props.onClick and provide a callback function
		props.onClick &&
			props.onClick(() => {
				// Callback function to reset isSelected back to false
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
