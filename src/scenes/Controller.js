import React from 'react'
import Viewbox from "../assets/svg/Viewbox"
import Keyboard from '../assets/images/keyboard.svg'

let Controller = (props) => {
    return (
        <Viewbox>
            <rect strokeWidth="5" stroke="rgba(255,255,255,0.2)"  fill="black" x={-600} y={-450} width={1200} height={900} onClick={() => props.sceneChange("start")} />
            <image width="250" x={-125} y={-250 + 250 / -2} xlinkHref={Keyboard} pointerEvents="none" />
            <text fontFamily="Arial Black" textAnchor='middle' x={0} y={100} fill="white" pointerEvents="none">WASD: Movement</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={0} y={150} fill="white" pointerEvents="none">K: Blink</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={0} y={200} fill="white" pointerEvents="none">L: Fire</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={0} y={250} fill="white" pointerEvents="none">P: Pause</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={0} y={300} fill="white" pointerEvents="none">R: Reset</text>
            <text fontFamily="Arial Black" textAnchor='middle' x={0} y={400} fill="white" pointerEvents="none">Click to go back</text>
        </Viewbox>
    )

}
export default Controller
