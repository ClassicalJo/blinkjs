import React from "react"
import { connect } from "react-redux"
import { Howler } from "howler"
import { toggleMute } from "../../redux/actions"

let toggleMuteAll = props => {
    (props.mute) ? Howler.mute(false) : Howler.mute(true)
    props.dispatch(toggleMute())

}

let Mute = props => {
    return (
        <React.Fragment>
            <text
                x="750"
                y="-500"
                onClick={() => { toggleMuteAll(props) }}
                cursor="pointer"
                fontFamily="Arial Black"
                fontSize="30"
                fill="white"
                alignmentBaseline="central"
                textAnchor="middle">
                Mute
            </text>
            {(props.mute) && <line x1="700" x2="800" y1="-498" y2="-498" strokeWidth="4" stroke="white" />}
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        ...state.bgm
    }
}

export default connect(mapStateToProps, null)(Mute)
