import Scene, { mapStateToProps, mapDispatchToProps } from "../common/Scene"
import { Enemy } from '../common/Enemy'
import { Composite, Body } from 'matter-js'
import Target from "../common/TargetingSystem"
import { avaBullet, avaHoming, avaPointer, avaRailgun, avaAim, avaCannon } from "../common/EnemyBullets"
import { connect } from 'react-redux'
import { withCookies } from "react-cookie"

class Scene5 extends Scene {
    constructor(props) {
        super(props)
        this.enemy = new Enemy(0, -350, 50, 275, this.world, this.enemies)
        this.enemy.name = "ava"
        this.enemy.coreColor = "white"
        this.enemy.trail = true
        this.colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"]
        this.spotters = []
        this.schedule.push(
            () => this.setBackgroundMusic("ava"),
            () => this.spotter.pointer(this.enemy.body.position, this.next),
            () => this.spotter.create(this.enemy.body.position, this.next),
            () => this.spotter.create(this.enemy.body.position, this.next),
            () => {
                this.moveBody(this.spotters[0].body, 0, -249, 1)
                this.moveBody(this.spotters[1].body, -200, -300, 2)
                this.moveBody(this.spotters[2].body, 200, -300, 2, this.next)
            },
            () => this.intro(),
            () => this.bells(1000, this.next),
            () => this.bells(1000, this.next),
            () => this.bells(500, this.next),
            () => this.bells(500, this.next),
            () => this.bells(250, this.next),
            () => this.bells(250, this.next),
            () => this.bells(125, this.next),
            () => this.bells(125, this.next),
            () => this.bells(125, this.next),
            () => this.bells(125, this.next),
            () => this.fire.cannon(this.spotters[0].body.position, this.player.body.position, this.next),
            () => this.timeout(this.next, 500),
            () => this.fire.cannon(this.spotters[2].body.position, this.player.body.position, this.next),
            () => this.timeout(this.next, 500),
            () => this.fire.cannon(this.spotters[1].body.position, this.player.body.position, this.next),
            () => this.timeout(this.next, 2500),
            () => this.missiles(this.next),
            () => this.fireworks({ x: 500, y: 350 }, this.timeout(this.next, 500)),
            () => this.fireworks({ x: -500, y: 350 }, this.timeout(this.next, 2000)),
            () => {
                this.moveBody(this.spotters[1].body, -900, 450, 8)
                this.moveBody(this.spotters[2].body, 900, 450, 8, this.next)
            },
            () => this.timeout(this.next, 500),
            () => this.bells(1000, this.next),
            () => this.bells(1000, this.next),
            () => this.bells(500, this.next),
            () => this.bells(500, this.next),
            () => this.bells(250, this.next),
            () => this.bells(250, this.next),
            () => this.bells(125, this.next),
            () => this.bells(125, this.next),
            () => this.bells(125, this.next),
            () => this.bells(125, this.next),
            () => this.fire.cannon(this.spotters[0].body.position, this.player.body.position, this.next),
            () => this.timeout(this.next, 500),
            () => this.fire.cannon(this.spotters[2].body.position, this.player.body.position, this.next),
            () => this.timeout(this.next, 500),
            () => this.fire.cannon(this.spotters[1].body.position, this.player.body.position, this.next),
            () => this.timeout(this.next, 2500),
            () => {
                this.missiles()
                this.timeout(() => this.missiles(this.next), 2000)
            },
            () => this.timeout(this.next, 1000),
            () => {
                this.spotters.forEach(key => this.moveBody(key.body, 0, 500, 8))
                this.next()
            },
            () => this.timeout(this.next, 4000),
            () => {
                this.spotters[1].remove()
                this.spotters[2].remove()
                this.spotters.pop()
                this.spotters.pop()
                this.next()
            },
            () => this.spotter.startStream(),
            () => this.spotter.rotate(720, 2, this.next),

            () => {
                this.spotter.stream.spacing = 100
                this.next()
            },
            () => this.spotter.rotate(720, 4, this.next),
            () => this.spotter.rotate(135, 4, this.next),
            () => {
                this.spotter.stream.spacing = 50
                this.next()
            },
            () => this.spotter.rotate(90, 2, this.next),
            () => this.spotter.stream.off(),
            () => this.spotter.rotate(15, 2, this.next),
            () => this.spotter.create(this.pointer.body.position, this.next),
            () => this.spotter.rotate(30, 2, this.next),
            () => this.spotter.create(this.pointer.body.position, this.next),
            () => this.spotter.rotate(30, 2, this.next),
            () => this.spotter.create(this.pointer.body.position, this.next),
            () => this.spotter.rotate(120, 2, this.next),
            () => this.spotter.create(this.pointer.body.position, this.next),
            () => this.spotter.rotate(30, 2, this.next),
            () => this.spotter.create(this.pointer.body.position, this.next),
            () => this.spotter.rotate(30, 2, this.next),
            () => this.timeout(this.next, 1000),
            () => this.fireworks({ x: 0, y: 0 }, this.next),
            () => this.barrage(),
            () => this.barrage(),
            () => this.barrage([this.spotters[3], 4]),
            () => this.barrage([this.spotters[0], 1], [this.spotters[4], 5]),
            () => this.barrage([this.spotters[1], 2], [this.spotters[4], 5]),
            () => this.barrage([this.spotters[0], 1], [this.spotters[2], 3], [this.spotters[4], 5]),
            () => this.barrage([this.spotters[2], 3]),
            () => this.barrage([this.spotters[0], 1], [this.spotters[4], 5]),
            () => {
                this.fireworks({ x: 0, y: 0 })
                this.barrage()
            },
            () => {
                this.timeout(() => this.fireworks({ x: 500, y: 500 }), 667 * 4)
                this.barrage()
            },
            () => {
                this.fireworks({ x: -500, y: 500 })
                this.timeout(() => this.fireworks({ x: -500, y: 500 }), 667 * 2)
                this.timeout(() => this.fireworks({ x: 0, y: 500 }), 667 * 4)
                this.barrage()
            },
            () => this.timeout(this.next, 667 * 3),
            () => {
                this.missiles()
                this.timeout(() => this.missiles(this.next), 667)
            },
            () => this.moveBody(this.enemy.body, 0, 0, 1, this.next),
            () => this.timeout(() => {
                this.theEnd({ ...this.enemy.body.position })
                this.enemy.remove()
            }, 3000),

        )
        this.step = this.scheduleStart()
        this.schedule[this.step.next().value]()


    }
    barrage = (...cannonShots) => {
        if (cannonShots.length > 0) {
            cannonShots.forEach(key => {
                this.timeout(() => this.fire.cannon(key[0].body.position, this.player.body.position), 667 * key[1])
            })
        }
        for (let i = 0; i < 6; i++) {
            this.timeout(() => this.fire.bullet(this.spotters[i].body.position, this.player.body.position, 20), 667 * i)
        }
        this.timeout(this.next, 667 * 6)
    }
    bells = (reload, callback) => {
        for (let i = 0; i < 3; i++) {
            this.timeout(() => this.fire.bullet(this.spotters[i].body.position, this.player.body.position, 25), i * reload)
        }
        if (callback) this.timeout(() => callback(), 3 * reload)
    }

