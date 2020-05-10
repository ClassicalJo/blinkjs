import React from 'react'
import PlayerSVG from "../assets/svg/PlayerSVG"
import TextBox from "../assets/svg/TextBox"
import Mute from "../assets/svg/Mute"
import Viewbox from '../assets/svg/Viewbox'
import { connect } from "react-redux"
import { withCookies } from "react-cookie"
import { changeScene, enemyRestore, toggleMute } from '../redux/actions'

let eraseCookies = props => {
    ["sakura", "blood", "nul", "vida", "ava"].forEach(key => props.cookies.remove(key))
    props.enemyRestore()
}

let Start = props => {
    return (
        <Viewbox>
            <Mute />
            <g transform="rotate(90, -262.5, -12.5)">
                {PlayerSVG(-250 - 112.5, -12.5, 25, 25)}
            </g>
            <TextBox
                x={0}
                y={225}
                width={150}
                height={80}
                onClick={() => props.changeScene("select")}>
                Start
            </TextBox>
            <TextBox
                x={0}
                y={375}
                width={300}
                height={80}
                onClick={() => props.changeScene("controller")}>
                How to play
            </TextBox>
            <TextBox
                x={-750}
                y={440}
                width={415}
                height={80}
                onClick={() => eraseCookies(props)}>
                Erase saved data
            </TextBox>
            <TextBox
                x={750}
                y={440}
                width={200}
                height={80}
                fontSize={40}
                onClick={() => props.changeScene("credits")}>
                Credits
            </TextBox>
            <text
                y={-100}
                fill="white"
                fontFamily="Arial Black"
                fontSize="80"
                textAnchor="middle"
                pointerEvents="none"
                alignmentBaseline="central">
                BlinkJS
            </text>
        </Viewbox>
    )
}

function mapStateToProps(state) {
    return {
        mute: state.bgm.mute
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeScene: string => dispatch(changeScene(string)),
        enemyRestore: () => dispatch(enemyRestore()),
        toggleMute: () => dispatch(toggleMute()),
    }
}
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Start))
