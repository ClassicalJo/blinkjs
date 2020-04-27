import { Bodies, World } from 'matter-js'

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

export class Clone {
    constructor(x, y, r, parent, world) {
        let options = {
            isSensor: true,
        }
        this.coreColor = parent.coreColor
        this.body = Bodies.circle(x, y, r, options)
        this.body.genome = parent
        this.body.label = "clone"
        this.body.hp = parent.body.hp
        this.body.maxHp = parent.body.maxHp

        World.add(world, this.body)

        this.remove = () => {
            World.remove(world, this.body)
        }
    }
}

