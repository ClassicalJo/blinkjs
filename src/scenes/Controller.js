import React from 'react'
import Viewbox from "../assets/svg/Viewbox"
import Keyboard from '../assets/images/keyboard.svg'
import Touchpad from '../assets/images/touchscreen.svg'

let Controller = (props) => {
    return (
        <Viewbox>
            <rect fill="rgba(255,255,255,0.2)" x={-250 + 420 / -2} y={-460} width={420} height={920} />
            <rect stroke="rgba(255,255,255,0.2)" fill="black" x={-250 + 400 / -2} y={-450} width={400} height={900} onClick={props.keyboard} />
            <image width="250" x={-250 + 250 / -2} y={-250 + 250 / -2} xlinkHref={Keyboard} pointerEvents="none" />
            <text fontFamily="Arial Black" textAnchor='middle' x={-250} y={100} fill="white" pointerEvents="none"> WASD: Movement</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={-250} y={150} fill="white" pointerEvents="none">K: Blink</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={-250} y={200} fill="white" pointerEvents="none">L: Fire</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={-250} y={250} fill="white" pointerEvents="none">P: Pause</text>


            <rect fill="rgba(255,255,255,0.2)" x={250 + 420 / -2} y={-460} width={420} height={920} />
            <rect stroke="rgba(255,255,255,0.2)" x={250 + 400 / -2} y={-450} width={400} height={900} onTouchStart={props.touchscreen} />
            <image width="250" x={250 + 250 / -2} y={-250 + 250 / -2} xlinkHref={Touchpad} />
            <text fontFamily="Arial Black" textAnchor='middle' x={250} y={100} fill="white" pointerEvents="none"> LeftStick: Movement</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={250} y={150} fill="white" pointerEvents="none"> A: Blink</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={250} y={200} fill="white" pointerEvents="none"> B: Fire</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={250} y={250} fill="white" pointerEvents="none"> ||: Pause</text>
        </Viewbox>
    )

}
export default Controller
