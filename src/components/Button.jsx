import React from "react"
import "./Button.css"

export default props => <button onClick={props.onClick} className="button" style={props.style}>{props.value}</button>