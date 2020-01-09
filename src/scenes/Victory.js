import React from 'react'
import PlayerSVG from '../assets/svg/PlayerSVG'
let Victory = () => {
    return (
        <React.Fragment>
    <text fill="white" fontSize="32" alignmentBaseline="central" textAnchor="middle">Victory!!!</text>
    {PlayerSVG(-15, -115, 30, 30)}
    <rect fill="white" height="100%" width="100%" x="-50%" y="-50%" className="disappear" pointerEvents="none" ></rect>
    </React.Fragment>
    )
}

export default Victory