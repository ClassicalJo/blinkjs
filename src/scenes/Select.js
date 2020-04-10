import React from 'react'
import Viewbox from '../assets/svg/Viewbox'
import EnemySVG from '../assets/svg/EnemySVG'

class Select extends React.PureComponent {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        if (this.props.enemySelected) {
            this.props.select(this.props.enemySelected)
        }
    }
    render() {
        return (
            <Viewbox>
                <text y="-500" fontFamily="Arial Black" fill="white" fontSize="40" textAnchor="middle" alignmentBaseline="central">Next objective:</text>
                
                {EnemySVG.blood(225, -225, 50, "red", "")}
                {EnemySVG.satellite(225, -300, 5, "red", "")}
                {EnemySVG.satellite(225, -150, 5, "red", "")}
                <rect x={225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" onClick={() => this.props.select("scene2")}></rect>
                {(!this.props.blood) && <rect x={225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {EnemySVG.sakura(-225, -225, 50, "pink")}
                <rect x={-225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" onClick={() => this.props.select("scene1")}></rect>
                {(!this.props.sakura) && <rect x={-225 + 400 / -2} y={-225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {EnemySVG.nul(-225, 225, 50, "indigo")}
                <rect x={-225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent" onClick={() => this.props.select("scene3")}></rect>
                {(!this.props.nul) && <rect x={-225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

                {EnemySVG.vida(225,225,50, "#76c34e")}
                <rect x={225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="transparent"></rect>
                {(!this.props.vida) && <rect x={225 + 400 / -2} y={225 + 400 / -2} width="400" height="400" stroke="white" fill="rgba(0,0,0,0.85)" ></rect>}

            </Viewbox>
        )
    }
}
export default Select
