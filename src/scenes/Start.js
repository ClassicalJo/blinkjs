import React from 'react'
import Viewbox from "../assets/svg/Viewbox"
import PlayerSVG from "../assets/svg/PlayerSVG"

let Start = (props) => {
    return (
        <Viewbox>
            <g transform="rotate(90, -262.5, -12.5)">{PlayerSVG(-250 - 112.5, -12.5, 25, 25)}</g>
            <text y={-100}fill="white" fontFamily="Arial Black" fontSize="80" textAnchor="middle" alignmentBaseline="central">BlinkJS</text>
            <rect x={-75} y={225 -40} width="150" height="80" fill="rgba(255,255,255,0.1)" cursor="pointer" onClick={() => props.sceneChange("select")}/>
            <text y="225" fill="white" fontFamily="Arial Black" fontSize="40" textAnchor="middle" alignmentBaseline="central" pointerEvents="none" >Start</text>
            <rect x={-200} y={375 -40} width="400" height="80" fill="rgba(255,255,255,0.1)" cursor="pointer" onClick={() => props.sceneChange("controller")}/>
            <text y="375" fill="white" fontFamily="Arial Black" fontSize="40" textAnchor="middle" alignmentBaseline="central" pointerEvents="none">How to play</text>
        </Viewbox>
    )
}


export default Start
