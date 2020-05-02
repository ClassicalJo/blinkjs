import Scene from '../common/Scene'
import { Enemy, Satellite, } from '../common/Enemy'
import { World, Composite } from 'matter-js'
import Target from "../common/TargetingSystem"
import { Laser, AimLaser, AimedBullet } from '../common/EnemyBullets'
import { Howl } from 'howler'
import bloodLaser from "../assets/sounds/sfx/blood_laser.wav"
import bloodExplosion from "../assets/sounds/sfx/blood_explosion.wav"
import bloodMovement from "../assets/sounds/sfx/blood_movement.wav"
import bloodShotgun from "../assets/sounds/sfx/blood_shotgun.wav"
import bloodBullet from "../assets/sounds/sfx/blood_bullet.wav"

class Scene2 extends Scene {
    constructor() {
        super()
        
        this.enemy = new Enemy(0, -350, 50, 250, this.world)
        this.enemy.name = "blood"
        this.enemy.coreColor = "red"
        this.enemy.className = "appear"

        this.phobos = new Satellite(0, -387.5, 5, this.world)
        this.phobos.name = "satellite"
        this.phobos.coreColor = "red"
        this.phobos.className = "appear"


        this.deimos = new Satellite(0, -312.5, 5, this.world)
        this.deimos.name = "satellite"
        this.deimos.coreColor = "red"
        this.deimos.className = "appear"

        this.blood = Composite.create()
        Composite.add(this.blood, this.enemy.body)
        Composite.add(this.blood, this.phobos.body)
        Composite.add(this.blood, this.deimos.body)
        
        World.add(this.world, [this.enemy.body, this.phobos.body, this.deimos.body])
        this.enemies.push(this.enemy, this.phobos, this.deimos)

        this.orbitMaxSpeed = 15 * Math.PI / 180
        this.orbitSpeedPower = 5
        this.orbit = setInterval(() => { if (this.enableOrbit === true) Composite.rotate(this.blood, this.orbitMaxSpeed * this.orbitSpeedPower / 100, { x: this.enemy.body.position.x, y: this.enemy.body.position.y }) }, 8)

        this.bloodyCheck = setInterval(() => {
            if (this.enemy.body.hp < this.enemy.body.maxHp / 2) {
                this.enemy.className = "blood bloodied"
            }
            clearInterval(this.bloodyCheck)
        }, 20)

        this.intervals.push(this.orbit, this.bloodyCheck)
        this.schedule.push(
            () => this.intro(),
            () => this.deploy(-800, -200, 10, () => this.timeout(this.next, 500)),
            () => this.rotateBlood(270 * Math.PI / 180, 4, () => this.timeout(this.next, 500)),
            () => this.aimAndRotate(() => this.timeout(this.next, 1000)),

            () => this.deploy(800, -200, 20, () => this.timeout(this.next, 500)),
            () => this.rotateBlood(180 * Math.PI / 180, 4, () => this.timeout(this.next, 500)),
            () => this.aimAndRotate(() => this.timeout(this.next, 1000)),

            () => this.deploy(0, -350, 10, () => this.timeout(this.next, 500)),

            () => this.rotateBlood(270 * Math.PI / 180, 4, () => this.timeout(this.next, 0)),
            () => this.waveBarrage(),
            () => this.timeout(() => this.rotateBlood(180 * Math.PI / 180, 4, this.next), 0),
            () => this.waveBarrage(),
            () => this.rotateBlood(450 * Math.PI / 180, 2, () => this.timeout(this.next, 500)),

            () => this.verticalClean(925, 500),
            () => this.fireBarrage(),
            () => this.verticalSweep(925),

            () => this.horizontalClean(925, 500),
            () => null,
            () => this.horizontalSweep(500),

            () => this.verticalClean(-925, 500),
            () => null,
            () => this.verticalSweep(-925),

            () => this.horizontalClean(925, -500),
            () => null,
            () => this.horizontalSweep(-500),
            () => this.timeout(this.next, 1000),

            () => {
                this.moveBody(this.enemy.body, 0, 0, 10, this.next)
                this.moveBody(this.phobos.body, 0, -75, 10, this.next)
                this.moveBody(this.deimos.body, 0, 75, 10, () => this.timeout(this.next, 1000))
            },

            () => null,
            () => null,
            () => this.rotateBlood(360 * Math.PI / 180, 2, this.next),
            () => this.finale(),
            () => this.finale(),
            () => this.timeout(() => this.theEnd(), 5000)
        )
        this.step = this.scheduleStart()
        this.schedule[this.step.next().value]()

        this.sfx.blood = {
            movement: new Howl({
                src: [bloodMovement],
                preload: true,
            }),
            shotgun: new Howl({
                src: [bloodShotgun],
                preload: true,
            }),
            laser: new Howl({
                src: [bloodLaser],
                preload: true,
                volume: 0.35
            }),
            explosion: new Howl({
                src: [bloodExplosion],
                preload: true,
                volume: 0.35
            }),
            bullet: new Howl({
                src: [bloodBullet],
                preload: true,
            })
        }
    }



