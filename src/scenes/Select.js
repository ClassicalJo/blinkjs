import React from 'react'
import Viewbox from '../assets/svg/Viewbox'
import EnemySVG from '../assets/svg/EnemySVG'

class Select extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.enemySelected !== "none") this.props.sceneChange(this.props.enemySelected)
    }
    render = () => {
        return (
            <Viewbox>
                <text y="-500" fontFamily="Arial Black" pointerEvents="none" fill="white" fontSize="40" textAnchor="middle" alignmentBaseline="central">Next objective:</text>
                {EnemySVG.sakura(sakura)}
                <rect x={-225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" cursor="pointer" onClick={() => this.props.selectEnemy("scene1")}></rect>
                {(!this.props.sakura) && <rect x={-225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {EnemySVG.blood(blood)}
                {EnemySVG.satellite(phobos)}
                {EnemySVG.satellite(deimos)}
                <rect x={225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" cursor="pointer" onClick={() => this.props.selectEnemy("scene2")}></rect>
                {(!this.props.blood) && <rect x={225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {EnemySVG.nul(nul)}
                <rect x={-225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" cursor="pointer" onClick={() => this.props.selectEnemy("scene3")}></rect>
                {(!this.props.nul) && <rect x={-225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {EnemySVG.vida(vida)}
                <rect x={225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" cursor="pointer" onClick={() => this.props.selectEnemy("scene4")}></rect>
                {(!this.props.vida) && <rect x={225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {(!this.props.vida) && (!this.props.blood) && (!this.props.sakura) && (!this.props.nul) && <g>
                    <rect x={-200} y={-200} width="400" height="400" stroke="white" fill="black" cursor="pointer" onClick={() => this.props.selectEnemy("scene5")} />
                    {EnemySVG.ava(ava)}
                </g>}

                <rect x="-100" y="475" width="200" height="50" cursor="pointer" onClick={() => this.props.sceneChange("start")} />
                <text y="500" fontFamily="Arial Black" fontSize="25" textAnchor="middle" alignmentBaseline="central" fill="white" pointerEvents="none">Back</text>
            </Viewbox>
        )
    }
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
    className: "sakyra",
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
    className: "blood",
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
    className: "phobos",
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
    className: "deimos",
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
    className: "nul",
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
    className: "vida",
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
    className: "ava",
}
export default Select
