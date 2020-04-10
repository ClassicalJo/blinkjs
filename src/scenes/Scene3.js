import Scene from '../common/Scene';
import { Enemy } from '../common/Enemy'
import { World, Body, Composite, Constraint, Bodies } from 'matter-js'
import '../assets/css/scene2.css'
import Target from '../common/TargetingSystem';
import { nulBullet } from "../common/EnemyBullets"


class Scene3 extends Scene {
    constructor(props) {
        super(props)
        this.enemy = new Enemy(0, -500, 50, 225, this.world)
        this.enemy.name = "nul"
        this.enemy.spin = 0
        this.enemy.stream = true
        this.enemy.coreColor = "indigo"
        this.enemy.className = "appear"
        
        this.nul = Composite.create({ bodies: [this.enemy.body] })
        World.add(this.world, this.nul)
        this.enemies.push(this.enemy)
        this.spin()
        this.schedule.push(
            () => this.setSpin(0.03),
            () => this.intro(),
            () => this.setSpin(0.15),
            () => this.timeout(this.next, 500),
            () => this.nulBomb(this.next),
            () => this.stream.on(this.next),
            () => this.timeout(this.next, 500),
            () => this.moveBody(this.enemy.body, 0, 0, 2, this.next),
            () => this.timeout(this.next, 500),
            () => this.carousel(1, { x: -250, y: 0 }, 1, 2, this.next),
            () => this.nulBomb(this.next),
            () => this.carousel(1, { x: 250, y: 0 }, -1, 2, this.next),
            () => this.nulBomb(this.next),
            () => this.carousel(1, { x: -250, y: 0 }, 1, 2, this.next),
            () => this.nulBomb(this.next),
            () => this.carousel(1, { x: 250, y: 0 }, -1, 2, this.next),
            () => this.nulBomb(this.next),
            () => this.timeout(this.next, 1000),
            () => this.moveBody(this.enemy.body, 0, -350, 1, this.next),
            () => this.setSpin(0.3),
            () => this.timeout(this.next, 1500),
            () => this.bond.create(),
            () => this.timeout(this.next, 3000),
            () => this.bond.destroy(),
            () => this.setSpin(0.15),
            () => this.curveMovement({ x: 350, y: -350 }, 180, 2, this.next),
            () => this.timeout(this.next, 1000),
            () => this.goldenMovement(500, { x: -1, y: 1 }, 2, "horizontal", this.next),
            () => this.setSpin(0.3),
            () => this.timeout(this.next, 1500),
            () => this.bond.create(),
            () => this.timeout(this.next, 3000),
            () => this.bond.destroy(),
            () => this.setSpin(0.15),
            () => this.timeout(this.next, 500),
            () => this.curveMovement({ x: -350, y: -350 }, 180, 2, this.next),
            () => this.timeout(this.next, 1000),
            () => this.goldenMovement(600, { x: 1, y: 1 }, 2, "horizontal", this.next),
            () => this.setSpin(0.3),
            () => this.timeout(this.next, 1500),
            () => this.bond.create(),
            () => this.timeout(this.next, 3000),
            () => this.bond.destroy(),
            () => this.setSpin(0.15),
            () => this.timeout(this.next, 500),
            () => this.carousel(2, { x: 0, y: 0 }, -1, 1, this.next),
            () => this.stream.off(this.next),
            () => this.timeout(this.next, 500),
            () => this.curveMovement({ x: 0, y: -350 }, 180, 2, this.next),
            () => this.setSpin(-0.3),
            () => this.timeout(this.next, 500),
            () => this.chaos(),
            () => this.timeout(this.next, 3000),
            () => this.chaos(),
            () => this.timeout(this.next, 3000),
            () => this.chaos(),
            () => this.timeout(this.next, 3000),
            () => this.moveBody(this.enemy.body, 0, 0, 1, this.next),
            () => this.setSpin(0.33),
            () => this.timeout(this.next, 3000),
            () => this.setSpin(0),
            () => {
                this.enemy.remove()
                this.enemies.forEach(key => key.name === "nul" ? this.enemies.splice(key, 1) : null)
                this.theEnd()
            }
        )
        this.step = this.scheduleStart()
        this.schedule[this.step.next().value]()
    }

    intro = () => {
        this.enemy.className = "nul"
        this.moveBody(this.enemy.body, 0, -350, 1)

        if (this.props.showIntro) {
            this.setMessage("ENEMY #3: NUL", () => {
                window.addEventListener("touchstart", this.theStart)
                window.addEventListener("keydown", this.theStart)
            })
        }
        else {
            this.player.movement = true
            this.next()
        }
    }

    spin = () => {
        let interval = setInterval(() => {
            if (this.enemy.body.angularSpeed !== -this.enemy.spin) {
                Body.setAngularVelocity(this.enemy.body, -this.enemy.spin)
            }
        })
        this.intervals.push(interval)
    }

    setSpin = speed => {
        this.enemy.spin = speed
        this.next()
    }

    fire = {
        bullets: () => {
            for (let i = 0; i < 3; i++) {
                let bullet = this.timeout(() => new nulBullet(this.enemy.body.position.x, this.enemy.body.position.y, this.player.body.position.x, this.player.body.position.y, 5, 20, 0, this.world, this.bullets), 50 * i)
            }
        }
    }
    stream = {
        on: callback => {
            let fireStream = setInterval(() => {
                if (this.enemy.stream) {
                    this.fire.bullets()
                }
                else clearInterval(fireStream)
            }, 750)
            this.intervals.push(fireStream)
            if (callback) callback()
        },
        off: callback => {
            this.enemy.stream = false
            if (callback) callback()
        }
    }
    bond = {
        create: () => {
            this.hook = Bodies.circle(this.enemy.body.position.x, this.enemy.body.position.y, 0, { isStatic: true, isSensor: true })
            this.constraint = Constraint.create({ bodyA: this.hook, bodyB: this.player.body, stiffness: 0.004 })
            this.constraint.length = this.constraint.length / 20
            World.add(this.world, this.constraint)
            World.add(this.world, this.hook)
            this.next()
        },
        destroy: () => {
            World.remove(this.world, this.constraint)
            this.next()
        }
    }

