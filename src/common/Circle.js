import { Bodies, World } from 'matter-js'

class Circle {
    constructor(x, y, r, options, world) {
        this.body = Bodies.circle(x, y, r, options)
        this.radius = r
        
        World.add(world, this.body)

        this.remove = () => {
            World.remove(world, this.body)
        }
    }
}

export default Circle