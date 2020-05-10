import Scene from './Scene';
import { Enemy } from './Enemy'
import { World } from 'matter-js'

import '../assets/css/scene2.css'


class Scene3 extends Scene {
    constructor(props) {
        super(props)
        this.enemy = new Enemy(0, -350, 50, 225, this.world)
        this.enemy.name = "nul"
        this.enemy.coreColor = "indigo"

        World.add(this.world, this.enemy.body)
        this.enemies.push(this.enemy)

        this.schedule.push(
            () => this.intro(),
            () => this.timeout(this.next, 500),
            () => null,
        )
        this.step = this.scheduleStart()
        this.schedule[this.step.next().value]()
    }

    intro = () => {
        if (this.props.showIntro) {
            this.setMessage("ENEMY #3: NUL", () => {
                window.addEventListener("keydown", this.theStart)
            })
        }
        else {
            this.player.movement = true
            this.next()
        }
    }

}

export default Scene3
