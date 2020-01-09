import React from 'react'
import { Runner, Engine } from 'matter-js'
import Rectangle from '../common/Rectangle'
import Circle from '../common/Circle'
import Enemy from '../common/Enemy';
import Scene from '../common/Scene'
import Frame from '../common/Frame'
import Background from "../assets/svg/Background"
import Bullet from "../common/Bullet"
import HomingBullet from "../common/HomingBullet"
import CoordinatedHomingBullet from "../common/CoordinatedHomingBullet"

class Scene1 extends Scene {
    constructor() {
        super()
        this.state = {
            player: null,
            playerBullets: [],
            walls: [],
            bullets: [],
            timer: 0,
            barriers: [],
            enemies: [],
            theEnd: false
        }


        this.engine = Engine.create()
        this.world = this.engine.world
        this.runner = Runner.create()
        this.world.gravity.y = 0


        this.enemies = []

        this.state.walls = new Frame(this.world).walls
        this.timer = 0

        this.player = new Rectangle(0, 300, 20, 20, {}, this.world)
        this.player.body.label = "lol"
        this.state.player = this.player

        this.playerBullets = []

        this.bullets = []

        this.enemy = new Enemy(0, -350, 50, this.world)
        this.enemy.body.label = "enemy"
        this.enemy.body.hp = 10
        this.enemy.dead = false
        this.enemies.push(this.enemy)


        this.barriers = []
        this.outerBarrier = new Circle(0, -350, 80, { isStatic: true }, this.world)
        this.outerBarrier.body.label = "barrier"
        this.outerBarrier.body.maxHp = 300
        this.outerBarrier.body.hp = 300
        this.outerBarrier.danger = Math.ceil(this.outerBarrier.body.maxHp / 4)
        this.outerBarrier.classNames = this.outerBarrier.body.label

        this.barriers.push(this.outerBarrier)

        this.theEnd = false


        this.firstBarrageTimeout = setTimeout(() => this.firstBarrage(), 3000)
        this.secondBarrageTimeout = setTimeout(() => this.secondBarrage(), 20000)
        this.thirdBarrageTimeout = setTimeout(() => this.thirdBarrage(), 38000)
        this.fourthBarrageTimeout = setTimeout(() => this.fourthBarrage(), 48000)
        this.theEndTimeout = setTimeout(() => this.theEnd = true, 65000)
        this.endTimeout = setTimeout(() => this.end = new Rectangle(0, 0, 2000, 1000, { isStatic: true, isSensor: true }, this.world), 65150)

        this.timeouts = []
        this.timeouts.push(this.firstBarrageTimeout, this.secondBarrageTimeout, this.thirdBarrageTimeout, this.fourthBarrageTimeout, this.theEndTimeout, this.endTimeout)

    }

    firstBarrage = () => {
        this.wave(-1000, 0, 1)
        let secondWave = setTimeout(() => this.wave(1000, 0, -1), 3000)
        let thirdWave = setTimeout(() => this.wave(-1000, -200, 1), 6000)
        let fourthWave = setTimeout(() => this.wave(1000, -200, -1), 9000)
        this.timeouts.push(secondWave, thirdWave, fourthWave)
    }

    wave = (originX, originY, waveDirection) => {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                let bullet = new Bullet(originX + i * 25 * waveDirection, originY + i * Math.sin(i * Math.PI / 4 * -1 + 0.5), 5, this.world, this.bullets)
                this.bullets.push(bullet)
            }, 25 * i)
        }
    }


    secondBarrage = () => {
        this.surround(400)
        let secondSurround = setTimeout(() => this.surround(350), 3000)
        let thirdSurround = setTimeout(() => this.surround(300), 6000)
        let fourthSurround = setTimeout(() => this.surround(250), 9000)
        this.timeouts.push(secondSurround, thirdSurround, fourthSurround)
    }

    surround = (radius) => {
        let targetTime = 1000
        let r = radius
        let step = 2 * Math.PI / 50
        let counter = 0
        let asyncCounter = 0
        let target = Object.assign({}, this.state.player.body.position)
        for (let theta = 0; theta < 2 * Math.PI; theta += step) {
            counter++
            let bulletTimeout = setTimeout(() => {
                asyncCounter++
                let bullet = new CoordinatedHomingBullet(r * Math.cos(theta) + target.x, -r * Math.sin(theta) + target.y, 5, target, this.world, this.bullets, targetTime - 10 * asyncCounter)
                this.bullets.push(bullet)
            }, 10 * counter)
            this.timeouts.push(bulletTimeout)
        }
    }

    thirdBarrage = () => {
        this.cluster(-1000, -500)
        let secondCluster = setTimeout(() => this.cluster(1000, -500), 2500)
        let thirdCluster = setTimeout(() => this.cluster(1000, 500), 5000)
        let fourthCluster = setTimeout(() => this.cluster(-1000, 500), 7500)
        this.timeouts.push(secondCluster, thirdCluster, fourthCluster)

    }

    cluster = (x, y) => {
        this.explosion(350, x, y, 0)
        let secondExplosion = setTimeout(() => this.explosion(400, x, y, 100), 100)
        let thirdExplosion = setTimeout(() => this.explosion(450, x, y, 200), 200)

        this.timeouts.push(secondExplosion, thirdExplosion)
    }
    explosion = (radius, x, y, timerOffset) => {
        let r = radius
        let step = 2 * Math.PI / 50
        let counter = 0
        let asyncCounter = 0
        let target = Object.assign({}, this.state.player.body.position)
        let targetTime = 1000 - timerOffset

        for (let theta = 0; theta < 2 * Math.PI; theta += step) {
            counter++
            let bulletTimeout = setTimeout(() => {
                asyncCounter++
                let bullet = new CoordinatedHomingBullet(r * Math.cos(theta) + x, -r * Math.sin(theta) + y, 5, target, this.world, this.bullets, targetTime - 10 * asyncCounter)
                this.bullets.push(bullet)
            }, 10 * counter)
            this.timeouts.push(bulletTimeout)
        }
    }

    fourthBarrage = () => {
        this.cascade(1000, -475, -1)
        let secondCascade = setTimeout(() => this.cascade(-1000, -475, 1), 5000)
        let thirdCascade = setTimeout(() => this.cascade(1000, -475, -1), 10000)
        this.timeouts.push(secondCascade, thirdCascade)
    }

    cascade = (originX, originY, waveDirection) => {
        for (let i = 0; i < 101; i++) {
            let bullet = setTimeout(() => {
                if (i % 2 === 0) {
                    let bullet = new Bullet(originX + i * 25 * waveDirection, originY, 5, this.world, this.bullets)
                    this.bullets.push(bullet)
                }
            }, 5 * i)

            let secondBullet = setTimeout(() => {
                if (i % 2 !== 0) {
                    let bullet = new Bullet(originX + i * 25 * waveDirection, originY + 50, 5, this.world, this.bullets)
                    this.bullets.push(bullet)
                }
            }, 5 * i + 500)

            let thirdBullet = setTimeout(() => {
                if (i % 2 === 0) {
                    let bullet = new Bullet(originX + i * 25 * waveDirection, originY + 100, 5, this.world, this.bullets)
                    this.bullets.push(bullet)
                }
            }, 5 * i + 1000)

            this.timeouts.push(bullet, secondBullet, thirdBullet)
        }
    }

    render() {
        return (
            <React.Fragment >
                <Background />
                {this.renderScene()}
                {this.state.theEnd === true && <rect x="-1000" y="-500" width="2000" height="1000" fill="white" pointerEvents="none" className="disappear"></rect>}
            </React.Fragment >
        )
    }
}

export default Scene1

