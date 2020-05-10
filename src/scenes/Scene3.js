import Scene, { mapStateToProps, mapDispatchToProps } from "../common/Scene"
import { Enemy } from '../common/Enemy'
import { World, Body, Composite, Constraint, Bodies } from 'matter-js'
import Target from '../common/TargetingSystem';
import { nulBullet, nulPointer } from "../common/EnemyBullets"
import { connect } from 'react-redux'
import { withCookies } from "react-cookie"

class Scene3 extends Scene {
    constructor(props) {
        super(props)
        this.enemy = new Enemy(51, -500, 50, 225, this.world, this.enemies)
        this.enemy.name = "nul"
        this.enemy.spin = 0
        this.enemy.stream = true
        this.enemy.coreColor = "indigo"
        
        this.nul = Composite.create({ bodies: [this.enemy.body] })
        World.add(this.world, this.nul)

        this.spin()
        this.schedule.push(
            () => this.setBackgroundMusic("nul"),
            () => this.setSpin(0.03),
            () => this.goldenMovement(150, { x: -1, y: 1 }, 4, "vertical", this.next),
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
            () => this.curveMovement({ x: 0, y: 0 }, 180, 2, this.next),
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
                this.theEnd({...this.enemy.body.position})
                this.enemy.remove()
            }
        )
        this.step = this.scheduleStart()
        this.checkPreload(() => this.schedule[this.step.next().value]())
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

    spin = () => {
        Body.setAngularVelocity(this.enemy.body, -this.enemy.spin)
        this.timeout(() => this.spin(), 100)
    }

    setSpin = speed => {
        this.enemy.spin = speed
        this.next()
    }

    fire = {
        bullets: () => {
            for (let i = 0; i < 3; i++) {
                this.timeout(() => {
                    this.props.sfx.nul.bullet.play()
                    new nulBullet(this.enemy.body.position, this.player.body.position, 5, 20, 0, this.world, this.bullets)
                }, 50 * i)
            }
            if (this.enemy.stream) this.timeout(() => this.fire.bullets(), 750)
        }
    }
    stream = {
        on: callback => {
            this.enemy.stream = true
            this.fire.bullets()
            if (callback) callback()
        },
        off: callback => {
            this.enemy.stream = false
            if (callback) callback()
        }
    }
    bond = {
        create: () => {
            this.props.sfx.nul.void.play()
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
        if (this.player.movement) this.props.sfx.nul.movement.play()
        for (let i = 0; i < 540; i++) {
            this.timeout(() => Composite.rotate(this.nul, step, this.getHook[orientation](origin, direction, squares, i)), i * (16 / speed))
        }

        if (callback) this.timeout(() => callback(), 540 * (16 / speed))
    }

    carousel = (spins, center, direction, speed, callback) => {
        let step = direction * Math.PI / 180
        for (let i = 0; i < 360 * spins; i++) {
            this.timeout(() => Composite.rotate(this.nul, step, center), i * (16 / speed))
        }
        if (callback) this.timeout(() => callback(), 360 * spins * (16 / speed))
    }

    nulBomb = callback => {
        let bomb = new nulBullet(this.enemy.body.position, this.player.body.position, 10, 10, 0, this.world, this.bullets)
        this.props.sfx.nul.bullet.play()
        this.timeout(() => {
            this.props.sfx.nul.bomb.play()
            let shrapnelCount = 9
            for (let i = 0; i < shrapnelCount; i++) {
                let target = {
                    x: bomb.body.position.x + Math.cos(2 * Math.PI / shrapnelCount * i),
                    y: bomb.body.position.y + Math.sin(2 * Math.PI / shrapnelCount * i),
                }
                new nulBullet(bomb.body.position, target, 5, 10, 0, this.world, this.bullets)
            }
            bomb.remove()
        }, 2000)
        if (callback) callback()
    }

    chaos = () => {
        let positions = [{ x: -350, y: -350 }, { x: 350, y: -350 }, { x: -350, y: 350 }, { x: 350, y: 350 }]
        let teleport = () => {
            counter++
            if (counter === 4) {
                for (let i = 0; i < 4; i++) {
                    this.teleport = this.timeout(() => {
                        let random = Math.floor(Math.random() * positions.length)
                        Body.setPosition(this.enemy.body, positions[random].targetPosition)
                        positions[random].remove()
                        this.props.sfx.nul.flash.play()
                        this.fire.bullets()
                        positions.splice(random, 1)
                    }, 250 * i)
                }
                this.timeout(() => {
                    Body.setPosition(this.enemy.body, origin)
                    this.props.sfx.nul.flash.stop()
                    this.props.sfx.nul.flash.play()
                    this.nulBomb()
                    this.next()
                }, 1000)
            }
        }
        positions.forEach((key, index) => {
            let pointer = new nulPointer(this.enemy.body.position, 50, this.world, this.bullets)
            pointer.targetPosition = key
            this.moveBody(pointer.body, pointer.targetPosition.x, pointer.targetPosition.y, 4, teleport)
            positions[index] = pointer
        })
        let origin = { ...this.enemy.body.position }
        let counter = 0
    }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Scene3))
