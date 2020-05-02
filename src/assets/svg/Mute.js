import React from "react"

let MuteText = props => {
    return <text onClick={props.onClick} cursor="pointer" fontFamily="Arial Black" x={props.x} y={props.y} fontSize="30" fill="white" alignmentBaseline="central" textAnchor="middle">{props.children}</text>
}
let Mute = props => {
    return (
        <React.Fragment>
            <MuteText x="750" y="-500" onClick={props.onClick}>Mute Music</MuteText>
            {(props.mute) && <line x1="640" x2="860" y1="-498" y2="-498" strokeWidth="4" stroke="white" />}
        </React.Fragment>
    )
}

export default Mute
