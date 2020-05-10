import React from "react"

let HPBar = props => {
    return (
        <g mask="url(#hpMask)">
            <rect
                x="925"
                y={-500 + 1000 - ((props.hp / props.maxHp) * 1000)}
                width="50"
                height={(props.hp / props.maxHp) * 1000}
                fill={props.coreColor}
                opacity="0"
            >
                <animate attributeName="opacity" from="0" to="0.8" begin="0.1s" dur="0.5s" fill="freeze" />
                {props.showIntro && <animateTransform attributeName="transform" type="translate" from="0 1000" to="0 0" dur="1s" begin="0s" fill="freeze" />}
            </rect>
            <rect
                y="-500"
                x="925"
                width="50"
                height="1000"
                fill="white"
                strokeWidth="3"
                opacity='0.1'
            >
            </rect>
        </g>
    )
}

export default HPBar
