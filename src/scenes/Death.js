import React, { useEffect } from 'react'
import ViewBox from "../assets/svg/Viewbox"

let handleKeyDown = (e, props) => {
    if (e.key === "r" || e.key === "R") {
        props.setShowIntro(false)
        props.sceneChange("select")
    }
}

let Death = props => {
    useEffect(() => {
        window.addEventListener("keydown", (e) => handleKeyDown(e, props))
        return () => window.removeEventListener("keydown", (e) => handleKeyDown(e, props))
    })
    return (
        <ViewBox>
            <rect
                x={props.x - props.width / 2}
                y={props.y - props.height / 2}
                width={props.width}
                height={props.height}
                fill="pink"
            >
                <animate attributeName="opacity" from="1" to="0" dur="0.1s" begin="1s" fill="freeze" calcMode="discrete" />
            </rect>
            {[30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map(key => (
                <g key={key}>
                    < circle
                        cx={props.x + 2 * Math.cos(key * Math.PI / 180)}
                        cy={props.y + 2 * Math.sin(key * Math.PI / 180)}
                        r="25"
                        fill="pink"
                        opacity="0"
                    >
                        <animate attributeName="opacity" keyTimes="0;0.2;0.9;1" values="0;1;1;0" fill="freeze" dur="1.5s" begin="1s" />

                        <animateTransform
                            attributeName='transform'
                            type="translate"
                            additive="sum"
                            accumulate="sum"
                            to={`${props.x + 2000 * Math.cos(key * Math.PI / 180)} ${props.y + 2000 * Math.sin(key * Math.PI / 180)}`}
                            dur="2s"
                            begin="1s"
                            fill="freeze"
                        />
                    </circle>
                    <animateTransform
                        attributeName='transform'
                        type="rotate"
                        from={`0 ${props.x} ${props.y}`}
                        to={`360 ${props.x} ${props.y}`}
                        dur="4s"
                        begin="1s"
                        fill="freeze"
                    />
                </g>
            ))}
            < g >
                <circle
                    r="250"
                    x="0"
                    y="0"
                    fill="rgba(255,255,255,0.2)"
                    opacity="0"
                    onClick={() => {
                        props.setShowIntro(false)
                        props.sceneChange("select")
                    }}
                >
                    <animate
                        attributeName="opacity"
                        from="0"
                        to="1"
                        dur="0.3s"
                        begin="1.5s"
                        fill="freeze"
                    />
                </circle>
                <text
                    fill="white"
                    textAnchor="middle"
                    fontFamily="Arial Black"
                    fontSize="40"
                    alignmentBaseline="central"
                    pointerEvents="none"
                    opacity="0">
                    Try again
                    <animate
                        attributeName="opacity"
                        from="0"
                        to="1"
                        dur="0.3s"
                        begin="1.5s"
                        fill="freeze"
                    />
                </text>
            </g>
        </ViewBox>
    )

}



export default Death
