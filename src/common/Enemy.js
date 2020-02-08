import { Body, Bodies, World } from 'matter-js'
import Target from "../common/TargetingSystem"

export class Enemy {
    constructor(x, y, r, hp, world) {
        let options = {
            isSensor: true,
        }
        this.coreColor = "lightpink"
        this.body = Bodies.circle(x, y, r, options)
        this.body.hp = hp
        this.body.maxHp = hp
        
        this.body.label = "enemy"
        this.dead = false

        World.add(world, this.body)

        

        this.remove = () => {
            if (this.wait) clearTimeout(this.wait)
            World.remove(world, this.body)
        }
    }
}

export class Satellite {
    constructor(x, y, r, world) {
        let options = {
            isSensor: true,
        }
        this.coreColor = "lightpink"
        this.body = Bodies.circle(x, y, r, options)
        this.body.label = "wall"
        
        World.add(world, this.body)

        this.remove = () => {
            if (this.wait) clearTimeout(this.wait)
            World.remove(world, this.body)
        }
    }
}
