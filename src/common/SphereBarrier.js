import { Bodies, World } from "matter-js"

class SphereBarrier {
    constructor(x, y, r, maxHp, world){
        this.body = Bodies.circle(x, y, r, { isStatic: true, isSensor: true})
        this.body.label = "barrier"
        this.body.maxHp = maxHp
        this.body.hp = maxHp
        this.radius = r
        this.danger = Math.ceil(this.body.maxHp / 4)
        this.className = "barrier"    
        World.add(world, this.body)

        this.remove = () => {
            World.remove(world, this.body)
        }
    }  
}
export default SphereBarrier
