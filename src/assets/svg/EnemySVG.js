import React from 'react'

let EnemySVG = (cx, cy, r) => {
    let x = cx - 50
    let y = cy
    let path = `M${x} ${y} L${x - 75} ${y - 75} L ${x - 150} ${y + 150} L${x - 50} ${y - 10} Z`
    return (
        <g key="0">
            <path key="1" d={path} fill="white" className="enemy-wing" />
            <path key="2" d={path} fill="white" className="enemy-wing" transform="scale(-1, 1)" />
            <circle
                key="3"
                className="enemy"
                cx={cx}
                cy={cy}
                r={r}
                fill="pink"
            />
        </g>
    )
}

export default EnemySVG
