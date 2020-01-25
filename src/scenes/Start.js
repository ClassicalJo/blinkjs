import React from 'react'
import Viewbox from "../assets/svg/Viewbox"
import Keyboard from '../assets/images/keyboard.svg'
import Touchpad from '../assets/images/touchscreen.svg'

let Start = (props) => {
    return (
        <Viewbox>
            <image width={props.svgHeight / 2} x={props.svgHeight / -4 - props.svgHeight / 2} y={(props.svgHeight / -4)} xlinkHref={Keyboard} onClick={props.keyboard} />
            <image width={props.svgHeight / 2} x={props.svgHeight / -4 + props.svgHeight / 2} y={(props.svgHeight / -4)} xlinkHref={Touchpad} onClick={props.touchscreen} />
        </Viewbox>
    )

}
export default Start