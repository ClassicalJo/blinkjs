import { Bodies, World } from 'matter-js'

class Enemy {
    constructor(x, y, r, world) {
        let options = {
            isSensor: true,
            isStatic: true,
        }
        this.body = Bodies.circle(x, y, r, options)
        this.body.hp = 10
        this.body.label = "enemy"
        this.radius = r
        
        //oscilacion
        
        World.add(world, this.body)

        this.remove = () => {
            World.remove(world, this.body)
        }
    }
}

export default Enemy