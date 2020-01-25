import Scene from '../common/Scene'
import Enemy from '../common/Enemy'
import SphereBarrier from '../common/SphereBarrier'

class Scene2 extends Scene {
    constructor(){
        super()
        this.enemy = new Enemy(0, -350, 50, 10, this.world)
        this.enemies.push(this.enemy)

        this.outerBarrier = new SphereBarrier(0, -350, 70, 250, this.world)
        this.barriers.push(this.outerBarrier)

    }
}

export default Scene2


