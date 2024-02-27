import React, { useState } from "react"

function Loading(props) {
	//TODO warning
	const [warning, setWarning] = useState(false)
	const handleClick = () => {
		setWarning(true)
	}
	return (
		<div className={props.className} onClick={handleClick}>
			<div className="warning"> Please wait for algorithm...</div>
		</div>
	)
}

export default Loading
