import React from 'react'
import { Engine, Runner } from 'matter-js'
import { Circle } from '../common/Bodies'
import ViewBox from "../assets/svg/Viewbox"

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
        this.timeouts = []
        let r = 1
        let step = 2 * Math.PI / 20

        for (let theta = 0; theta < 2 * Math.PI; theta += step) {
            this.explosion = setTimeout(() => {
                this.setState({ showPlayer: false })
                let particle = new Circle(r * Math.cos(theta) + this.props.x, -r * Math.sin(theta) + this.props.y, 10, {}, this.world)
                this.particles.push(particle)
            }, 1250)
            this.timeouts.push(this.explosion)
        }
    }

    componentDidMount = () => {
        this.cycle()
        window.addEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown = e => {
        if (e.key === "r" || e.key === "R") {
            this.props.setShowIntro(false)
            this.props.sceneChange("select")
        }
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
        Runner.stop(this.runner)
        this.timeouts.forEach(key => clearTimeout(key))
        window.removeEventListener("keydown", this.handleKeyDown)

    }

    render() {
        return (
            <ViewBox>
                {this.state.showPlayer === true &&
                    <rect
                        x={this.props.x - this.props.width / 2}
                        y={this.props.y - this.props.height / 2}
                        width={this.props.width}
                        height={this.props.height}
                        fill="pink" />}
                {this.state.particles.map((key) => <circle
                    key={key.body.id}
                    className="playerGlow disappear"
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.radius}
                    fill="pink" />
                )}
                {this.state.showPlayer === false &&
                    <g>
                        <circle
                            className="appear"
                            r="250"
                            x="0"
                            y="0"
                            fill="rgba(255,255,255,0.2)"
                            onClick={() => {
                                this.props.setShowIntro(false)
                                this.props.sceneChange("select")
                            }}
                        />
                        <text
                            className="appear"
                            fill="white"
                            textAnchor="middle"
                            fontFamily="Arial Black"
                            fontSize="40"
                            alignmentBaseline="central"
                            pointerEvents="none">
                            Try again
                        </text>
                    </g>}
            </ViewBox>)
    }
}

export default Death
