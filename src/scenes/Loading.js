import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Viewbox from '../assets/svg/Viewbox'


let checkPreload = array => {
    for (let howl in array) {
        if (array[howl]._state !== "loaded") return false
    }
    return true
}

let Loading = props => {
    useEffect(() => {
        let interval = setInterval(() => {
            if (checkPreload({ ...props.songs, ...props.sfx })) {
                props.dispatch({ type: "CHANGE_SCENE", payload: "start" })
            }
        }, 100)
        return () => clearInterval(interval)
    })
    return (
        <Viewbox>
            <g>
                <path fill="white" d="M -200 -200 V 200 H 200 V-200 L 120 -40 H -120 Z" />
                <ellipse cx="100" cy="40" ry="20" rx="10" fill="#55CDFC" />
                <ellipse cx="-100" cy="40" ry="20" rx="10" fill="#55CDFC" />
                <rect fill="#306BAC" width="400" height="60" x="-200" y="140"/>
            </g>
            <text
                x={700}
                y={500}
                fontFamily="Arial Black"
                fontSize="50"
                fill="white"
                opacity="0">
                Loading...
                <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.5;1" dur="1s" fill="freeze" begin="0s" repeatCount="indefinite" />
            </text>
        </Viewbox>
    )
}
function mapStateToProps(state) {
    return {
        ...state.window,
        ...state.bgm,
        ...state.sfx
    }
}
export default connect(mapStateToProps)(Loading)
