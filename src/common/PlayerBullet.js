import { World, Body, Bodies } from 'matter-js'

class PlayerBullet {
    constructor(origin, world, container) {
        this.options = {
            position: { x: origin.x, y: origin.y - 50 },
            label: "playerBullet",
            isSensor: true,
        }
        this.body = Bodies.circle(origin.x, origin.y, 5, this.options)
        Body.setVelocity(this.body, { x: 0, y: -15 })
        World.add(world, this.body)
        container.push(this)
        this.checkIfIsOffScreen = setInterval(() => {
            if (this.isOffScreen(this.body.position.x, this.body.position.y)) this.remove()
        }, 100)
        this.isOffScreen = (x, y) => (x > 1000 || x < -1000 || y > 500 || y < -500)
        this.remove = () => {
            clearInterval(this.checkIfIsOffScreen)
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) {
                if (container[i].body.id === this.body.id) container.splice(i, 1)
            }
            for (let property in this) delete this[property]
        }
    }
}
export default PlayerBullet
