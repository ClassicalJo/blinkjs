import Rectangle from "./Rectangle"
class Frame {
    constructor(world) {
        this.ground = new Rectangle(0, 500, 2000, 100, { isStatic: true }, world)
        this.ground.body.label = "wall"

        this.ceiling = new Rectangle(0, -500, 2000, 100, { isStatic: true }, world)
        this.ceiling.body.label = "wall"

        this.leftWall = new Rectangle(-1000, 0, 100, 900, { isStatic: true }, world)
        this.leftWall.body.label = "wall"

        this.rightWall = new Rectangle(1000, 0, 100, 900, { isStatic: true }, world)
        this.rightWall.body.label = "wall"

        this.walls = [this.ground, this.ceiling, this.leftWall, this.rightWall]
    }
}

export default Frame