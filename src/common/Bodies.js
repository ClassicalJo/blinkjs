import { Bodies, World } from 'matter-js'

export class Circle {
    constructor(x, y, r, options, world) {
        this.body = Bodies.circle(x, y, r, options)
        this.radius = r
        
        World.add(world, this.body)

        this.remove = () => {
            World.remove(world, this.body)
        }
    }
}

export class Rectangle {
    constructor(x, y, w, h, options, world) {
        this.body = Bodies.rectangle(x, y, w, h, options)
        this.width = w
        this.height = h

        World.add(world, this.body)

        this.remove = () => {
            World.remove(world, this.body)
        }
    }
}
