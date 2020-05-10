import React from 'react'
import { connect } from "react-redux"
import { clearEnemy } from "../redux/actions"

let Pause = props => {
    return (
        <g>
            <rect x="-1500" y="-1500" width="3000" height="3000" fill="black" opacity="0.7" />
            <text fontFamily="Arial Black" fill="white" fontSize="50" alignmentBaseline="central" textAnchor="middle" pointerEvents="none">PAUSE</text>
            <rect x="-400" y="400" rx="20" width="800" height="100" fill="transparent" cursor="pointer" onClick={() => props.dispatch(clearEnemy())} />
            <text fontFamily="Arial Black" fill="white" fontSize="32" alignmentBaseline="central" textAnchor="middle" x="0" y="450" pointerEvents="none">CHANGE OBJECTIVE</text>
        </g>
    )
}

function mapStateToProps(state) {
    return {
        state: state,
    }
}

export default connect(mapStateToProps)(Pause)
