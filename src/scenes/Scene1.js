import React from 'react'
import Enemy from '../common/Enemy';
import SphereBarrier from '../common/SphereBarrier'
import Scene from '../common/Scene'
import Rectangle from '../common/Rectangle'
import Background from "../assets/svg/Background"
import Bullet from "../common/Bullet"
import BouncerBullet from "../common/BouncerBullet"
import CoordinatedHomingBullet from "../common/CoordinatedHomingBullet"
import TargetedBullet from '../common/TargetedBullet'


class Scene1 extends Scene {
    constructor() {
        super()
        this.enemy = new Enemy(0, -350, 50, 10, this.world)
        this.enemies.push(this.enemy)

        this.outerBarrier = new SphereBarrier(0, -350, 80, 250, this.world)
        this.barriers.push(this.outerBarrier)

        this.player.body.label = "player"

        this.firstBarrageTimeout = setTimeout(() => this.firstBarrage(), 3000)
        this.secondBarrageTimeout = setTimeout(() => this.secondBarrage(), 17000)
        this.thirdBarrageTimeout = setTimeout(() => this.thirdBarrage(), 32000)
        this.fourthBarrageTimeout = setTimeout(() => this.fourthBarrage(), 50000)
        this.theEndTimeout = setTimeout(() => this.theEnd = true, 62000)
        this.endTimeout = setTimeout(() => this.end = new Rectangle(0, 0, 2000, 1000, { isStatic: true, isSensor: true }, this.world), 65150)

        this.timeouts.push(this.firstBarrageTimeout, this.secondBarrageTimeout, this.thirdBarrageTimeout, this.fourthBarrageTimeout, this.theEndTimeout, this.endTimeout)

    }

    thirdBarrage = () => {
        this.bouncerCluster(850, -350)
        let secondCluster = setTimeout(() => this.bouncerCluster(-850, -350), 4000)
        let thirdCluster = setTimeout(() => this.bouncerCluster(850, -350), 8000)
        let fourthCluster = setTimeout(() => this.bouncerCluster(-850, -350), 12000)
        this.timeouts.push(secondCluster, thirdCluster, fourthCluster)
    }

    bouncerCluster = (originX, originY, ) => {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                let bullet = new BouncerBullet(originX, originY, 50, this.player, this.world, this.bullets)
                bullet.body.label = "bouncer"
                this.bullets.push(bullet)
            }, i * 500)
        }
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
        let { x: originX, y: originY } = this.player.body.position

        for (let theta = 0; theta < 2 * Math.PI; theta += step) {
            counter++
            let bulletTimeout = setTimeout(() => {
                asyncCounter++
                let bullet = new CoordinatedHomingBullet(r * Math.cos(theta) + originX, originX, -r * Math.sin(theta) + originY, originY, 5, this.player, this.world, this.bullets, targetTime - 10 * asyncCounter)
                this.bullets.push(bullet)
            }, 10 * counter)
            this.timeouts.push(bulletTimeout)
        }
    }


    fourthBarrage = () => {
        this.cascade(-1100, -350, -1100, 450, 1)
        let secondCascade = setTimeout(() => this.cascade(1100, -350, 1100, 450, -1), 2000)
        let thirdCascade = setTimeout(() => this.cascade(-1100, -350, -1100, 450, 1), 4000)
        this.timeouts.push(secondCascade, thirdCascade)
    }

    cascade = (originX, originY, targetX, targetY, waveDirection) => {
        this.drop(originX, originY, targetX, targetY, waveDirection)
        let secondDrop = setTimeout(() => this.drop(originX - 100, originY - 50, targetX - 100, targetY, waveDirection), 250)
        let thirdDrop = setTimeout(() => this.drop(originX, originY - 100, targetX, targetY, waveDirection), 500)
        this.timeouts.push(secondDrop, thirdDrop)
    }
    drop = (originX, originY, targetX, targetY, waveDirection) => {
        for (let i = 0; i < 11; i++) {
            let bulletTimeout = setTimeout(() => {
                let bullet = new TargetedBullet(originX + 2000 / 10 * i * waveDirection, targetX + 2000 / 10 * i * waveDirection, originY, targetY, 40, this.world, this.bullets)
                bullet.body.label = "bigBullet"
                this.bullets.push(bullet)
            }, 25 * i)
            this.timeouts.push(bulletTimeout)
        }
    }

    render() {
        return (
            <React.Fragment >
                <Background />
                {this.renderScene()}
            </React.Fragment >
        )
    }
}

export default Scene1

