import { Body, Bodies, Constraint, World } from 'matter-js'
import Target from './TargetingSystem'

class TargetedBullet {
    constructor(x, fixedTargetX, y, fixedTargetY, r, world, container) {
        this.body = Bodies.circle(x, y, r, { isSensor: true, isStatic: true })
        this.radius = r

        let { x: targetX, y: targetY } = Target.coordinates(x, y, fixedTargetX, fixedTargetY, 250)

        let hook = Bodies.circle(targetX, targetY, 1, { isStatic: true, isSensor: true, label: "wall" })
        let constraint = Constraint.create({ bodyA: this.body, bodyB: hook, stiffness: 0.005 })
        constraint.length = constraint.length / 2

        World.add(world, [this.body, hook, constraint])

        let fire = setTimeout(() => {
            Body.setStatic(this.body, false)
        }, 1000)

        let removeHookAndConstraint = setTimeout(() => {
            World.remove(world, [hook, constraint])
        }, 1150)

        let fade = setTimeout(() => {
            this.remove()
        }, 4000)

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

export default TargetedBullet