    curveMovement = (target, angle, speed, callback) => {
        let origin = { ...this.enemy.body.position }
        let step = angle < 0 ? -Math.PI / 180 : Math.PI / 180
        let totalAngle = angle * Math.PI / 180
        let radius = Math.sqrt(Math.pow(target.x - origin.x, 2) + Math.pow(target.y - origin.y, 2)) / 2
        let theta = Target.getTheta(this.enemy.body.position.x, this.enemy.body.position.y, target.x, target.y)
        let hook = { x: origin.x + radius * Math.cos(theta), y: origin.y + radius * Math.sin(theta) }

        for (let i = 0; i < totalAngle / step; i++) {
            this.timeout(() => Composite.rotate(this.nul, step, { x: hook.x, y: hook.y }), i * (16 / speed))
        }
        if (callback) this.timeout(() => callback(), totalAngle / step * (16 / speed))
    }

    *iterator(r) {
        let iteration = r
        while (true) {
            iteration = iteration * 1.618 - iteration
            yield iteration
        }
    }

    getSquares = r => {
        let gen = this.iterator(r)
        return {
            first: r,
            second: gen.next().value,
            third: gen.next().value,
            fourth: gen.next().value,
            fifth: gen.next().value,
        }
    }
    getHook = {
        vertical: (origin, direction, squares, counter) => {
            if (counter < 90) return { x: origin.x, y: origin.y + direction.y * squares.first }
            else if (counter < 180) return { x: origin.x + direction.x * squares.third, y: origin.y + direction.y * squares.first }
            else if (counter < 270) return { x: origin.x + direction.x * squares.third, y: origin.y + direction.y * (squares.first + squares.fourth) }
            else if (counter < 360) return { x: origin.x + direction.x * squares.third, y: origin.y + direction.y * (squares.first + squares.fourth) }
            else return { x: origin.x + direction.x * squares.third, y: origin.y + direction.y * (squares.first + squares.fifth) }
        },
        horizontal: (origin, direction, squares, counter) => {
            if (counter < 90) return { x: origin.x + direction.x * squares.first, y: origin.y }
            else if (counter < 180) return { x: origin.x + direction.x * squares.first, y: origin.y + direction.y * squares.third }
            else if (counter < 270) return { x: origin.x + direction.x * (squares.first + squares.fourth), y: origin.y + direction.y * squares.third }
            else if (counter < 360) return { x: origin.x + direction.x * (squares.first + squares.fourth), y: origin.y + direction.y * squares.fourth }
            else return { x: origin.x + direction.x * (squares.first + squares.fifth), y: origin.y + direction.y * squares.fourth }
        }
    }
    goldenMovement = (radius, direction, speed, orientation, callback) => {
        let origin = { ...this.enemy.body.position }
        let step = Math.PI / 180
        orientation === "horizontal" ? step *= 1 : step *= -1
        if (orientation === "horizontal") direction.x !== direction.y ? step *= 1 : step *= -1
        if (orientation !== "horizontal") direction.x === direction.y ? step *= -1 : step *= 1
        let squares = this.getSquares(radius)
        for (let i = 0; i < 540; i++) {
            this.timeout(() => Composite.rotate(this.nul, step, this.getHook[orientation](origin, direction, squares, i)), i * (16 / speed))
        }

        if (callback) this.timeout(() => callback(), 540 * (16 / speed))
    }

    carousel = (spins, center, direction, speed, callback) => {
        let origin = { ...this.enemy.body.position }
        let step = direction * Math.PI / 180
        for (let i = 0; i < 360 * spins; i++) {
            this.timeout(() => Composite.rotate(this.nul, step, center), i * (16 / speed))
        }
        if (callback) this.timeout(() => callback(), 360 * spins * (16 / speed))
    }

    nulBomb = callback => {
        let cluster = []
        let bomb = new nulBullet(this.enemy.body.position.x, this.enemy.body.position.y, this.player.body.position.x, this.player.body.position.y, 10, 10, 0, this.world, this.bullets)
        this.timeout(() => {
            bomb.remove()
            for (let i = 0; i < 9; i++) {
                let bullet = new nulBullet(bomb.body.position.x, bomb.body.position.y, bomb.body.position.x + Math.cos(2 * Math.PI / 9 * i), bomb.body.position.y + Math.sin(2 * Math.PI / 9 * i), 5, 10, 0, this.world, this.bullets)
            }


        }, 2000)
        if (callback) callback()
    }

    chaos = () => {
        let positions = [{ x: -350, y: -350 }, { x: 350, y: -350 }, { x: -350, y: 350 }, { x: 350, y: 350 }]
        let origin = { ...this.enemy.body.position }
        for (let i = 0; i < 4; i++) {
            this.teleport = this.timeout(() => {
                let random = Math.floor(Math.random() * positions.length)
                Body.setPosition(this.enemy.body, positions[random])
                this.fire.bullets()
                positions.splice(random, 1)
            }, 250 * i)
        }
        this.timeout(() => {
            Body.setPosition(this.enemy.body, origin)
            this.nulBomb()
            this.next()
        }, 1000)
    }
}

export default Scene3
