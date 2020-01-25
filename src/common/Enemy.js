import { Bodies, World } from 'matter-js'

class Enemy {
    constructor(x, y, r, hp, world) {
        let options = {
            isStatic: true,
        }
        this.body = Bodies.circle(x, y, r, options)
        this.body.hp = hp
        this.body.label = "enemy"
        this.dead = false
        this.radius = r
        
        World.add(world, this.body)

        this.remove = () => {
            World.remove(world, this.body)
        }
    }
}

export default Enemy