    fire = {
        bullet: (origin, target, speed, callback) => {
            this.props.sfx.ava.bullet.stop()
            this.props.sfx.ava.bullet.play()
            for (let i = 0; i < 3; i++) {
                this.timeout(() => new avaBullet(origin, target, 5, speed, 0, this.world, this.bullets, "orange"), 100 * i)
            }
            if (callback) callback()
        },
        delayed: (origin, target, homing, delayHoming, speed, callback) => {
            let missile = new avaHoming(origin, target, 10, homing, delayHoming, speed, this.world, this.bullets, this.colors[Math.floor(Math.random() * this.colors.length)])
            if (callback) callback()
            return missile
        },
        cannon: (origin, target, callback) => {
            let aim = new avaAim(origin, 2000, 5, Math.atan2(target.y - origin.y, target.x - origin.x), this.world, this.bullets)
            this.props.sfx.ava.bullet.stop()
            this.props.sfx.ava.cannon.play()
            let currentAngle = Math.atan2(target.y - origin.y, target.x - origin.x)
            let angle = {
                add: () => currentAngle += Math.PI / 360,
                substract: () => currentAngle += -Math.PI / 360,
                get: () => currentAngle,
            }
            for (let i = 0; i < 667; i += 10) {
                this.timeout(() => {
                    let newAngle = Math.atan2(target.y - origin.y, target.x - origin.x)
                    if (Math.abs(newAngle - angle.get()) < Math.PI / 360) Body.rotate(aim.body, 0, origin)
                    else if (newAngle > angle.get()) {
                        Body.rotate(aim.body, Math.PI / 360, origin)
                        angle.add()
                    }
                    else if (newAngle < angle.get()) {
                        Body.rotate(aim.body, -Math.PI / 360, origin)
                        angle.substract()
                    }
                }, i)
            }
            this.timeout(() => {
                aim.remove()
                let cannon = new avaCannon(origin, 100, 5, currentAngle, this.world, this.bullets)
                let composite = Composite.create({ bodies: [cannon.body] })
                for (let i = 1; i <= 18; i++) {
                    this.timeout(() => {
                        Composite.scale(composite, 1.2, 1.2, origin)
                    }, 20 * i)
                }
                this.timeout(() => {
                    document.querySelector(`#fade${cannon.body.id}`).beginElement()
                    for (let i = 1; i <= 25; i++) {
                        this.timeout(() => {
                            Composite.scale(composite, 0.85, 0.85, origin)
                            if (i === 25) cannon.remove()
                        }, 15 * i)
                    }
                }, 1000 + 18 * 20)
            }, 667)
            if (callback) callback()

        }
    }

