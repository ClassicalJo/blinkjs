import { Body, Bodies, World } from "matter-js"
import Target from './TargetingSystem'

export class Projectile {
    constructor(world){
        let intervals = []
        this.isOffScreen = (x, y) => { return (x > 1250 || x < -1250 || y > 812.5 || y < -812.5) }
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
    }
    
}
export class Bullet extends Projectile {
    constructor(x, y, r, speed, delay, world, container) {
        super(world);
        let options = {
            isSensor: true,
            label: "bullet"
        }
        this.body = Bodies.circle(x, y, r, options)

        this.timeout(() => Body.setVelocity(this.body, { x: 0, y: speed }), delay)
        this.timeout(() => this.remove(), 5000)

        let checkIfIsOffScreen = setInterval(() => this.isOffScreen(this.body.position.x, this.body.position.y) ? this.remove() : null, 16)

        World.add(world, this.body)
        container.push(this)

        this.remove = () => {
            clearInterval(checkIfIsOffScreen)
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class BouncerBullet extends Projectile{
    constructor(x, y, targetX, targetY, r, speed, delay, world, container) {
        super(world);
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

        this.remove = () => {
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class AimedBullet extends Projectile{
    constructor(x, y, targetX, targetY, r, speed, delay, world, container) {
        super(world)
        this.body = Bodies.circle(x, y, r, { isSensor: true, label: "bullet" })

        let target = Target.getTargetVelocity(x, y, targetX, targetY, speed)
        World.add(world, this.body)
        container.push(this)

        this.timeout(() => Body.setVelocity(this.body, target), delay)
        this.timeout(() => this.remove(), 4000)

        this.isOffScreen = (x, y) => { return (x > 1250 || x < -1250 || y > 812.5 || y < -812.5) }
        let checkIfIsOffScreen = setInterval(() => this.isOffScreen(this.body.position.x, this.body.position.y) ? this.remove() : null, 16)

        this.remove = () => {
            clearInterval(checkIfIsOffScreen)
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class HomingBullet extends Projectile{
    constructor(x, y, playerPosition, r, bulletSpeed, delay, world, container) {
        super(world);
        let intervals = []

        this.body = Bodies.circle(x, y, r, { isSensor: true, label: "bullet" })
        this.redirect = false

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

        let checkIfIsOffScreen = setInterval(() => this.isOffScreen(this.body.position.x, this.body.position.y) ? this.remove() : null, 16)
        intervals.push(redirection, checkIfIsOffScreen)

        this.remove = () => {
            intervals.forEach(key => clearInterval(key))
            World.remove(world, this.body)
            for (let i = 0; i < container.length; i++) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
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
