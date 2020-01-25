import React from 'react'
import { Body, Runner, Engine } from 'matter-js'
import { Rectangle } from '../common/Bodies'
import PlayerBullet from "../common/PlayerBullet"
import Frame from '../common/Frame'
import Death from '../scenes/Death'
import PlayerSVG from '../assets/svg/PlayerSVG';
import EnemySVG from '../assets/svg/EnemySVG';
import collisionEvents from '../common/CollisionEvents'
import BulletsSVG from '../assets/svg/BulletsSVG'
import Background from '../assets/svg/Background'
import Touchscreen from "../assets/svg/Touchscreen"
import Viewbox from '../assets/svg/Viewbox'

class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: null,
            playerBullets: [],
            walls: [],
            bullets: [],
            bouncers: [],
            timer: 0,
            barriers: [],
            enemies: [],
            theEnd: false
        }

        this.timeouts = []
        this.intervals = []
        this.pause = false

        this.engine = Engine.create()
        this.world = this.engine.world
        this.runner = Runner.create()
        this.world.gravity.y = 0

        this.enemies = []
        this.barriers = []
        this.bullets = []
        this.bouncers = []

        this.playerBullets = []
        this.playerMovementMap = []
        this.playerTouch = "end"

        this.state.walls = new Frame(this.world).walls
        this.timer = 0

        this.player = new Rectangle(0, 300, 20, 20, {}, this.world)
        this.player.body.label = "player"
        this.player.direction = { x: 0, y: 0 }
        this.player.speed = 7
        this.player.blinkDistance = 100

        this.state.player = this.player
        this.theEnd = false
    }

    componentDidMount = () => {
        collisionEvents(this.player, this.engine, this.playerBullets)
        this.timerInterval = setInterval(() => {
            this.timer = Number(this.timer) + 0.1
            this.timer = Math.round(this.timer * 100) / 100
        }, 100)

        if (this.props.playMode === "keyboard") {
            window.addEventListener("keydown", this.handleKeyDown, false)
            window.addEventListener("keyup", this.handleKeyUp, false)
        }
        this.intervals.push(this.timerInterval, this.cycle)
        Runner.run(this.runner, this.engine)
        this.cycle()
    }

    componentWillUnmount = () => {
        Runner.stop(this.runner)
        cancelAnimationFrame(this.loop)
        this.intervals.forEach((key) => clearInterval(key))
        this.timeouts.forEach((key) => clearTimeout(key))
        if (this.props.playMode === "keyboard") {
            window.removeEventListener("keydown", this.handleKeyDown)
            window.removeEventListener("keyup", this.handleKeyUp)
        }

    }

    cycle = () => {
        this.updateCycle();
        this.loop = requestAnimationFrame(() => this.cycle())
    }

    togglePause = () => {
        if (this.pause) {
            this.cycle()
            Runner.run(this.runner, this.engine)
            this.pause = false
        }
        else {
            cancelAnimationFrame(this.loop)
            Runner.stop(this.runner)
            this.pause = true
        }
    }

    updateCycle = () => {
        if (this.player.dead === true) {
            window.removeEventListener("keydown", this.handleKeyDown, true)
            cancelAnimationFrame(this.loop)
            Runner.stop(this.runner)
            this.timeouts.forEach((key) => clearTimeout(key))
        }

        if (this.props.playMode === "keyboard") {
            this.player.direction = { x: 0, y: 0 }
            this.playerMovementMap.forEach(key => {
                if (key === "a") this.player.direction.x -= this.player.speed
                else if (key === "d") this.player.direction.x += this.player.speed
                if (key === "w") this.player.direction.y -= this.player.speed
                else if (key === "s") this.player.direction.y += this.player.speed

                if (key === 'k') this.blink(this.player.direction.x, this.player.direction.y)
                if (key === 'l') this.shoot()
            })

        }
        Body.setVelocity(this.player.body, this.player.direction)


        this.setState((prevState) => {
            for (let i = 0; i < this.barriers.length; i++) {
                if (this.barriers[i].body.hp < this.barriers[i].danger * 2) {
                    this.barriers[i].classNames = "barrier damaged"
                }

                if (this.barriers[i].body.hp < this.barriers[i].danger) {
                    this.barriers[i].classNames = "barrier danger"
                }

                if (this.barriers[i].body.hp <= 0) {
                    this.barriers[i].remove()
                    this.barriers.splice(i, 1)
                    i--
                }
            }
            for (let i = 0; i < this.enemies.length; i++) {
                if (this.enemies[i].body.hp <= 0) {
                    this.enemies[i].remove()
                    this.enemies.splice(i, 1)
                    i--
                    this.props.victory()
                }

            }

            let player = Object.assign({}, prevState.player)
            let playerBullets = Object.assign({}, prevState.playerBullets)
            let bullets = Object.assign({}, prevState.bullets)
            let bouncers = Object.assign({}, prevState.bouncers)
            let barriers = Object.assign({}, prevState.barriers)
            let enemies = Object.assign({}, prevState.enemies)
            let timer = this.timer
            let theEnd = this.theEnd

            player = this.player
            playerBullets = this.playerBullets
            bullets = this.bullets
            bouncers = this.bouncers
            enemies = this.enemies
            barriers = this.barriers

            return { player, playerBullets, bullets, bouncers, enemies, barriers, timer, theEnd }
        })
    }

    handleTouch = (angle) => {
        if (angle === -1) this.player.direction = { x: 0, y: 0 }
        else if (angle > 22.50 && angle < 67.5) this.player.direction = { x: this.player.speed, y: -this.player.speed }
        else if (angle > 67.5 && angle < 112.5) this.player.direction = { x: 0, y: -this.player.speed }
        else if (angle > 112.5 && angle < 157.5) this.player.direction = { x: -this.player.speed, y: -this.player.speed }
        else if (angle > 157.5 && angle < 202.5) this.player.direction = { x: -this.player.speed, y: 0 }
        else if (angle > 202.5 && angle < 247.5) this.player.direction = { x: -this.player.speed, y: this.player.speed }
        else if (angle > 247.5 && angle < 292.5) this.player.direction = { x: 0, y: this.player.speed }
        else if (angle > 292.5 && angle < 337.5) this.player.direction = { x: this.player.speed, y: this.player.speed }
        else this.player.direction = { x: this.player.speed, y: 0 }
    }


    handleKeyDown = (e) => {
        if (this.playerMovementMap.indexOf(e.key) === -1) this.playerMovementMap.push(e.key)
    }

    handleKeyUp = (e) => {
        this.playerMovementMap.splice(this.playerMovementMap.indexOf(e.key), 1)
    }

    blink = () => {
        if (this.player.blinkOnCooldown !== true) {
            this.player.blinkOnCooldown = true
            let blinkTimeout = setTimeout(() => this.player.blinkOnCooldown = false, 125)
            this.timeouts.push(blinkTimeout)

            let finalX, finalY;
            if (this.player.direction.x === 0 && this.player.direction.y === 0) {
                finalX = this.player.body.position.x
                finalY = this.player.body.position.y - this.player.blinkDistance
            }
            else {
                let theta = Math.atan2(this.player.body.position.y + this.player.direction.y - this.player.body.position.y, this.player.body.position.x + this.player.direction.x - this.player.body.position.x)
                theta = (theta > 0 ? theta : (2 * Math.PI + theta)) * 360 / (2 * Math.PI)
                theta = theta * Math.PI / 180

                finalX = this.player.body.position.x + this.player.blinkDistance * Math.cos(theta)
                finalY = this.player.body.position.y + this.player.blinkDistance * Math.sin(theta)

            }
            if (Math.abs(finalX) > 950) finalX = this.player.direction.x / Math.abs(this.player.direction.x) * 950
            if (Math.abs(finalY) > 512.5) finalY = this.player.direction.y / Math.abs(this.player.direction.y) * 512.5
            Body.setPosition(this.player.body, { x: finalX, y: finalY })
        }
    }


    shoot = () => {
        if (this.player.bulletOnCooldown !== true) {
            this.player.bulletOnCooldown = true
            let bullet = new PlayerBullet(this.player.body.position.x, this.player.body.position.y - 50, 5, this.world, this.playerBullets)
            this.playerBullets.push(bullet)
            let bulletCD = setTimeout(() => this.player.bulletOnCooldown = false, 100)
            this.timeouts.push(bulletCD)
        }
    }

    renderScene = () => {
        if (this.player.dead !== true) {
            return (
                <React.Fragment>
                    <Background />
                    <text
                        x="-950"
                        y="-425"
                        stroke="white"
                        fill="white"
                    >{String(this.state.timer)}
                    </text>
                    <filter id="blur">
                        <feGaussianBlur stdDeviation="2" />
                    </filter>
                    {this.state.bullets.map((key) => {
                        if (key.body.label === "bullet") return BulletsSVG.bullet(key)
                        else if (key.body.label === 'bouncer') return BulletsSVG.bouncer(key)
                        else if (key.body.label === 'bigBullet') return BulletsSVG.bigBullet(key)
                        else if (key.body.label === 'surroundBullet') return BulletsSVG.bigBullet(key)
                        else return null
                    })
                    })}
                    {this.state.playerBullets.map((key) =>
                        <circle
                            key={this.state.playerBullets.indexOf(key)}
                            cx={key.body.position.x}
                            cy={key.body.position.y}
                            r={key.radius}
                            fill="white">
                        </circle>)}
                    {this.state.enemies.map((key => EnemySVG(
                        key.body.position.x,
                        key.body.position.y,
                        key.radius))
                    )}
                    {this.state.barriers.map((key) => <circle
                        className={key.classNames}
                        key={this.state.barriers.indexOf(key)}
                        cx={key.body.position.x}
                        cy={key.body.position.y}
                        r={key.radius}
                        fill="transparent"
                    />)}
                    {PlayerSVG(
                        this.state.player.body.position.x - this.state.player.width / 2,
                        this.state.player.body.position.y - this.state.player.height / 2,
                        this.state.player.width,
                        this.state.player.height)}
                    <circle
                        id="player-radius"
                        cx={this.state.player.body.position.x}
                        cy={this.state.player.body.position.y}
                        r={this.state.player.blinkDistance}
                        stroke="rgba(255,255,255,0.5"
                        fill="transparent"
                    />
                    {this.state.theEnd === true && <rect x="-1000" y="-562.5" width="2000" height="1125" fill="white" pointerEvents="none" className="disappear"></rect>}
                </React.Fragment>
            )
        } else {
            return (
                <Death
                    x={this.state.player.body.position.x}
                    y={this.state.player.body.position.y}
                    width={this.state.player.width}
                    height={this.state.player.height}
                    restart={this.props.restart}

                />)
        }
    }

    render() {
        return (
            <React.Fragment>
                <Viewbox>
                    {this.renderScene()}
                </Viewbox>
                {(this.props.playMode === "touchscreen") && (this.player.dead !== true) &&
                    <Touchscreen
                        svgHeight={this.props.svgHeight}
                        svgWidth={this.props.svgWidth}
                        innerHeight={this.props.innerHeight}
                        innerWidth={this.props.innerWidth}
                        offset={this.props.offset}
                        move={(position) => this.handleTouch(position)}
                        blink={() => this.blink()}
                        shoot={() => this.shoot()} />}
            </React.Fragment>
        )
    }
}

export default Scene