    missiles = callback => {
        let squad = []
        this.props.sfx.ava.missiles.play()
        for (let i = 1; i < 5; i++) {
            let left = { x: -500 + 100 * i, y: -500 }
            let right = { x: 500 - 100 * i, y: -500 }
            this.timeout(() => {
                let missile = this.fire.delayed(this.enemy.body.position, left, this.player.body.position, 250 - 50 * i, 25)
                squad.push(missile)
            }, 50 * i)
            this.timeout(() => {
                let missile = this.fire.delayed(this.enemy.body.position, right, this.player.body.position, 250 - 50 * i, 25)
                squad.push(missile)
            }, 50 * i + 50)
        }

        this.timeout(() => squad.forEach(key => {
            document.querySelector(`#fade${key.body.id}`).beginElement()
            document.querySelector(`#diminish${key.body.id}`).beginElement()
            document.querySelector(`#translate${key.body.id}`).beginElement()
        }), 4750)
        if (callback) this.timeout(() => callback(), 5000)
    }

    spotter = {
        create: (origin, callback) => {
            let pointer = new avaPointer(origin, 10, this.world, this.bullets)
            this.spotters.push(pointer)
            if (callback) callback()
        },
        pointer: (origin, callback) => {
            this.pointer = new avaPointer(origin, 10, this.world, this.bullets)
            this.spotters.push(this.pointer)
            if (callback) callback()
        },
        move: (target, speed, callback) => {
            this.moveBody(this.pointer.body, target.x, target.y, speed, callback)
        },
        destroy: (callback) => {
            this.pointer.remove()
            if (callback) callback()
        },
        rotate: (totalAngle, speed, callback) => {
            let composite = Composite.create()
            Composite.add(composite, this.pointer.body)
            let angle = totalAngle > -1 ? Math.PI / 180 : -Math.PI / 180
            for (let i = 0; i < Math.abs(totalAngle); i++) {
                this.timeout(() => Composite.rotate(composite, angle, { x: 0, y: 0 }), 16 / speed * i)
            }
            if (callback) this.timeout(() => callback(), (16 / speed) * Math.abs(totalAngle))
        },
        trail: true,
        stream: {
            on: () => {
                new avaRailgun(this.pointer.body.position, this.player.body.position, 5, 40, 1000, this.world, this.bullets)
                this.timeout(() => this.props.sfx.ava.railgun.play(), 1000)
                if (this.spotter.trail) this.timeout(() => this.spotter.stream.on(), this.spotter.stream.spacing)
            },
            off: () => {
                this.spotter.trail = false
                this.next()
            },
            spacing: 250
        },
        startStream: () => {
            this.spotter.trail = true
            this.spotter.stream.on()
            this.next()
        }
    }

