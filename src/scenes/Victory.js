import React from 'react'
import PlayerSVG from '../assets/svg/PlayerSVG'
import Viewbox from '../assets/svg/Viewbox'
let Victory = () => {
    return (
        <Viewbox>
            <text fill="white" fontSize="32" alignmentBaseline="central" textAnchor="middle">Victory!!!</text>
            {PlayerSVG(-15, -115, 30, 30)}
            <rect fill="white" height="100%" width="100%" x="-50%" y="-50%" className="disappear" pointerEvents="none" ></rect>
        </Viewbox>
    )
}

export default Victory
