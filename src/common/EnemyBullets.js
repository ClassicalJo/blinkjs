import { Body, Bodies, World } from "matter-js"
import Target from './TargetingSystem'

export class Bullet {
    constructor(x, y, r, speed, delay, world, container) {
        let options = {
            isSensor: true,
            label: "bullet"
        }
        this.body = Bodies.circle(x, y, r, options)
        this.radius = r

        let fire = setTimeout(() => Body.setVelocity(this.body, { x: 0, y: speed }), delay)
        let fade = setTimeout(() => this.remove(), 5000)

        this.isOffScreen = (x, y) => { return (x > 1250 || x < -1250 || y > 812.5 || y < -812.5) }
        let checkIfIsOffScreen = setInterval(() => this.isOffScreen(this.body.position.x, this.body.position.y) ? this.remove() : null, 16)

        World.add(world, this.body)
        container.push(this)

        this.remove = () => {
            clearInterval(checkIfIsOffScreen)
            clearTimeout(fire)
            clearTimeout(fade)
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class BouncerBullet {
    constructor(x, y, targetX, targetY, r, speed, delay, world, container) {
        this.options = {
            restitution: 1,
            label: "bouncer",
        }
        this.body = Bodies.circle(x, y, r, this.options)
        this.radius = r
        let target = Target.getTargetVelocity(x, y, targetX, targetY, speed)

        World.add(world, this.body)
        container.push(this)

        let fire = setTimeout(() => Body.setVelocity(this.body, target), delay)
        let fade = setTimeout(() => this.remove(), 5000)

        this.remove = () => {
            clearTimeout(fire)
            clearTimeout(fade)
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class AimedBullet {
    constructor(x, y, targetX, targetY, r, speed, delay, world, container) {
        this.body = Bodies.circle(x, y, r, { isSensor: true, label: "bullet" })
        this.radius = r

        let target = Target.getTargetVelocity(x, y, targetX, targetY, speed)
        World.add(world, this.body)
        container.push(this)

        let fire = setTimeout(() => Body.setVelocity(this.body, target), delay)
        let fade = setTimeout(() => this.remove(), 4000)

        this.isOffScreen = (x, y) => { return (x > 1250 || x < -1250 || y > 812.5 || y < -812.5) }
        let checkIfIsOffScreen = setInterval(() => this.isOffScreen(this.body.position.x, this.body.position.y) ? this.remove() : null, 16)

        this.remove = () => {
            clearTimeout(fire)
            clearTimeout(fade)
            clearInterval(checkIfIsOffScreen)
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class HomingBullet {
    constructor(x, y, playerPosition, r, bulletSpeed, delay, world, container) {
        this.timeouts = []
        this.intervals = []

        this.body = Bodies.circle(x, y, r, { isSensor: true, label: "bullet" })
        this.radius = r
        this.redirect = false

        World.add(world, this.body)
        container.push(this)

        let redirection = setInterval(() => {
            if (this.redirect) {
                let newTarget = Target.getTargetVelocity(this.body.position.x, this.body.position.y, playerPosition.x, playerPosition.y, bulletSpeed)
                Body.setVelocity(this.body, newTarget)
            }
        }, 16)

        let fire = setTimeout(() => this.redirect = true, delay)
        let redirectOff = setTimeout(() => this.redirect = false, delay + 750)
        let fade = setTimeout(() => this.remove(), 4000)

        this.isOffScreen = (x, y) => { return (x > 1250 || x < -1250 || y > 812.5 || y < -812.5) }
        let checkIfIsOffScreen = setInterval(() => this.isOffScreen(this.body.position.x, this.body.position.y) ? this.remove() : null, 16)

        this.timeouts.push(fire, redirectOff, fade)
        this.intervals.push(redirection, checkIfIsOffScreen)

        this.remove = () => {
            this.timeouts.forEach(key => clearTimeout(key))
            this.intervals.forEach(key => clearInterval(key))
            World.remove(world, this.body)
            for (let i = 0; i < container.length; i++) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}
