import { Bodies, World, Constraint, Body } from 'matter-js'

class HomingBullet {
    constructor(x, y, r, target, world, container) {
        let options = {
            isSensor: true,
            isStatic: true,
        }
        
        this.timeouts = []
        this.body = Bodies.circle(x, y, r, options)
        this.body.label = "homingBullet"
        this.radius = r


        let hook = Bodies.circle(target.x, target.y, 1, { isStatic: true, isSensor: true, label: "wall" })
        let constraint = Constraint.create({ bodyA: this.body, bodyB: hook, stiffness: 0.001 })
        constraint.length = constraint.length / 2

        World.add(world, [this.body, hook, constraint])
        
        let fire = setTimeout(() => {
            Body.setStatic(this.body, false)
        }, 500)

        let removeHookAndConstraint = setTimeout(() => {
            World.remove(world, hook)
            World.remove(world, constraint)
        }, 550)

        let bulletFade = setTimeout(() => {
            this.remove()
        }, 4000)

        this.isOffScreen = (x, y) => {
            return (x > 1250 || x < -1250 || y > 750 || y < -750)
        }

        this.checkIfIsOffScreen = setInterval(() => {
            if (this.isOffScreen(this.body.position.x, this.body.position.y)) {
                this.remove()
            }
        }, 16)

        this.remove = () => {
            this.timeouts.forEach((key)=> clearTimeout(key))
            clearInterval(this.checkIfIsOffScreen)
            World.remove(world, this.body)
            for(let i = 0; i < container.length; i++) {
                if (container[i].body.id === this.body.id) container.splice(i, 1)
            }
        }

        this.timeouts.push(fire, removeHookAndConstraint, bulletFade)
    }
}

export default HomingBullet