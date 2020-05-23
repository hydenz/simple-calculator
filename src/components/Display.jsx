import React from "react"
import "./Display.css"

export default props => (
    <div className="display">
        <strong style={props.style}>{props.value}</strong>
    </div>
)