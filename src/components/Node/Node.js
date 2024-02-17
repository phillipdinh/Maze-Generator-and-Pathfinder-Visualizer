import React from "react"
import "./Node.css"
import classnames from "classnames"

export default function Node(props) {
	const styles = {
		borderTopWidth: props.top ? 0 : "2px",
		borderRightWidth: props.right ? 0 : "2px",
		borderBottomWidth: props.bottom ? 0 : "2px",
		borderLeftWidth: props.left ? 0 : "2px",

		paddingTop: props.top ? "2px" : 0,
		paddingBottom: props.bottom ? "2px" : 0,
		paddingLeft: props.left ? "2px" : 0,
		paddingRight: props.right ? "2px" : 0
	}

	const [id] = React.useState(`node-${props.col}-${props.row}`)
	/*
  const startOrFinish =
    props.col === 0 && props.row === 0
      ? "start"
      : props.col === 15 && props.row === 15
      ? "finish"
      : "";
*/

	const classNames = classnames({
		node: true,
		//'start': props.col === 0 && props.row === 0 ? true : false,
		start: props.start,
		finish: props.finish,
		"node-active": props.active && !props.start && !props.finish,
		"node-shortest-path": props.sp && !props.start && !props.finish,
		"node-marked": props.marked && !props.start && !props.finish
	})
	return <div id={id} className={classNames} style={styles}></div>
}
