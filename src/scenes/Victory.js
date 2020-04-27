import React from 'react'
import PlayerSVG from '../assets/svg/PlayerSVG'
import Viewbox from '../assets/svg/Viewbox'



let Victory = props => {
    return (
        <Viewbox>
            <text fill="white" fontSize="32" alignmentBaseline="central" textAnchor="middle" fontFamily="Arial Black">Victory!!!</text>
            {PlayerSVG(-15, -115, 30, 30)}
            <rect fill="white" opacity="0.3" rx="20" width="200" height="100" x="-100" y="300" onClick={() => props.sceneChange("select")} />
            <text fontFamily="Arial Black" fill="white" fontSize="50" alignmentBaseline="central" textAnchor="middle" x="0" y="350" pointerEvents="none">NEXT</text>
        </Viewbox>
    )
}

export default Victory
