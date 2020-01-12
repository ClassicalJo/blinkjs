import React from 'react'
import { Body, Runner, Engine } from 'matter-js'
import Rectangle from '../common/Rectangle'
import PlayerBullet from "../common/PlayerBullet"
import Frame from '../common/Frame'
import Death from '../scenes/Death'
import PlayerSVG from '../assets/svg/PlayerSVG';
import EnemySVG from '../assets/svg/EnemySVG';
import Touchscreen from "../assets/svg/Touchscreen"
import collisionEvents from '../common/CollisionEvents'
import BulletsSVG from '../assets/svg/BulletsSVG'

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

        this.state.walls = new Frame(this.world).walls
        this.timer = 0

        this.player = new Rectangle(0, 300, 20, 20, {}, this.world)
        this.player.body.label = "player"
        this.state.player = this.player

        this.theEnd = false
    }

    componentDidMount = () => {
        this.intervals = []
        collisionEvents(this.player, this.engine, this.playerBullets)
        this.timerInterval = setInterval(() => {
            this.timer = Number(this.timer) + 0.1
            this.timer = Math.round(this.timer * 100) / 100
        }, 100)
        if (this.props.playMode === "keyboard") window.addEventListener("keydown", this.handleKeyDown, true)
        this.intervals.push(this.timerInterval, this.cycle)
        Runner.run(this.runner, this.engine)
        this.cycle()
    }

    componentWillUnmount = () => {
        Runner.stop(this.runner)
        cancelAnimationFrame(this.loop)
        this.intervals.forEach((key) => clearInterval(key))
        this.timeouts.forEach((key) => clearTimeout(key))
        window.removeEventListener("keydown", this.handleKeyDown, true)
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
            cancelAnimationFrame(this.loop)
            Runner.stop(this.runner)
            this.timeouts.forEach((key) => clearTimeout(key))
        }
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
    handleTouch = (e) => {
        if (e.target.id === "up") {
            Body.setVelocity(this.player.body, { x: 0, y: -10 });
            this.lastMovement = "up"
        }
        else if (e.target.id === "down") {
            Body.setVelocity(this.player.body, { x: 0, y: 10 });
            this.lastMovement = "down"
        }
        else if (e.target.id === "right") {
            Body.setVelocity(this.player.body, { x: 10, y: 0 });
            this.lastMovement = "right"
        }
        else if (e.target.id === "left") {
            Body.setVelocity(this.player.body, { x: -10, y: 0 });
            this.lastMovement = "left"
        }
    }

    handleKeyDown = (e) => {
        if (e.key === "w") {
            Body.setVelocity(this.player.body, { x: 0, y: -10 });
            this.lastMovement = "up"
        }
        if (e.key === "s") {
            Body.setVelocity(this.player.body, { x: 0, y: 10 });
            this.lastMovement = "down"
        }
        if (e.key === "d") {
            Body.setVelocity(this.player.body, { x: 10, y: 0 });
            this.lastMovement = "right"
        }
        if (e.key === "a") {
            Body.setVelocity(this.player.body, { x: -10, y: 0 });
            this.lastMovement = "left"
        }
        if (e.key === "k") {
            this.blink()
        }

        if (e.key === "l") {
            this.shoot()
        }
    }

    blink = () => {
        if (this.lastMovement === "up") {
            Body.setVelocity(this.player.body, { x: 0, y: -2 })
            if (this.player.body.position.y - 100 < -450) {
                Body.setPosition(this.player.body, { x: this.player.body.position.x, y: -450 })
            } else {
                Body.setPosition(this.player.body, { x: this.player.body.position.x, y: this.player.body.position.y - 100 })
            }
        }
        else if (this.lastMovement === "down") {
            Body.setVelocity(this.player.body, { x: 0, y: 2 })
            if (this.player.body.position.y + 100 > 450) {
                Body.setPosition(this.player.body, { x: this.player.body.position.x, y: 450 })
            } else {
                Body.setPosition(this.player.body, { x: this.player.body.position.x, y: this.player.body.position.y + 100 })
            }
        }
        else if (this.lastMovement === "right") {
            Body.setVelocity(this.player.body, { x: 2, y: 0 })
            if (this.player.body.position.x + 100 > 950) {
                Body.setPosition(this.player.body, { x: 950, y: this.player.body.position.y })
            } else {
                Body.setPosition(this.player.body, { x: this.player.body.position.x + 100, y: this.player.body.position.y })
            }
        }
        else if (this.lastMovement === "left") {
            Body.setVelocity(this.player.body, { x: -2, y: 0 })
            if (this.player.body.position.x - 100 < -950) {
                Body.setPosition(this.player.body, { x: -950, y: this.player.body.position.y })
            } else {
                Body.setPosition(this.player.body, { x: this.player.body.position.x - 100, y: this.player.body.position.y })
            }
        }
    }

    shoot = () => {
        if (this.player.bulletOnCooldown !== true) {
            this.player.bulletOnCooldown = true
            let bullet = new PlayerBullet(this.player.body.position.x, this.player.body.position.y - 50, 5, this.world, this.playerBullets)
            this.playerBullets.push(bullet)
            setTimeout(() => this.player.bulletOnCooldown = false, 100)
        }
    }

    renderScene = () => {
        if (this.player.dead !== true) {
            return (
                <React.Fragment>
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
                        r="100"
                        stroke="rgba(255,255,255,0.5"
                        fill="transparent"
                    />
                    {this.state.theEnd === true && <rect x="-1000" y="-500" width="2000" height="1000" fill="white" pointerEvents="none" className="disappear"></rect>}
                    {this.props.playMode === "touchscreen" && <Touchscreen onClick={(e) => this.handleTouch(e)} shoot={this.shoot} blink={this.blink} />}
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
        return this.renderScene()
    }
}

export default Scene

// idea de disparo let bullet = new HomingBullet(r * Math.cos(i), -r*Math.sin(i), 5, target, this.world)