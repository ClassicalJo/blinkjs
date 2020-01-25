import Enemy from '../common/Enemy';
import SphereBarrier from '../common/SphereBarrier'
import Scene from '../common/Scene'
import { Rectangle } from '../common/Bodies'
import { Bullet, AimedBullet, BouncerBullet, HomingBullet } from "../common/EnemyBullets"


class Scene1 extends Scene {
    constructor() {
        super()
        this.enemy = new Enemy(0, -350, 50, 10, this.world)
        this.enemies.push(this.enemy)
        this.outerBarrier = new SphereBarrier(0, -350, 70, 250, this.world)
        this.barriers.push(this.outerBarrier)

        this.firstBarrageTimeout = setTimeout(() => this.firstBarrage(), 3000)
        this.secondBarrageTimeout = setTimeout(() => this.secondBarrage(), 17000)
        this.thirdBarrageTimeout = setTimeout(() => this.thirdBarrage(), 32000)
        this.fourthBarrageTimeout = setTimeout(() => this.fourthBarrage(), 50000)
        this.theEndTimeout = setTimeout(() => this.theEnd = true, 62000)
        this.endTimeout = setTimeout(() => this.end = new Rectangle(0, 0, 2000, 1125, { isStatic: true, isSensor: true }, this.world), 65150)

        this.timeouts.push(
            this.firstBarrageTimeout,
            this.secondBarrageTimeout,
            this.thirdBarrageTimeout,
            this.fourthBarrageTimeout,
            this.theEndTimeout,
            this.endTimeout)
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
            let waveBullet = setTimeout(() => {
                new Bullet(originX + i * 25 * waveDirection, originY + i * Math.sin(i * Math.PI / 4 * -1 + 0.5), 5, 15, 1000, this.world, this.bullets)
            }, 25 * i)
            this.timeouts.push(waveBullet)
        }
    }

    secondBarrage = () => {
        this.surround(450)
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
        let { x: originX, y: originY } = this.player.body.position

        for (let [theta, asyncCounter] = [0, 0]; theta < 2 * Math.PI; theta += step, asyncCounter++) {
            counter++
            let bulletTimeout = setTimeout(() => {
                new AimedBullet(r * Math.cos(theta) + originX, -r * Math.sin(theta) + originY, originX, originY, 5, 20, targetTime - 10 * asyncCounter, this.world, this.bullets)
            }, 10 * counter)
            this.timeouts.push(bulletTimeout)
        }
    }


    thirdBarrage = () => {
        this.bouncerCluster(850, -350)
        let secondCluster = setTimeout(() => this.bouncerCluster(-850, -350), 4000)
        let thirdCluster = setTimeout(() => this.bouncerCluster(850, -350), 8000)
        let fourthCluster = setTimeout(() => this.bouncerCluster(-850, -350), 12000)
        this.timeouts.push(secondCluster, thirdCluster, fourthCluster)
    }

    bouncerCluster = (originX, originY) => {
        for (let i = 0; i < 4; i++) {
            let bouncerClusterBullet = setTimeout(() => {
                let bouncer = new BouncerBullet(originX, originY, this.player.body.position.x, this.player.body.position.y, 50, 45, 100, this.world, this.bullets)
                bouncer.className = "bouncer"
            }, i * 500)
            this.timeouts.push(bouncerClusterBullet)
        }
    }

    fourthBarrage = () => {
        this.cascade(0, -250, 1500)
        let secondCascade = setTimeout(() => this.cascade(0, -250, 1500), 3000)
        let thirdCascade = setTimeout(() => this.cascade(0, -250, 1500), 6000)
        this.timeouts.push(secondCascade, thirdCascade)
    }

    cascade = (originX, originY, delay) => {
        let bullet = new HomingBullet(originX, originY, this.player.body.position, 40, 20, delay, this.world, this.bullets)
        bullet.body.label = "bigBullet"
        bullet.className = "bouncer"
        for (let i = 1; i <= 5; i++) {
            let bulletTimeout = setTimeout(() => {
                let bullet = new HomingBullet(originX + 150 * i, originY - 50 * i, this.player.body.position, 40, 20, delay - 25 * i, this.world, this.bullets)
                bullet.body.label = "bigBullet"
                bullet.className = "bouncer"
            }, 25 * i)
            this.timeouts.push(bulletTimeout)
        }
        for (let i = 1; i <= 5; i++) {
            let bulletTimeout = setTimeout(() => {
                let bullet = new HomingBullet(originX - 150 * i, originY - 50 * i, this.player.body.position, 40, 20, delay - 25 * i, this.world, this.bullets)
                bullet.body.label = "bigBullet"
                bullet.className = "bouncer"
            }, 25 * i)
            this.timeouts.push(bulletTimeout)
        }
    }
}

export default Scene1
