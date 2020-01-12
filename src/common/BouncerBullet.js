import { Body, Bodies, Constraint, World } from "matter-js"
import Target from './TargetingSystem'

class BouncerBullet {
    constructor(x, y, r, player, world, container) {
        this.options = {
            isStatic: true,
            restitution: 1,
        }
        this.body = Bodies.circle(x, y, r, this.options)
        this.radius = r
        this.className = "bouncer"
        let { x: targetX, y: targetY } = Target.homing(x, y, 500, player)

        let hook = Bodies.circle(targetX, targetY, 1, { isStatic: true, isSensor: true, label: "wall" })
        let constraint = Constraint.create({ bodyA: this.body, bodyB: hook, stiffness: 0.01 })
        constraint.length = constraint.length / 2

        World.add(world, [this.body, hook, constraint])

        let fire = setTimeout(() => {
            Body.setStatic(this.body, false)
        }, 100)

        let removeHookAndConstraint = setTimeout(() => {
            World.remove(world, [hook, constraint])
        }, 150)

        let fade = setTimeout(() => {
            this.remove()
        }, 5000)

        let timeouts = []
        timeouts.push(fire, removeHookAndConstraint, fade)

        this.remove = () => {
            timeouts.forEach((key) => clearTimeout(key))
            for (let i = container.length - 1; i >= 0; i--) {
                if (container[i].body.id === this.body.id) {
                    container.splice(i, 1)
                }
            }
            World.remove(world, this.body)
        }
    }
}

export default BouncerBullet
