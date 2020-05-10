import React, { useLayoutEffect } from 'react'
import EnemySVG from '../assets/svg/EnemySVG'
import { connect } from "react-redux"
import Viewbox from '../assets/svg/Viewbox'

let Select = props => {
    useLayoutEffect(() => {
        if (props.enemySelected !== "none") props.changeScene(props.enemySelected)
        else if (props.bgm.current !== "start") {
            props.bgm.songs[props.bgm.current].stop()
            props.bgm.songs.start.play()
            props.playBGM("start")
        }
    })
    return (
        (
            <Viewbox>
                <text y="-500" fontFamily="Arial Black" pointerEvents="none" fill="white" fontSize="40" textAnchor="middle" alignmentBaseline="central">Next objective:</text>
                {EnemySVG.sakura(sakura)}
                <rect x={-225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" cursor="pointer" onClick={() => props.selectEnemy("sakura")}></rect>
                {(!props.enemies.sakura) && <rect x={-225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {EnemySVG.blood(blood)}
                {EnemySVG.satellite(phobos)}
                {EnemySVG.satellite(deimos)}
                <rect x={225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" cursor="pointer" onClick={() => props.selectEnemy("blood")}></rect>
                {(!props.enemies.blood) && <rect x={225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {EnemySVG.nul(nul)}
                <rect x={-225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" cursor="pointer" onClick={() => props.selectEnemy("nul")}></rect>
                {(!props.enemies.nul) && <rect x={-225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {EnemySVG.vida(vida)}
                <rect x={225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" cursor="pointer" onClick={() => props.selectEnemy("vida")}></rect>
                {(!props.enemies.vida) && <rect x={225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {(!props.enemies.vida) && (!props.enemies.blood) && (!props.enemies.sakura) && (!props.enemies.nul) && <g>
                    <rect x={-200} y={-200} width="400" height="400" stroke="white" fill="black" cursor="pointer" onClick={() => props.selectEnemy("ava")} />
                    {EnemySVG.ava(ava)}
                </g>}

                <rect x="-100" y="475" width="200" height="50" cursor="pointer" onClick={() => props.changeScene("start")} />
                <text y="500" fontFamily="Arial Black" fontSize="25" textAnchor="middle" alignmentBaseline="central" fill="white" pointerEvents="none">Back</text>
            </Viewbox>
        )

    )
}

let sakura = {
    body: {
        id: 1,
        position: {
            x: -225,
            y: -225
        },
        circleRadius: 50,
        angle: 0,
    },
    coreColor: "pink",
}

let blood = {
    body: {
        id: 2,
        position: {
            x: 225,
            y: -225
        },
        circleRadius: 50,
        angle: 0,
    },
    coreColor: "red",
}

let phobos = {
    body: {
        id: 3,
        position: {
            x: 225,
            y: -300
        },
        circleRadius: 5,
        angle: 0,
    },
    coreColor: "red",
}
let deimos = {
    body: {
        id: 4,
        position: {
            x: 225,
            y: -150
        },
        circleRadius: 5,
        angle: 0,
    },
    coreColor: "red",
}


let nul = {
    body: {
        id: 5,
        position: {
            x: -225,
            y: 225
        },
        circleRadius: 50,
        angle: 0,
    },
    coreColor: "indigo",
}

let vida = {
    body: {
        id: 6,
        position: {
            x: 225,
            y: 225
        },
        circleRadius: 50,
        angle: 0,
    },
    coreColor: "#76c34e",
}
let ava = {
    body: {
        id: 7,
        position: {
            x: 0,
            y: 0
        },
        circleRadius: 50,
        angle: 0,
    },
    coreColor: "white",
}

function mapStateToProps(state) {
    return {
        enemySelected: state.scene.enemySelected,
        enemies: state.enemies,
        bgm: state.bgm,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeScene: string => dispatch({ type: "CHANGE_SCENE", payload: string }),
        selectEnemy: string => dispatch({ type: "SELECT_ENEMY", payload: string }),
        playBGM: string => dispatch({ type: "PLAY_BGM", payload: string }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Select)
