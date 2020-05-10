import React from 'react'
import Definitions from "./Definitions"
let Viewbox = (props) => {
    return (
        <svg id="main-svg" viewBox="-1000 -562.5 2000 1125" preserveAspectRatio="xMidYMid meet">
            <Definitions />
            <rect
                fill="black"
                width="5000"
                height="5000"
                x="-2500"
                y="-2500" />
            {props.children}
        </svg>

    )
}
export default Viewbox