    curveRedirect = (body, target, totalMilliseconds) => {
        for (let i = 0; i < totalMilliseconds; i += 20) this.timeout(() => Body.setVelocity(body, Target.getCircularVelocity({ ...body.position }, body.position, target, -Math.PI / 180, 250, 30)), i)
    }

    fireworks = (target, callback) => {
        let randomColor = this.colors[Math.floor(Math.random() * this.colors.length)]
        let bomb = new avaBullet(this.enemy.body.position, target, 10, 15, 0, this.world, this.bullets, randomColor)
        this.timeout(() => {
            let cluster = []
            let center = { ...bomb.body.position }
            this.props.sfx.ava.fireworks.play()
            for (let i = 0; i < 20; i++) {
                let target = {
                    x: center.x + Math.cos(2 * Math.PI / 20 * i),
                    y: center.y + Math.sin(2 * Math.PI / 20 * i)
                }
                cluster[i] = new avaBullet(center, target, 5, 20, 0, this.world, this.bullets, randomColor)
            }
            this.timeout(() => {
                this.timeout(() => this.props.sfx.ava.fireworksReverse.play(), 750)
                for (let bullet in cluster) {
                    Body.setVelocity(cluster[bullet].body, { x: -2 * Math.cos(Target.getTheta(cluster[bullet].body.position.x, cluster[bullet].body.position.y, center.x, center.y)), y: -2 * Math.sin(Target.getTheta(cluster[bullet].body.position.x, cluster[bullet].body.position.y, center.x, center.y)) })
                    this.timeout(() => this.curveRedirect(cluster[bullet].body, center, 200), 750)
                }
            }, 1000)
            bomb.remove()
        }, 667)
        if (callback) callback()
    }

    curveMovement = (body, target, angle, speed, callback) => {
        let origin = { ...body.position }
        let step = angle > 0 ? Math.PI / 180 : Math.PI / -180
        let totalAngle = angle * Math.PI / 180
        let radius = Math.sqrt(Math.pow(target.x - origin.x, 2) + Math.pow(target.y - origin.y, 2)) / 2
        let theta = Target.getTheta(origin.x, origin.y, target.x, target.y)
        let center = { x: origin.x + radius * Math.cos(theta), y: origin.y + radius * Math.sin(theta) }
        let composite = Composite.create({ bodies: [body] })

        for (let i = 0; i < Math.abs(totalAngle / step); i++) {
            this.timeout(() => Composite.rotate(composite, step, center), 16 / speed * i)
            if (i === Math.abs(totalAngle / step)) Body.setPosition(body, target)
        }
        this.timeout(() => {
            if (callback) callback()
        }, 16 / speed * (totalAngle / step))
    }

    intro = () => {
        if (this.props.showIntro) {
            this.setMessage("ENEMY #?: AVA", () => {
                window.addEventListener("keydown", this.theStart)
            })
        }
        else {
            this.player.movement = true
            this.next()
        }
    }

}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Scene5))
