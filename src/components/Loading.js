import React from "react"

function Loading(props) {
	return (
		<div className={props.className}>
			<div className="warning"> Please wait for algorithm...</div>
		</div>
	)
}

export default Loading
