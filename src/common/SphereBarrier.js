import { Bodies, World } from "matter-js"

class SphereBarrier {
    constructor(x, y, r, maxHp, world, container) {
        this.body = Bodies.circle(x, y, r, { isStatic: true, isSensor: true })
        this.body.label = "barrier"
        this.body.maxHp = maxHp
        this.body.hp = maxHp
        World.add(world, this.body)
        container.push(this)

        this.remove = () => {
            World.remove(world, this.body)
            for (let i = container.length - 1; i >= 0; i--) if (container[i].body.id === this.body.id) container.splice(i, 1)
            for (let property in this) delete this[property]
        }
    }
}
export default SphereBarrier
