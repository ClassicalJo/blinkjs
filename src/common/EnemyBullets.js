import { Body, Bodies, Vertices, World, Composite } from "matter-js"
import Target from './TargetingSystem'
import decomp from 'poly-decomp';

window.decomp = decomp
let reference = Bodies.rectangle(0, 0, 100, 10, {})

export class Projectile {
    constructor(origin, r, world, container) {
        this.intervals = []
        this.options = {
            isSensor: true,
            label: "bullet",
        }

        this.body = Bodies.circle(origin.x, origin.y, r, this.options)
        this.timeout = (callback, delay) => {
            let timeStamp = world.timer
            let intervalName = setInterval(() => {
                if (Math.abs(timeStamp - world.timer) * 1000 >= delay) {
                    callback()
                    clearInterval(intervalName)
                }
            }, 10)
            this.intervals.push(intervalName)
        }
        this.add = () => {
            World.add(world, this.body)
            container.push(this)
        }
        this.remove = () => {
            World.remove(world, this.body)
            this.intervals.forEach(key => clearInterval(key))
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
            for (let property in this) delete this[property]
        }
        this.isOffScreen = (x, y) => (x > 1250 || x < -1250 || y > 812.5 || y < -812.5)
        this.checkOffscreen = () => {
            if (this.isOffScreen(this.body.position.x, this.body.position.y)) this.remove()
            else this.timeout(this.checkOffscreen, 200)
        }
    }
}

export class Bullet extends Projectile {
    constructor(origin, r, speed, delay, world, container) {
        super(origin, r, world, container);
        this.timeout(() => Body.setVelocity(this.body, { x: 0, y: speed }), delay)
        this.timeout(() => this.remove(), 2500)
        this.add()
        this.checkOffscreen()
    }
}

export class Pointer extends Projectile {
    constructor(origin, r, world, container) {
        super(origin, r, world, container);
        this.body.label = "pointer"
        this.add()
    }
}

export class BouncerBullet extends Projectile {
    constructor(origin, target, r, speed, delay, world, container) {
        super(origin, r, world, container);
        this.body.label = "bouncer"
        this.body.restitution = 1
        this.body.isSensor = false
        let velocity = Target.getTargetVelocity(origin.x, origin.y, target.x, target.y, speed)
        this.timeout(() => Body.setVelocity(this.body, velocity), delay)
        this.timeout(() => this.remove(), 5000)
        this.add()
    }
}

export class AimedBullet extends Projectile {
    constructor(origin, target, r, speed, delay, world, container) {
        super(origin, r, world, container);
        let velocity = Target.getTargetVelocity(origin.x, origin.y, target.x, target.y, speed)
        this.timeout(() => Body.setVelocity(this.body, velocity), delay)
        this.timeout(() => this.remove(), 4000)
        this.add()
    }
}

export class HomingBullet extends Projectile {
    constructor(origin, playerPosition, r, bulletSpeed, delay, world, container) {
        super(origin, r, world, container);
        this.redirect = false
        this.redirection = () => {
            if (this.redirect) {
                let newTarget = Target.getTargetVelocity(this.body.position.x, this.body.position.y, playerPosition.x, playerPosition.y, bulletSpeed)
                Body.setVelocity(this.body, newTarget)
            }
            this.timeout(this.redirection, 16)
        }
        this.timeout(() => this.redirect = true, delay)
        this.timeout(() => this.redirect = false, delay + 750)
        this.timeout(() => this.remove(), 4000)
        this.add()
        this.redirection()
    }
}

export class sakuraHoming extends HomingBullet {
    constructor(origin, playerPosition, r, bulletSpeed, delay, world, container) {
        super(origin, playerPosition, r, bulletSpeed, delay, world, container)
        this.body.label = "sakuraHoming"
    }
}

export class Laser {
    constructor(origin, w, h, angle, world, container) {
        this.body = Bodies.rectangle(origin.x + w / 2, origin.y, w, h, { isSensor: true, label: "laser" })
        this.height = h
        this.width = w
        Body.rotate(this.body, angle, { x: origin.x, y: origin.y })
        World.add(world, this.body)
        container.push(this)
        this.rotate = angle => Body.rotate(this.body, angle, { x: origin.x, y: origin.y })
        this.remove = () => {
            World.remove(world, this.body)
            for (let i = 0; i < container.length; i++) if (container[i].body.id === this.body.id) container.splice(i, 1)
            for (let property in this) delete this[property]
        }
    }
}


export class AimLaser {
    constructor(origin, w, h, angle, world, container) {
        this.body = Bodies.rectangle(origin.x + w / 2, origin.y, w, h, { isSensor: true, label: "aimLaser" })
        this.height = h
        this.width = w
        Body.rotate(this.body, angle, { x: origin.x, y: origin.y })
        container.push(this)
        this.remove = () => {
            World.remove(world, this.body)
            for (let i = 0; i < container.length; i++) if (container[i].body.id === this.body.id) container.splice(i, 1)
            for (let property in this) delete this[property]
        }
    }
}

export class nulBullet extends AimedBullet {
    constructor(origin, target, r, speed, delay, world, container) {
        super(origin, target, r, speed, delay, world, container)
        this.body.label = "nul"
    }
}

export class nulPointer extends Pointer {
    constructor(origin, r, world, container) {
        super(origin, r, world, container);
        this.body.label = "nulPointer"
    }
}

