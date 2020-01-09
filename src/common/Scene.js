import React from 'react'
import { Body, Runner } from 'matter-js'
import Death from '../scenes/Death'
import PlayerBullet from './PlayerBullet';
import PlayerSVG from '../assets/svg/PlayerSVG';
import EnemySVG from '../assets/svg/EnemySVG';
import Touchscreen from "../assets/svg/Touchscreen"
import collisionEvents from '../common/CollisionEvents'

class Scene extends React.Component {
    componentDidMount = () => {
        this.intervals = []
        collisionEvents(this.player, this.engine, this.playerBullets)
        this.cycle = setInterval(() => requestAnimationFrame(() => this.updateCycle()))
        this.timerInterval = setInterval(() => {
            this.timer = Number(this.timer) + 0.1
            this.timer = Math.round(this.timer * 100) / 100
        }, 100)
        if (this.props.playMode === "keyboard") window.addEventListener("keydown", this.handleKeyDown, true)
        this.intervals.push(this.timerInterval, this.cycle)
        Runner.run(this.runner, this.engine)
    }

    componentWillUnmount = () => {
        Runner.stop(this.runner)
        this.intervals.forEach((key) => clearInterval(key))
        this.timeouts.forEach((key) => clearTimeout(key))
        window.removeEventListener("keydown", this.handleKeyDown, true)
    }


    updateCycle = () => {
        if (this.player.dead === true) {
            Runner.stop(this.runner)
            clearInterval(this.cycle)
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
            let barriers = Object.assign({}, prevState.barriers)
            let enemies = Object.assign({}, prevState.enemies)
            let timer = this.timer
            let theEnd = this.theEnd

            player = this.player
            playerBullets = this.playerBullets
            bullets = this.bullets
            enemies = this.enemies
            barriers = this.barriers

            return { player, playerBullets, bullets, enemies, barriers, timer, theEnd }
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
                    {this.state.bullets.map((key) =>
                        <circle
                            key={this.state.bullets.indexOf(key)}
                            cx={key.body.position.x}
                            cy={key.body.position.y}
                            r={key.radius}
                            fill="white">
                        </circle>)}
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

                />)
        }
    }

    render() {
        return this.renderScene()
    }
}

export default Scene

// idea de disparo let bullet = new HomingBullet(r * Math.cos(i), -r*Math.sin(i), 5, target, this.world)