    fireBarrage = () => {
        for (let i = 0; i < 14500; i += 500) {
            if (i % 2000 !== 0) this.timeout(() => this.bloodFire(), i)
        }
    }

    bloodFire = () => {
        for (let i = 0; i < 3; i++) {
            this.timeout(() => {
                new AimedBullet(this.enemy.body.position.x, this.enemy.body.position.y, this.player.body.position.x, this.player.body.position.y, 5, 20, 0, this.world, this.bullets)
                this.sfx.blood.bullet.stop()
                this.sfx.blood.bullet.play()
            }, 50 * i)
        }
    }

    intro = () => {
        this.timeout(() => {
            let bodyArray = [this.enemy, this.phobos, this.deimos]
            bodyArray.forEach(key => key.className = "blood")
            this.moveBody(this.phobos.body, 0, -425, 0.4)
            this.moveBody(this.deimos.body, 0, -275, 0.4,
                () => this.timeout(() => this.rotateBlood(270 * Math.PI / 180, 4, () => {
                    if (this.props.showIntro) {
                        this.setMessage("ENEMY #2: BLOOD", () => {
                            window.addEventListener("keydown", this.theStart)
                        })
                    }
                    else {
                        this.player.movement = true
                        this.next()
                    }
                }), 500))
        }, 500)
    }


    horizontalClean = (x, y) => {
        this.moveBody(this.phobos.body, x, y, 15, this.next)
        this.moveBody(this.deimos.body, -x, y, 15, this.next)
    }

    verticalClean = (x, y) => {
        this.moveBody(this.phobos.body, x, y, 15, this.next)
        this.moveBody(this.deimos.body, x, -y, 15, this.next)
    }

    horizontalSweep = (pStartY) => {
        let aim = new AimLaser(this.deimos.body.position.x, this.deimos.body.position.y, Math.abs(this.phobos.body.position.x - this.deimos.body.position.x), 5, 0, this.world, this.bullets)
        this.timeout(() => {
            aim.remove()
            this.sfx.blood.laser.play()
            let laser = new Laser(this.deimos.body.position.x, this.deimos.body.position.y, Math.abs(this.phobos.body.position.x - this.deimos.body.position.x), 5, 0, this.world, this.bullets)
            let sweep = Composite.create()
            Composite.add(sweep, laser.body)
            Composite.add(sweep, this.deimos.body)
            Composite.add(sweep, this.phobos.body)
            for (let i = 0; i < 2 * Math.abs(pStartY) / 8; i++) {
                pStartY > 0 ? this.timeout(() => Composite.translate(sweep, { x: 0, y: -8 }), i * 8) : this.timeout(() => Composite.translate(sweep, { x: 0, y: 8 }), i * 8)
            }
            this.timeout(() => {
                laser.remove()
                this.next()
            }, 2 * Math.abs(pStartY) / 8 * 8)
        }, 1000)
    }

    verticalSweep = (pStartX) => {
        let aim = new AimLaser(this.deimos.body.position.x, this.deimos.body.position.y, 1000, 5, 90 * Math.PI / 180, this.world, this.bullets)
        this.timeout(() => {
            aim.remove()
            this.sfx.blood.laser.play()
            let laser = new Laser(this.deimos.body.position.x, this.deimos.body.position.y, 1000, 5, 90 * Math.PI / 180, this.world, this.bullets)
            let sweep = Composite.create()
            Composite.add(sweep, laser.body)
            Composite.add(sweep, this.deimos.body)
            Composite.add(sweep, this.phobos.body)
            for (let i = 0; i < 2 * Math.abs(pStartX) / 8; i++) {
                pStartX > 0 ? this.timeout(() => Composite.translate(sweep, { x: -8, y: 0 }), i * 8) : this.timeout(() => Composite.translate(sweep, { x: 8, y: 0 }), i * 8)
            }
            this.timeout(() => {
                laser.remove()
                this.next()
            }, 2 * Math.abs(pStartX) / 8 * 8)
        }, 1000)
    }

    finale = () => {
        this.enableOrbit = true
        this.setOrbitSpeed(100,
            () => {
                this.timeout(() => this.explosion(100), 1000)
                this.timeout(() => this.explosion(100), 3000)
                this.timeout(() => this.explosion(100), 5000)
                this.timeout(() => this.next(), 7000)
            })
    }

