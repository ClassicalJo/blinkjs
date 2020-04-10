import { Enemy } from '../common/Enemy';
import SphereBarrier from '../common/SphereBarrier'
import Scene from '../common/Scene'
import { Bullet, AimedBullet, BouncerBullet, HomingBullet } from "../common/EnemyBullets"
import "../assets/css/scene1.css"

class Scene1 extends Scene {
    constructor() {
        super()
        this.enemy = new Enemy(0, -700, 50, 5, this.world)
        this.enemy.name = "sakura"
        this.enemy.coreColor = "pink"
        this.enemy.className = "sakura"
        this.enemies.push(this.enemy)

        this.schedule.push(
            () => this.intro(),
            () => this.firstBarrage(),
            () => this.secondBarrage(),
            () => this.thirdBarrage(),
            () => this.fourthBarrage(),
            () => {
                this.outerBarrier.className = ""
                this.next()
            },
            () => this.timeout(() => this.theEnd(), 5000),
        )
        this.step = this.scheduleStart()
        this.schedule[this.step.next().value]()
    }

    intro = () => {
        this.moveBody(this.enemy.body, 0, -350, 2, () => {
            this.timeout(() => {
                this.outerBarrier = new SphereBarrier(0, -350, 70, 225, this.world)
                this.barriers.push(this.outerBarrier)
            }, 1000)
            this.timeout(() => {
                if (this.props.showIntro) {
                    this.setMessage("ENEMY #1: SAKURA", () => {
                        window.addEventListener("touchstart", this.theStart)
                        window.addEventListener("keydown", this.theStart)
                    })
                }
                else {
                    this.player.movement = true
                    this.next()
                }
            }, 2000)
        })
    }


    firstBarrage = () => {
        this.wave(-1000, 0, 1)
        this.timeout(() => this.wave(1000, 0, -1), 3000)
        this.timeout(() => this.wave(-1000, -200, 1), 6000)
        this.timeout(() => this.wave(1000, -200, -1), 9000)
        this.timeout(() => this.next(), 14000)
    }

    wave = (originX, originY, waveDirection) => {
        for (let i = 0; i < 100; i++) {
            this.timeout(() => {
                new Bullet(originX + i * 25 * waveDirection, originY + i * Math.sin(i * Math.PI / 4 * -1 + 0.5), 5, 15, 1000, this.world, this.bullets)
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

    surround = (radius) => {
        let targetTime = 1000
        let r = radius
        let step = 2 * Math.PI / 50
        let counter = 0
        let { x: originX, y: originY } = this.player.body.position

        for (let [theta, asyncCounter] = [0, 0]; theta < 2 * Math.PI; theta += step, asyncCounter++) {
            counter++
            this.timeout(() => {
                new AimedBullet(r * Math.cos(theta) + originX, -r * Math.sin(theta) + originY, originX, originY, 5, 20, targetTime - 10 * asyncCounter, this.world, this.bullets)
            }, 10 * counter)
        }
    }


    thirdBarrage = () => {
        this.bouncerCluster(850, -350)
        this.timeout(() => this.bouncerCluster(-850, -350), 4000)
        this.timeout(() => this.bouncerCluster(850, -350), 8000)
        this.timeout(() => this.bouncerCluster(-850, -350), 12000)
        this.timeout(() => this.next(), 15000)
    }

    bouncerCluster = (originX, originY) => {
        for (let i = 0; i < 4; i++) {
            this.timeout(() => {
                let bouncer = new BouncerBullet(originX, originY, this.player.body.position.x, this.player.body.position.y, 50, 35, 100, this.world, this.bullets)
                bouncer.className = "bouncer"
            }, i * 500)
        }
    }

    fourthBarrage = () => {
        this.cascade(0, -250, 1500)
        this.timeout(() => this.cascade(0, -250, 1500), 3000)
        this.timeout(() => this.cascade(0, -250, 1500), 6000)
        this.timeout(() => this.next(), 9000)
    }

    cascade = (originX, originY, delay) => {
        let bullet = new HomingBullet(originX, originY, this.player.body.position, 40, 20, delay, this.world, this.bullets)
        bullet.body.label = "bigBullet"
        bullet.className = "bouncer"
        for (let i = 1; i <= 5; i++) {
            this.timeout(() => {
                let bullet = new HomingBullet(originX + 150 * i, originY - 50 * i, this.player.body.position, 40, 20, delay - 25 * i, this.world, this.bullets)
                bullet.body.label = "bigBullet"
                bullet.className = "bouncer"
            }, 25 * i)
        }
        for (let i = 1; i <= 5; i++) {
            this.timeout(() => {
                let bullet = new HomingBullet(originX - 150 * i, originY - 50 * i, this.player.body.position, 40, 20, delay - 25 * i, this.world, this.bullets)
                bullet.body.label = "bigBullet"
                bullet.className = "bouncer"
            }, 25 * i)
        }
    }
}

export default Scene1
