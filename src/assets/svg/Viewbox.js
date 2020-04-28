import React from 'react'
import Definitions from "./Definitions"
let Viewbox = (props) => {
    return (
        <svg id="main-svg" viewBox="-1000 -562.5 2000 1125" preserveAspectRatio="xMidYMid meet">
            <Definitions />
            <mask id="transparent">
                <rect width="5000" height="5000" x="-2500" y="-2500" fill="white" />
                <rect width="2000" height="1125" x="-1000" y="-562.5" fill="black" />

            </mask>
            <rect
                fill="black"
                width="5000"
                height="5000"
                x="-2500"
                y="-2500" />
            {props.children}
            <rect
                fill="black"
                width="5000"
                height="5000"
                x="-2500"
                y="-2500"
                mask="url(#transparent)"
                pointerEvents="none" />
        </svg>

    )
}
export default Viewbox
