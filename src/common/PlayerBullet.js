import { Bodies, World, Body } from 'matter-js'

class PlayerBullet {
    constructor(x, y, r, world, playerBullets) {
        let options = {
            isSensor: true,
        }
        this.body = Bodies.circle(x, y, r, options)
        this.body.label = "playerBullet"
        this.radius = r

        Body.setVelocity(this.body, { x: 0, y: -15 })
        World.add(world, this.body)

        this.checkIfIsOffScreen = setInterval(() => {
            if (this.isOffScreen(this.body.position.x, this.body.position.y)) {
                this.remove()
            }
        }, 16)

        this.isOffScreen = (x, y) => {
            return (x > 1000 || x < -1000 || y > 500 || y < -500)
        }

        this.remove = () => {
            clearInterval(this.checkIfIsOffScreen)
            World.remove(world, this.body)
            for (let i = playerBullets.length - 1; i >= 0; i--) {
                if (playerBullets[i].body.id === this.body.id) playerBullets.splice(i, 1)
            }
        }
    }
}

export default PlayerBullet