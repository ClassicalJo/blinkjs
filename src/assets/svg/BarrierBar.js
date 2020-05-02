import React from 'react'

let BarrierBar = props => {
    return (
        <g mask="url(#barrierMask)">
            <rect
                x="920"
                y={-510 + 1020 - ((props.hp / props.maxHp) * 1020)}
                width="60"
                height={(props.hp / props.maxHp) * 1020}
                opacity="0.5"
            >
                <animate attributeName="fill" values="red;red" keyTimes="0;1" calcMode="discrete" dur="10000s" begin="0s" repeatCount="indefinite" />
                {(props.hp > props.maxHp / 4) && <animate attributeName="fill" values="yellow;yellow" keyTimes="0;1" calcMode="discrete" dur="10000s" begin="0s" repeatCount="indefinite" />}
                {(props.hp > props.maxHp / 2) && <animate attributeName="fill" values="green;green" keyTimes="0;1" calcMode="discrete" dur="10000s" begin="0s" repeatCount="indefinite" />}


            </rect>
        </g>
    )
}

export default BarrierBar
