import { Bodies, World } from 'matter-js'

export class Enemy {
    constructor(x, y, r, hp, world, container) {
        this.body = Bodies.circle(x, y, r, { isSensor: true, label: "enemy" })
        this.body.hp = hp
        this.body.maxHp = hp
        this.coreColor = "lightpink"
        this.dead = false
        World.add(world, this.body)
        container.push(this)
        this.remove = () => {
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
        }
    }
}

export class Satellite {
    constructor(x, y, r, world, container) {
        let options = {
            isSensor: true,
        }
        this.coreColor = "lightpink"
        this.body = Bodies.circle(x, y, r, options)
        this.body.label = "wall"

        World.add(world, this.body)
        container.push(this)
        this.remove = () => {
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
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