    explosion = (r) => {
        let radius = r
        let targetTime = 1500
        let step = 2 * Math.PI / 40
        for (let theta = 0; theta < 2 * Math.PI; theta += step) {
            this.timeout(() => {
                new AimedBullet(this.enemy.body.position.x + radius * Math.cos(theta),
                    this.enemy.body.position.y + radius * Math.sin(theta),
                    this.enemy.body.position.x + radius * 2 * Math.cos(theta),
                    this.enemy.body.position.y + radius * 2 * Math.sin(theta),
                    5, 20, targetTime, this.world, this.bullets)
            }, theta / (2 * Math.PI / 40) * 16)
        }
        this.timeout(() => this.sfx.blood.explosion.play(), targetTime)
    }

    waveBarrage = () => {
        this.wave(150)
        this.timeout(() => this.wave(125), 1000)
        this.timeout(() => this.wave(100), 2000)
        this.timeout(() => this.next(), 2000)
    }

    wave = (r) => {
        let radius = r
        let targetTime = 1000
        let counter = 0
        let random = Math.random() * 30
        let step = 2 * Math.PI / (random + 20)
        for (let [i, asyncCounter] = [30 * Math.PI / 180, 0]; i <= 150 * Math.PI / 180; i += step, asyncCounter++) {
            counter++
            let bulletTimeout = setTimeout(() => {
                new AimedBullet(
                    radius * Math.cos(i) + this.enemy.body.position.x,
                    radius * Math.sin(i) + this.enemy.body.position.y,
                    500 * Math.cos(i) + this.enemy.body.position.x,
                    500 * Math.sin(i) + this.enemy.body.position.y,
                    5, 30, targetTime - asyncCounter * 15, this.world, this.bullets)
            },
                counter * 15)
            this.timeouts.push(bulletTimeout)
        }
        this.timeout(() => this.sfx.blood.shotgun.play(), targetTime)
    }

    deploy = (x, y, speed, callback) => {
        this.sfx.blood.movement.play()
        this.enableOrbit = false
        this.moveBody(this.phobos.body, x + this.phobos.body.position.x - this.enemy.body.position.x, y + this.phobos.body.position.y - this.enemy.body.position.y, speed)
        this.moveBody(this.deimos.body, x + this.deimos.body.position.x - this.enemy.body.position.x, y + this.deimos.body.position.y - this.enemy.body.position.y, speed)
        this.moveBody(this.enemy.body, x, y, speed, callback)
    }

    aimAndRotate = (callback) => {
        let thetaPhobos = Target.getTheta(this.phobos.body.position.x, this.phobos.body.position.y, this.player.body.position.x, this.player.body.position.y)
        let thetaDeimos = Target.getTheta(this.deimos.body.position.x, this.deimos.body.position.y, this.player.body.position.x, this.player.body.position.y)
        let aimPhobos = new AimLaser(this.phobos.body.position.x, this.phobos.body.position.y, 2000, 5, thetaPhobos, this.world, this.bullets)
        let aimDeimos = new AimLaser(this.deimos.body.position.x, this.deimos.body.position.y, 2000, 5, thetaDeimos, this.world, this.bullets)

        this.timeout(() => {
            aimPhobos.remove()
            aimDeimos.remove()
            let fearLaser = new Laser(this.phobos.body.position.x, this.phobos.body.position.y, 2000, 5, thetaPhobos, this.world, this.bullets)
            let terrorLaser = new Laser(this.deimos.body.position.x, this.deimos.body.position.y, 2000, 5, thetaDeimos, this.world, this.bullets)
            this.sfx.blood.laser.play()
            this.timeout(() => {
                this.sfx.blood.laser.stop()
                this.sfx.blood.laser.play()
            }, 900)
            for (let i = 0; i < 2 * Math.PI / (Math.PI / 180); i++) {
                this.timeout(() => {
                    fearLaser.rotate(Math.PI / 180)
                    terrorLaser.rotate(Math.PI / -180)
                }, 12 * i)
            }
            this.timeout(() => {
                fearLaser.remove()
                terrorLaser.remove()
                callback()
            }, 12 * (2 * Math.PI / (Math.PI / 180)) + 500)
        }, 1000)
    }




    rotateBlood = (totalAngle, speed, callback) => {
        for (let i = 0; i < totalAngle / (2 * Math.PI / 180); i++) {
            this.timeout(() => Composite.rotate(this.blood, 2 * Math.PI / 180, { x: this.enemy.body.position.x, y: this.enemy.body.position.y }), i * (16 / speed))
        }
        if (callback) this.timeout(() => callback(), totalAngle / (2 * Math.PI / 180) * (16 / speed) + 500)
    }

    setOrbitSpeed = (targetSpeed, callback) => {
        let totalTime = 0
        for (let i = 0; i < Math.abs(this.orbitSpeedPower - targetSpeed); i++) {
            totalTime++
            let orbit = setTimeout(() => this.orbitSpeedPower < targetSpeed ? this.orbitSpeedPower += 1 : this.orbitSpeedPower -= 1, 25 * i)
            this.timeouts.push(orbit)
        }
        if (callback) {
            this.timeout(callback, totalTime * 25)
        }
        return totalTime * 25
    }
}

export default Scene2


