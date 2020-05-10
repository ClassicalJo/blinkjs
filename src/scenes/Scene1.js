import Scene, { mapStateToProps, mapDispatchToProps } from "../common/Scene"
import { Enemy } from '../common/Enemy';
import SphereBarrier from '../common/SphereBarrier'
import { Bullet, AimedBullet, BouncerBullet, sakuraHoming } from "../common/EnemyBullets"
import { withCookies } from "react-cookie"
import { connect } from 'react-redux'


class Scene1 extends Scene {
    constructor() {
        super()
        this.enemy = new Enemy(0, -650, 50, 5, this.world, this.enemies)
        this.enemy.name = "sakura"
        this.enemy.coreColor = "pink"

        this.schedule.push(
            () => this.setBackgroundMusic("sakura"),
            () => this.intro(),
            () => this.firstBarrage(),
            () => this.secondBarrage(),
            () => this.thirdBarrage(),
            () => this.fourthBarrage(),
            () => this.timeout(() => {
                this.theEnd({...this.enemy.body.position})
                this.enemy.remove()
                if (this.outerBarrier.remove !== undefined) this.outerBarrier.remove()
            }, 3000),
        )
        this.step = this.scheduleStart()
        this.checkPreload(() => this.schedule[this.step.next().value]())
    }



    intro = () => {
        this.moveBody(this.enemy.body, 0, -350, 4, () => {
            this.timeout(() => {
                this.outerBarrier = new SphereBarrier(0, -350, 70, 1, this.world, this.barriers)
            }, 500)
            this.timeout(() => {
                if (this.props.showIntro) {
                    this.setMessage("ENEMY #1: SAKURA", () => {
                        window.addEventListener("keydown", this.theStart)
                    })
                }
                else {
                    this.player.movement = true
                    this.next()
                }
            }, 1000)
        })
    }


    firstBarrage = () => {
        this.wave(-1000, 0, 1)
        this.props.sfx.sakura.barrage.play()
        this.timeout(() => {
            this.wave(1000, 0, -1)
            this.props.sfx.sakura.barrage.stop()
            this.props.sfx.sakura.barrage.play()
        }, 3000)
        this.timeout(() => {
            this.wave(-1000, -200, 1)
            this.props.sfx.sakura.barrage.stop()
            this.props.sfx.sakura.barrage.play()
        }, 6000)
        this.timeout(() => {
            this.wave(1000, -200, -1)
            this.props.sfx.sakura.barrage.stop()
            this.props.sfx.sakura.barrage.play()
        }, 9000)
        this.timeout(() => this.next(), 14000)
    }

    wave = (originX, originY, waveDirection) => {
        for (let i = 0; i < 75; i++) {
            this.timeout(() => {
                let origin = { x: originX + i * 25 * waveDirection, y: originY + i * Math.sin(i * Math.PI / 4 * -1 + 0.5) }
                new Bullet(origin, 5, 15, 1000, this.world, this.bullets)
            }, 25 * i)
        }
    }

    secondBarrage = () => {
        this.surround(450)
        this.timeout(() => this.surround(350), 3000)
        this.timeout(() => this.surround(300), 6000)
        this.timeout(() => this.surround(250), 9000)
        this.timeout(() => this.next(), 14000)
    }

    surround = radius => {
        let targetTime = 1000
        let r = radius
        let step = 2 * Math.PI / 50
        let counter = 0
        let center = { ...this.player.body.position }
        for (let [theta, asyncCounter] = [0, 0]; theta < 2 * Math.PI; theta += step, asyncCounter++) {
            counter++
            let origin = { x: r * Math.cos(theta) + this.player.body.position.x, y: -r * Math.sin(theta) + this.player.body.position.y }
            this.timeout(() => {
                new AimedBullet(origin, center, 5, 20, targetTime - 10 * asyncCounter, this.world, this.bullets)
                this.props.sfx.sakura.bullet.play()
            }, 10 * counter)
        }
    }


    thirdBarrage = () => {
        let left = { x: -850, y: -350 }
        let right = { x: 850, y: -350 }
        this.bouncerCluster(right)
        this.timeout(() => this.bouncerCluster(left), 4000)
        this.timeout(() => this.bouncerCluster(right), 8000)
        this.timeout(() => this.bouncerCluster(left), 12000)
        this.timeout(() => this.next(), 15000)
    }

    bouncerCluster = origin => {
        for (let i = 0; i < 4; i++) {
            this.timeout(() => {
                new BouncerBullet(origin, this.player.body.position, 50, 35, 100, this.world, this.bullets)
                this.props.sfx.sakura.bouncer.play()
            }, i * 500)
        }
    }

    fourthBarrage = () => {
        let origin = { x: 0, y: -250 }
        this.cascade(origin, 1500)
        this.timeout(() => this.cascade(origin, 1500), 3000)
        this.timeout(() => this.cascade(origin, 1500), 6000)
        this.timeout(() => this.next(), 9000)
    }

    cascade = (origin, delay) => {
        new sakuraHoming(origin, this.player.body.position, 40, 20, delay, this.world, this.bullets)
        this.props.sfx.sakura.wave.play()
        this.timeout(() => this.props.sfx.sakura.cascade.play(), delay)
        for (let i = 1; i <= 5; i++) {
            this.timeout(() => {
                let right = { x: origin.x + 150 * i, y: origin.y - 50 * i }
                new sakuraHoming(right, this.player.body.position, 40, 20, delay - 25 * i, this.world, this.bullets)
            }, 25 * i)
        }
        for (let i = 1; i <= 5; i++) {
            this.timeout(() => {
                let left = { x: origin.x - 150 * i, y: origin.y - 50 * i }
                new sakuraHoming(left, this.player.body.position, 40, 20, delay - 25 * i, this.world, this.bullets)
            }, 25 * i)
        }
    }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Scene1))