export class vidaBullet extends Projectile {
    constructor(origin, target, r, speed, delay, world, container) {
        super(origin, r, world, container);
        this.body.label = "vida"
        let velocity = Target.getTargetVelocity(origin.x, origin.y, target.x, target.y, speed)
        this.timeout(() => Body.setVelocity(this.body, velocity), delay)
        this.timeout(() => this.explode(), 2000)
        this.timeout(() => this.remove(), 5000)
        this.explode = () => {
            Body.setVelocity(this.body, { x: 0, y: 0 })
            document.querySelector(`#nuke${this.body.id}`).beginElement()
            document.querySelector(`#fill${this.body.id}`).beginElement()
            for (let i = 0; i < 10; i++) {
                this.timeout(() => Body.scale(this.body, 1.3, 1.3), i * 15)
            }
        }
        this.add()
    }
}

export class vidaLaser extends Projectile {
    constructor(origin, r, target, speed, delay, world, container) {
        super(origin, r, world, container);
        this.body = Bodies.rectangle(origin.x, origin.y, r, r / 10, { isSensor: true, label: "lifeLaser", frictionAir: 0 })
        this.height = r/10
        this.width = r
        let theta = Target.getTheta(origin.x, origin.y, target.x, target.y)
        let velocity = Target.getTargetVelocity(origin.x, origin.y, target.x, target.y, speed)
        Body.rotate(this.body, theta * 180 / Math.PI, { x: this.body.position.x, y: this.body.position.y })
        this.timeout(() => Body.setVelocity(this.body, velocity), delay)
        this.timeout(() => this.remove(), 4000)
        this.add()
    }
}

export class vidaWave extends Projectile {
    constructor(origin, r, target, speed, delay, world, container) {
        super(origin, r, world, container);
        let bot = [{ x: 0, y: -r }, { x: r/4, y: r }, { x: r / 8, y: r }]
        let top = [{ x: 0, y: r }, { x: r/4, y: -r }, { x: r / 8, y: -r }]
        let center = Vertices.centre(Vertices.create(bot, reference))
        let topWing = Bodies.fromVertices(origin.x + 100, origin.y + center.y * 2, Vertices.create(top, reference), { isSensor: true, frictionAir: 0 })
        let botWing = Bodies.fromVertices(origin.x + 100, origin.y - center.y * 2, Vertices.create(bot, reference), { isSensor: true, frictionAir: 0 })
        let objective = { ...target }
        this.width = r/4
        this.height =r
        this.body = Composite.create({ label: "lifeWave" })
        Composite.add(this.body, topWing)
        Composite.add(this.body, botWing)
        Composite.rotate(this.body, Target.getTheta(origin.x, origin.y, target.x, target.y), { x: origin.x, y: origin.y })
        this.body.bodies.forEach(key => this.timeout(() => Body.setVelocity(key, Target.getTargetVelocity(origin.x, origin.y, objective.x, objective.y, speed)), delay))
        this.timeout(() => this.remove(), 3000)
        this.add()
    }
}

export class delayedHoming extends Projectile {
    constructor(origin, target, r, homing, delayHoming, speed, world, container) {
        super(origin, r, world, container);
        this.body.label = "delayedHoming"
        this.maxVelocityChange = 1
        this.speedChange = newVelocity => {
            let oldVelocity = { ...this.body.velocity }
            let fixedVelocity = { ...newVelocity }
            for (let speed in newVelocity) {
                if (Math.abs(oldVelocity[speed] - newVelocity[speed]) > this.maxVelocityChange) {
                    newVelocity[speed] > -1 ? fixedVelocity[speed] = oldVelocity[speed] + this.maxVelocityChange : fixedVelocity[speed] = oldVelocity[speed] - this.maxVelocityChange
                }
            }
            return fixedVelocity
        }

        Body.setVelocity(this.body, Target.getTargetVelocity(this.body.position.x, this.body.position.y, target.x, target.y, speed))
        this.redirect = () => {
            Body.setVelocity(this.body, this.speedChange(Target.getTargetVelocity(this.body.position.x, this.body.position.y, homing.x, homing.y, speed)))
            this.timeout(this.redirect, 16)
        }
        this.timeout(() => this.remove(), 5000)
        this.timeout(this.redirect, delayHoming)
        this.add()
    }
}

export class avaBullet extends AimedBullet {
    constructor(origin, target, r, speed, delay, world, container, color) {
        super(origin, target, r, speed, delay, world, container)
        this.color = color
        this.body.label = "ava"

    }
}

export class avaHoming extends delayedHoming {
    constructor(origin, target, r, homing, delayHoming, speed, world, container, color) {
        super(origin, target, r, homing, delayHoming, speed, world, container)
        this.body.label = "avaHoming"
        this.color = color
    }
}

export class avaPointer extends Pointer {
    constructor(origin, r, world, container) {
        super(origin, r, world, container)
        this.body.label = "avaPointer"
    }
}

export class avaRailgun extends Projectile {
    constructor(origin, target, r, speed, delay, world, container) {
        super(origin, r, world, container)
        this.body.label = "avaRailgun"
        this.timeout(() => Body.setVelocity(this.body, Target.getTargetVelocity(this.body.position.x, this.body.position.y, target.x, target.y, speed)), delay)
        this.timeout(() => this.remove(), 3000)
        this.add()
    }
}

export class avaAim extends AimLaser {
    constructor(origin, w, h, angle, world, container) {
        super(origin, w, h, angle, world, container)
        this.body.label = "avaAim"
    }
}

export class avaCannon extends Laser {
    constructor(origin, w, h, angle, world, container) {
        super(origin, w, h, angle, world, container)
        this.body.label = "avaCannon"
    }
}
