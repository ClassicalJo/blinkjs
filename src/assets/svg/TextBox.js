import React from "react"

let TextBox = props => {
    return (
        <React.Fragment>
            <rect
                x={props.x + props.width / -2}
                y={props.y + props.height / -2}
                width={props.width}
                height={props.height}
                cursor="pointer"
                onClick={props.onClick}
                fill="transparent"
            />
            <text
                x={props.x}
                y={props.y}
                fill="white"
                fontFamily="Arial Black"
                fontSize="40"
                textAnchor="middle"
                pointerEvents="none"
                alignmentBaseline="central">
                {props.children}
            </text>
        </React.Fragment>
    )
}
export default TextBox
