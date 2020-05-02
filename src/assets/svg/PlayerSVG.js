import React from 'react'

let PlayerSVG = (x, y, w, h) => {
    //let path = `M ${x + w / 2} ${y - h * 2} L ${x + w / 2 - w/2} ${y - h/4} H ${x + w / 2 + w/2} Z`;
    let path = `M ${x + w / 2} ${y - h * 2} L ${x} ${y - h} V ${y - h / 4} H ${x + w} V${y - h} Z`;
    //let leftBooster = `M ${x} ${y + h} L ${x - w / 4} ${y + h * 2} H ${x + w / 4}Z`
    //let rightBooster = `M ${x + w} ${y + h} L ${x + w * 3 / 4} ${y + h * 2} H ${x + w * 5 / 4}Z`
    let leftWing = `M ${x - w / 4} ${y - h / 2} V ${y + h * 2} H ${x - w * 5 / 4} Z`
    let rightWing = `M ${x + w * 5 / 4} ${y - h / 2} V ${y + h * 2} H ${x + w * 9 / 4} Z`
    return (
        <g>
            <path d={path} fill="white" />
            {/* <path d={leftBooster} fill="white" />
            <path d={rightBooster} fill="white" /> */}
            <path d={leftWing} fill="white" />
            <path d={rightWing} fill="white" />
            <rect
                id="player"
                fill="pink"
                x={x}
                y={y}
                width={w}
                height={h}
            >
                <animate attributeName="fill" values="pink;white;pink" keyTimes="0;0.5;1"  keySplines="0.42 0 0.58 1;0.42 0 0.58 1"  dur="2s" begin="0s" repeatCount="indefinite" />
            </rect>
        </g>
    )
}
export default PlayerSVG
