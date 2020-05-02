import { Body, Bodies, Vertices, World, Composite } from "matter-js"
import Target from './TargetingSystem'
import decomp from 'poly-decomp';
window.decomp = decomp

let reference = Bodies.rectangle(0, 0, 100, 10, {})

export class Projectile {
    constructor(world, container) {
        let intervals = []
        this.timeout = (callback, delay) => {
            let timeStamp = Number(world.timer)
            let intervalName = setInterval(() => {
                if (Math.abs(timeStamp - world.timer) * 1000 >= delay) {
                    callback()
                    clearInterval(intervalName)
                }
            }, 10)
            intervals.push(intervalName)
        }
        this.isOffScreen = (x, y) => { return (x > 1250 || x < -1250 || y > 812.5 || y < -812.5) }
        this.remove = () => {
            World.remove(world, this.body)
            intervals.forEach(key => clearInterval(key))
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }

}
export class Bullet extends Projectile {
    constructor(x, y, r, speed, delay, world, container) {
        super(world, container);
        this.body = Bodies.circle(x, y, r, { isSensor: true, label: "bullet" })
        this.timeout(() => Body.setVelocity(this.body, { x: 0, y: speed }), delay)
        this.timeout(() => this.remove(), 2500)
        this.checkOffscreen = () => {
            if (this.isOffScreen(this.body.position.x, this.body.position.y)) this.remove()
            else this.timeout(this.checkOffscreen, 100)
        }

        World.add(world, this.body)
        container.push(this)
    }
}

export class BouncerBullet extends Projectile {
    constructor(x, y, targetX, targetY, r, speed, delay, world, container) {
        super(world, container);
        this.options = {
            restitution: 1,
            label: "bouncer",
        }
        this.body = Bodies.circle(x, y, r, this.options)
        let target = Target.getTargetVelocity(x, y, targetX, targetY, speed)

        World.add(world, this.body)
        container.push(this)

        this.timeout(() => Body.setVelocity(this.body, target), delay)
        this.timeout(() => this.remove(), 5000)
    }
}

export class AimedBullet extends Projectile {
    constructor(x, y, targetX, targetY, r, speed, delay, world, container) {
        super(world, container)
        this.body = Bodies.circle(x, y, r, { isSensor: true, label: "bullet" })

        let target = Target.getTargetVelocity(x, y, targetX, targetY, speed)
        World.add(world, this.body)
        container.push(this)

        this.timeout(() => Body.setVelocity(this.body, target), delay)
        this.timeout(() => this.remove(), 4000)
    }
}

export class HomingBullet extends Projectile {
    constructor(x, y, playerPosition, r, bulletSpeed, delay, world, container) {
        super(world, container);

        this.body = Bodies.circle(x, y, r, { isSensor: true, label: "bullet" })
        this.redirect = false
        let intervals = []
        World.add(world, this.body)
        container.push(this)

        let redirection = setInterval(() => {
            if (this.redirect) {
                let newTarget = Target.getTargetVelocity(this.body.position.x, this.body.position.y, playerPosition.x, playerPosition.y, bulletSpeed)
                Body.setVelocity(this.body, newTarget)
            }
        }, 16)

        this.timeout(() => this.redirect = true, delay)
        this.timeout(() => this.redirect = false, delay + 750)
        this.timeout(() => this.remove(), 4000)

        intervals.push(redirection)
    }
}

export class Laser {
    constructor(x, y, w, h, angle, world, container) {
        this.body = Bodies.rectangle(x + w / 2, y, w, h, { isSensor: true, label: "laser" })
        this.height = h
        this.width = w
        Body.rotate(this.body, angle, { x: x, y: y })
        World.add(world, this.body)
        container.push(this)

        this.rotate = (angle) => Body.rotate(this.body, angle, { x: x, y: y })
        this.remove = () => {
            World.remove(world, this.body)
            for (let i = 0; i < container.length; i++) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class AimLaser {
    constructor(x, y, w, h, angle, world, container) {
        this.body = Bodies.rectangle(x + w / 2, y, w, h, { isSensor: true, label: "aimLaser" })
        this.height = h
        this.width = w
        Body.rotate(this.body, angle, { x: x, y: y })
        container.push(this)

        this.remove = () => {
            World.remove(world, this.body)
            for (let i = 0; i < container.length; i++) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class nulBullet extends AimedBullet {
    constructor(x, y, targetX, targetY, r, speed, delay, world, container) {
        super(x, y, targetX, targetY, r, speed, delay, world, container)
        this.body.label = "nul"
    }
}

export class vidaBullet extends Projectile {
    constructor(x, y, targetX, targetY, r, speed, delay, world, container) {
        super(world, container)
        this.body = Bodies.circle(x, y, r, { label: "vida", isSensor: "true" })

        let velocity = Target.getTargetVelocity(x, y, targetX, targetY, speed)
        this.timeout(() => Body.setVelocity(this.body, velocity), delay)
        this.timeout(() => this.remove(), 5000)

        this.explode = () => {
            Body.setVelocity(this.body, { x: 0, y: 0 })
            document.querySelector(`#nuke${this.body.id}`).beginElement()
            document.querySelector(`#fill${this.body.id}`).beginElement()
            for (let i = 0; i < 10; i++) {
                this.timeout(() => Body.scale(this.body, 1.3, 1.3), i * 15)
            }
        }

        World.add(world, this.body)
        container.push(this)

        this.remove = () => {
            World.remove(world, this.body)
            for (let i in container) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }

        this.timeout(() => this.explode(), 2000)

    }
}

export class vidaLaser extends Projectile {
    constructor(x, y, w, h, target, speed, delay, world, container) {
        super(world, container)
        this.body = Bodies.rectangle(x, y, w, h, { isSensor: true, label: "lifeLaser", frictionAir: 0 })
        this.height = h
        this.width = w
        let theta = Target.getTheta(x, y, target.x, target.y)
        Body.rotate(this.body, theta * 180 / Math.PI, { x: this.body.position.x, y: this.body.position.y })
        let velocity = Target.getTargetVelocity(x, y, target.x, target.y, speed)
        this.timeout(() => Body.setVelocity(this.body, velocity), delay)
        this.timeout(() => this.remove(), 4000)

        World.add(world, this.body)
        container.push(this)

        this.remove = () => {
            World.remove(world, this.body)
            for (let i in container) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class vidaWave extends Projectile {
    constructor(x, y, w, h, target, speed, delay, world, container) {
        super(world, container)
        let bot = [{ x: 0, y: -h }, { x: w, y: h }, { x: w / 2, y: h }]
        let top = [{ x: 0, y: h }, { x: w, y: -h }, { x: w / 2, y: -h }]
        let center = Vertices.centre(Vertices.create(bot, reference))
        let topWing = Bodies.fromVertices(x + 100, y + center.y * 2, Vertices.create(top, reference), { isSensor: true, frictionAir: 0 })
        let botWing = Bodies.fromVertices(x + 100, y - center.y * 2, Vertices.create(bot, reference), { isSensor: true, frictionAir: 0 })
        let objective = { ...target }
        this.width = w
        this.height = h
        this.body = Composite.create({ label: "lifeWave" })
        Composite.add(this.body, topWing)
        Composite.add(this.body, botWing)
        Composite.rotate(this.body, Target.getTheta(x, y, target.x, target.y), { x: x, y: y })

        this.body.bodies.forEach(key => this.timeout(() => Body.setVelocity(key, Target.getTargetVelocity(x, y, objective.x, objective.y, speed)), delay))

        World.add(world, this.body)
        container.push(this)

        this.timeout(() => this.remove(), 3000)
    }
}

export class delayedHoming extends Projectile {
    constructor(origin, target, homing, delayHoming, speed, world, container) {
        super(world, container)
        this.body = Bodies.circle(origin.x, origin.y, 10, { isSensor: true, label: "delayedHoming" })

        let maxVelocityChange = 1

        let speedChange = newVelocity => {
            let oldVelocity = { ...this.body.velocity }
            let fixedVelocity = { ...newVelocity }
            for (let speed in newVelocity) {
                if (Math.abs(oldVelocity[speed] - newVelocity[speed]) > maxVelocityChange) {
                    newVelocity[speed] > -1 ? fixedVelocity[speed] = oldVelocity[speed] + maxVelocityChange : fixedVelocity[speed] = oldVelocity[speed] - maxVelocityChange
                }
            }
            return fixedVelocity
        }

        this.redirect = () => {
            Body.setVelocity(this.body, speedChange(Target.getTargetVelocity(this.body.position.x, this.body.position.y, homing.x, homing.y, speed)))
            this.timeout(this.redirect, 16)
        }
        this.timeout(() => this.remove(), 5000)

        World.add(world, this.body)
        container.push(this)
        this.timeout(this.redirect, delayHoming)
        Body.setVelocity(this.body, Target.getTargetVelocity(this.body.position.x, this.body.position.y, target.x, target.y, speed))

    }
}

export class avaBullet extends AimedBullet {
    constructor(x, y, targetX, targetY, r, speed, delay, world, container, color) {
        super(x, y, targetX, targetY, r, speed, delay, world, container)
        this.color = color
        this.body.label = "ava"

    }
}

export class avaHoming extends delayedHoming {
    constructor(origin, target, homing, delayHoming, speed, world, container, color) {
        super(origin, target, homing, delayHoming, speed, world, container)
        this.body.label = "avaHoming"
        this.color = color
    }
}

export class Pointer extends Projectile {
    constructor(origin, radius, world, container) {
        super(world, container)
        this.body = Bodies.circle(origin.x, origin.y, radius, { isSensor: true, label: "pointer" })
        World.add(world, this.body)
        container.push(this)
    }
}

export class avaPointer extends Pointer {
    constructor(origin, radius, world, container) {
        super(origin, radius, world, container)
        this.body.label = "avaPointer"
    }
}

export class avaRailgun extends Projectile {
    constructor(origin, target, radius, speed, delay, world, container) {
        super(world, container)
        this.body = Bodies.circle(origin.x, origin.y, radius, { isSensor: true, label: "avaRailgun" })

        World.add(world, this.body)
        container.push(this)
        this.timeout(() => {
            Body.setVelocity(this.body, Target.getTargetVelocity(this.body.position.x, this.body.position.y, target.x, target.y, speed))
        }, delay)

        this.timeout(() => this.remove(), 3000)

    }
}

export class avaAim extends AimLaser {
    constructor(x, y, w, h, angle, world, container) {
        super(x, y, w, h, angle, world, container)
        this.body.label = "avaAim"
    }
}

export class avaCannon extends Laser {
    constructor(x, y, w, h, angle, world, container) {
        super(x, y, w, h, angle, world, container)
        this.body.label = "avaCannon"
    }
}
