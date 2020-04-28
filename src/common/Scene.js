import React from 'react'
import { Body, Runner, Engine, Events, Composite, World } from 'matter-js'
import { Rectangle } from '../common/Bodies'
import PlayerBullet from "../common/PlayerBullet"
import Frame from '../common/Frame'
import PlayerSVG from '../assets/svg/PlayerSVG';
import EnemySVG from '../assets/svg/EnemySVG';
import collisionEvents from '../common/CollisionEvents'
import BulletsSVG from '../assets/svg/BulletsSVG'
import Background from '../assets/svg/Background'
import Viewbox from '../assets/svg/Viewbox'
import { AimedBullet } from '../common/EnemyBullets'
import Target from "../common/TargetingSystem"
import Pause from "./Pause"

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
            message: "",
            pause: false,
        }
        this.message = ""
        this.timeouts = []
        this.intervals = []
        this.pause = false

        this.schedule = []


        this.engine = Engine.create()
        this.world = this.engine.world
        this.world.timer = 0
        this.runner = Runner.create()
        this.world.gravity.y = 0

        this.enemies = []
        this.barriers = []
        this.bullets = []
        this.bouncers = []

        this.playerBullets = []
        this.playerMovementMap = []

        this.state.walls = new Frame(this.world).walls


        this.player = new Rectangle(0, 300, 20, 20, {}, this.world)
        this.player.body.label = "player"
        this.player.direction = { x: 0, y: 0 }
        this.player.speed = 7
        this.player.movement = false
        this.player.blinkDistance = 100

        this.state.player = this.player


        Events.on(this.engine, 'beforeUpdate', event => {
            this.world.timer = Number(this.world.timer) + 0.016666
            this.world.timer = Math.round(this.world.timer * 100) / 100
        })
    }

    componentDidMount = () => {
        collisionEvents(this.player, this.engine, this.playerBullets)
        if (this.props.playMode === "keyboard") {
            window.addEventListener("keydown", this.handleKeyDown, true)
            window.addEventListener("keyup", this.handleKeyUp, true)
        }
        this.intervals.push(this.cycle)
        Runner.run(this.runner, this.engine)
        this.cycle()
    }

    resetGame = () => {
        Runner.stop(this.runner)
        World.clear(this.world)
        Engine.clear(this.engine)
    }

    componentWillUnmount = () => {
        this.resetGame()
        cancelAnimationFrame(this.loop)
        this.intervals.forEach((key) => clearInterval(key))
        this.timeouts.forEach((key) => clearTimeout(key))
        if (this.props.playMode === "keyboard") {
            window.removeEventListener("keydown", this.handleKeyDown, true)
            window.removeEventListener("keyup", this.handleKeyUp, true)
        }
    }

    cycle = () => {
        this.updateCycle();
        this.loop = requestAnimationFrame(() => this.cycle())
    }

    * scheduleStart() {
        var index = 0
        while (true) yield index++;
    }

    next = () => {
        this.schedule[this.step.next().value]()
    }

    togglePause = () => {
        if (this.state.pause) {
            this.setState({ pause: false })
            this.cycle()
            Runner.run(this.runner, this.engine)

        }
        else {
            this.setState({ pause: true })
            cancelAnimationFrame(this.loop)
            Runner.stop(this.runner)
        }
    }

    updateCycle = () => {
        if (this.props.playMode === "keyboard" && (this.player.movement)) {
            this.player.direction = { x: 0, y: 0 }
            this.playerMovementMap.forEach(key => {
                if (key === "a" || key === "A") this.player.direction.x -= this.player.speed
                else if (key === "d" || key === "D") this.player.direction.x += this.player.speed
                if (key === "w" || key === "W") this.player.direction.y -= this.player.speed
                else if (key === "s" || key === "S") this.player.direction.y += this.player.speed

                if (key === 'k' || key === "K") this.blink(this.player.direction.x, this.player.direction.y)
                if (key === 'l' || key === "L") this.shoot()
            })

        }
        Body.setVelocity(this.player.body, this.player.direction)


        this.setState((prevState) => {
            for (let i = 0; i < this.barriers.length; i++) {
                if (this.barriers[i].body.hp < this.barriers[i].danger * 2) {
                    this.barriers[i].className = "barrier damaged"
                }

                if (this.barriers[i].body.hp < this.barriers[i].danger) {
                    this.barriers[i].className = "barrier danger"
                }

                if (this.barriers[i].body.hp <= 0) {
                    this.barriers[i].remove()
                    this.barriers.splice(i, 1)
                    i--
                }
            }
            for (let i = 0; i < this.enemies.length; i++) {
                if (this.enemies[i].body.hp <= 0) {
                    let victoryData = {
                        enemy: {...this.enemy},
                        player: {...this.player},
                    }
                    this.timeout(() => this.props.victory(victoryData), 0)
                    this.enemies[i].remove()
                    this.enemies.splice(i, 1)
                    i--
                }

            }

            let player = Object.assign({}, prevState.player)
            let playerBullets = Object.assign({}, prevState.playerBullets)
            let bullets = Object.assign({}, prevState.bullets)
            let bouncers = Object.assign({}, prevState.bouncers)
            let barriers = Object.assign({}, prevState.barriers)
            let enemies = Object.assign({}, prevState.enemies)
            let timer = Number(this.world.timer)
            let message = String(prevState.message)


            player = this.player
            playerBullets = this.playerBullets
            bullets = this.bullets
            bouncers = this.bouncers
            enemies = this.enemies
            barriers = this.barriers
            message = this.message

            return { player, playerBullets, bullets, bouncers, enemies, barriers, timer, message }
        })
        if (this.player.dead === true) {
            this.timeout(() => {
                this.props.death(this.state.player)
                this.props.sceneChange("death")
            }, 0)

        }
    }

    timeout = (callback, delay) => {
        let timeStamp = Number(this.world.timer)

        let intervalName = setInterval(() => {
            if (Math.abs(timeStamp - this.world.timer) * 1000 >= delay) {
                callback()
                clearInterval(intervalName)
            }
        }, 10)
        this.intervals.push(intervalName)
    }

    handleKeyDown = (e) => {
        if (e.key === "p" || e.key === "P") this.togglePause()
        if (e.key === "r" || e.key === "R") {
            this.props.setShowIntro(false)
            this.props.sceneChange("select")
        }
        else if (this.playerMovementMap.indexOf(e.key) === -1) this.playerMovementMap.push(e.key)
    }

    handleKeyUp = (e) => {
        this.playerMovementMap.splice(this.playerMovementMap.indexOf(e.key), 1)
    }

    blink = () => {
        if (this.player.blinkOnCooldown !== true && (this.player.movement)) {
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
            if (Math.abs(finalX) > 950) finalX = 950 * (finalX < 0 ? -1 : 1)
            if (Math.abs(finalY) > 512.5) finalY = 512.5 * (finalY < 0 ? -1 : 1)
            Body.setPosition(this.player.body, { x: finalX, y: finalY })
        }
    }

    shoot = () => {
        if (this.player.bulletOnCooldown !== true && (this.player.movement)) {
            this.player.bulletOnCooldown = true
            let bullet = new PlayerBullet(this.player.body.position.x, this.player.body.position.y - 50, 5, this.world, this.playerBullets)
            this.playerBullets.push(bullet)
            let bulletCD = setTimeout(() => this.player.bulletOnCooldown = false, 100)
            this.timeouts.push(bulletCD)
        }
    }

    setMessage = (string, callback) => {
        let array = string.split("")
        this.message = ""
        for (let i = 0; i < array.length; i++) {
            this.timeout(() => {
                this.message = this.message.concat(array[i])
            }, 100 * i)
        }
        this.timeout(() => {
            if (callback) callback()
        }, 100 * array.length + 250)
    }

    moveBody = (body, targetX, targetY, speed, callback) => {
        if (this.checkIfInArea(body.position.x, targetX, speed) && this.checkIfInArea(body.position.y, targetY, speed)) {
            Body.setVelocity(body, { x: 0, y: 0 })
            Body.setPosition(body, { x: targetX, y: targetY })
            if (callback) callback()
        }
        else {
            let target = Target.getTargetVelocity(body.position.x, body.position.y, targetX, targetY, speed)
            Body.setVelocity(body, target)
            this.timeout(() => this.moveBody(body, targetX, targetY, speed, callback), 5)
        }
    }

    checkIfInArea = (currentPosition, targetPosition, errorRange) => {
        return Math.abs(targetPosition - currentPosition) < errorRange
    }

    theStart = () => {
        window.removeEventListener("keydown", this.theStart)
        this.player.movement = true
        this.setMessage(" ", this.next)
    }

    theEnd = () => {
        let final = new AimedBullet(this.enemy.body.position.x || 0, this.enemy.body.position.y || 0, 10, 5, 5, 0, 0, this.world, this.bullets)
        final.body.label = "explosion"
        final.coreColor = this.enemy.coreColor || "red"
        let finalComposite = Composite.create()
        Composite.add(finalComposite, final.body)

        for (let i = 0; i < 150; i++) {
            this.timeout(() => Composite.scale(finalComposite, 1.05, 1.05, { x: final.body.position.x, y: final.body.position.y }, false), 16 * i)
        }

    }

    renderScene = () => {
        if (this.player.dead !== true) {
            return (
                <React.Fragment>
                    <Background />
                    <text
                        x="-950"
                        y="-512.5"
                        stroke="white"
                        fill="white"
                    >{String(this.state.timer)}
                    </text>
                    <text
                        x="0"
                        y="0"
                        stroke="white"
                        fill="white"
                        fontSize="100"
                        fontFamily="Arial Black"
                        textAnchor="middle"
                    >{String(this.state.message)}
                    </text>
                    {this.state.bullets.map((key) => BulletsSVG[key.body.label](key))}
                    {this.state.playerBullets.map((key) =>
                        <circle
                            key={this.state.playerBullets.indexOf(key)}
                            cx={key.body.position.x}
                            cy={key.body.position.y}
                            r={key.radius}
                            fill="white">
                        </circle>)}
                    {this.state.enemies.map((key => EnemySVG[key.name](key)))}
                    {this.state.barriers.map((key) => <circle
                        className={key.className}
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
                    {(this.state.pause) && <Pause
                        setShowIntro={this.props.setShowIntro}
                        sceneChange={this.props.sceneChange}
                        selectEnemy={this.props.selectEnemy}
                    />}
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <Viewbox>
                {this.renderScene()}
            </Viewbox>

        )
    }
}

export default Scene
