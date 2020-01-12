import React from 'react'
import { Engine, Runner } from 'matter-js'
import Circle from '../common/Circle'

class Death extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPlayer: true,
            particles: []
        }
        this.pause = false
        this.engine = Engine.create()
        this.runner = Runner.create()
        this.world = this.engine.world
        this.world.gravity.y = 0
        Runner.start(this.runner, this.engine)

        this.particles = []

        let r = 1
        let step = 2 * Math.PI / 20

        for (let theta = 0; theta < 2 * Math.PI; theta += step) {
            this.explosion = setTimeout(() => {
                this.setState({ showPlayer: false })
                let particle = new Circle(r * Math.cos(theta) + this.props.x, -r * Math.sin(theta) + this.props.y, 10, {}, this.world)
                this.particles.push(particle)
            }, 1250)
        }
    }

    componentDidMount = () => {
        this.cycle()
    }

    cycle = () => {
        this.updateCycle();
        this.loop = requestAnimationFrame(() => this.cycle())
    }

    updateCycle = () => {
        this.setState((prevState) => {
            let particles = Object.assign({}, prevState.particles)
            particles = this.particles
            return { particles }
        })
    }

    componentWillUnmount = () => {
        cancelAnimationFrame(this.loop)
        clearTimeout(this.explosion)
    }

    render() {
        return (
            <React.Fragment>
                {this.state.showPlayer === true &&
                    <rect
                        x={this.props.x - this.props.width / 2}
                        y={this.props.y - this.props.height / 2}
                        width={this.props.width}
                        height={this.props.height}
                        fill="pink" />}
                {this.state.particles.map((key) => <circle
                    key={this.state.particles.indexOf(key)}
                    className="playerGlow disappear"
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.radius}
                    fill="pink" />
                )}
                {this.state.showPlayer === false &&
                    <g>
                        <text
                            className="appear"
                            fill="white"
                            textAnchor="middle">
                            You tried
                        </text>
                        <rect
                            className="appear"
                            width="25%"
                            height="50"
                            x="-12.5%"
                            y="75"
                            fill="white"
                            onClick={this.props.restart} />
                        <text
                            y="100"
                            className="appear"
                            textAnchor="middle"
                            pointerEvents="none">
                            Try again
                        </text>
                    </g>}
            </React.Fragment>)
    }
}

export default Death