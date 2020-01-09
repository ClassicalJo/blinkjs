import { Bodies, World, Body } from 'matter-js'

class Bullet {
    constructor(x, y, r, world, bullets) {
        let options = {
            isSensor: true,
        }
        this.body = Bodies.circle(x, y, r, options)
        this.body.label = "bullet"
        this.radius = r

        this.velocityTimeout = setTimeout(() => Body.setVelocity(this.body, { x: 0, y: 15 }), 1000)
        World.add(world, this.body)

        this.checkIfIsOffScreen = setInterval(() => {
            if (this.isOffScreen(this.body.position.x, this.body.position.y)) {
                this.remove()
            }
        }, 16)

        this.isOffScreen = (x, y) => {
            return (x > 1250 || x < -1250 || y > 750 || y < -750)
        }

        this.remove = () => {
            clearInterval(this.checkIfIsOffScreen)
            World.remove(world, this.body)
            for (let i = bullets.length - 1; i >= 0; i--) {
                if (bullets[i].body.id === this.body.id) bullets.splice(i, 1)
            }
        }
    }


}

export default Bullet