import Scene from '../common/Scene';
import { Enemy, Clone } from '../common/Enemy'
import { Body, Composite } from 'matter-js'
import Target from "../common/TargetingSystem"
import { vidaBullet, vidaLaser, vidaWave } from "../common/EnemyBullets"


class Scene4 extends Scene {
    constructor(props) {
        super(props)
        this.enemy = new Enemy(0, -350, 10, 250, this.world)
        this.enemy.name = "vida"
        this.enemy.coreColor = "#76C34E"
        this.enemy.className = "vida"
        this.enemy.spin = 0
        this.clones = []

        this.enemies.push(this.enemy)
        this.spots = [{ x: 0, y: -350 }, { x: 850, y: 0 }, { x: 0, y: 350 }, { x: -850, y: 0 }]
        this.spin()
        this.schedule.push(

            () => this.setRadius(this.enemy.body, 50, 10, this.next),
            () => this.intro(),
            () => this.timeout(this.next, 1000),
            () => this.fire.laser(5, this.enemy.body.position, this.player.body.position, 30, this.next),
            () => this.timeout(this.next, 1000),
            () => this.fire.laser(5, this.enemy.body.position, this.player.body.position, 30, this.next),
            () => this.timeout(this.next, 1000),
            () => this.fire.nuke(this.enemy.body.position, this.player.body.position, this.timeout(this.next, 250)),
            () => this.fire.nuke(this.enemy.body.position, this.player.body.position, this.timeout(this.next, 250)),
            () => this.fire.nuke(this.enemy.body.position, this.player.body.position, this.next),
            () => this.timeout(this.next, 2000),
            () => this.fire.wave(100, 200, this.enemy.body.position, this.player.body.position, 30, 1500, this.next),
            () => this.timeout(this.next, 4000),
            () => this.setRadius(this.enemy.body, 37.5, 1, this.next),
            () => this.firstMovement(),
            () => this.timeout(this.next, 1000),
            () => this.barrage(this.enemy, this.clones[0]),
            () => this.timeout(this.next, 5000),
            () => {
                this.setRadius(this.enemy.body, 25, 1, this.next)
                this.setRadius(this.clones[0].body, 25, 1)
            },
            () => this.secondMovement(),
            () => this.timeout(this.next, 1000),
            () => this.barrage(this.enemy, this.clones[0], this.clones[1], this.clones[2]),
            () => this.timeout(this.next, 6000),
            () => this.curveMovement(this.clones[0].body, this.spots[0], -180, 4, this.next),
            () => this.curveMovement(this.clones[1].body, this.spots[3], -180, 4, this.next),
            () => this.curveMovement(this.clones[2].body, this.spots[1], -180, 4, this.next),
            () => this.curveMovement(this.enemy.body, this.spots[2], -180, 4, this.next),
            () => this.timeout(this.next, 1000),
            () => this.thirdMovement(1),
            () => this.timeout(this.next, 1000),
            () => this.thirdMovement(2),
            () => this.timeout(this.next, 1000),
            () => this.thirdMovement(3),
            () => this.timeout(this.next, 2000),
            () => this.fourthMovement(),
            () => {
                this.setRadius(this.enemy.body, 37.5, 1, this.next)
                this.setRadius(this.clones[0].body, 37.5, 1)
            },
            () => this.timeout(this.next, 1000),
            () => this.barrage(this.enemy, this.clones[0]),
            () => this.timeout(this.next, 5000),
            () => this.fifthMovement(),
            () => this.setRadius(this.enemy.body, 50, 1, this.next),
            () => this.timeout(this.next, 1000),
            () => this.moveBody(this.enemy.body, 0, 0, 4, this.next),
            () => this.setSpin(0.07),
            () => this.timeout(this.next, 1000),
            () => this.setSpin(0.14),
            () => this.timeout(this.next, 1000),
            () => this.setSpin(0.21),
            () => this.timeout(this.next, 1000),
            () => this.setSpin(0.28),
            () => this.timeout(this.next, 1000),
            () => this.setSpin(0.35),
            () => this.timeout(this.next, 3000),
            () => this.setSpin(0),
            () => {
                this.enemy.remove()
                this.enemies.forEach(key => key.name === "vida" ? this.enemies.splice(key, 1) : null)
                this.theEnd()
            },

        )
        this.step = this.scheduleStart()
        this.schedule[this.step.next().value]()
    }

    setRadius = (body, value, speed, callback) => {
        let ratio = value < body.circleRadius ? 0.975 : 1.025
        Body.scale(body, ratio, ratio)
        if (Math.abs(value - body.circleRadius) > 1) this.timeout(() => this.setRadius(body, value, speed, callback), (45 / speed))
        else if (callback) callback()
    }

    intro = () => {
        if (this.props.showIntro) {
            this.setMessage("ENEMY #4: VIDA", () => {
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

    clone = {
        create: (x, y, callback) => {
            let clone = new Clone(x + 0.01, y + 0.01, this.enemy.body.circleRadius, this.enemy, this.world)
            clone.name = "vida"
            clone.coreColor = "#76C34E"
            clone.className = "vida"
            this.clones.push(clone)
            this.enemies.push(clone)
            if (callback) callback()
        },
        destroy: (target, callback) => {
            for (let i in this.clones) if (target.body.id === this.clones[i].body.id) this.clones.splice(i, 1)
            for (let i in this.enemies) if (target.body.id === this.enemies[i].body.id) this.enemies.splice(i, 1)
            target.remove()
            if (callback) callback()
        },
    }

    firstMovement = () => {
        this.clone.create(this.enemy.body.position.x, this.enemy.body.position.y)
        this.moveBody(this.enemy.body, -500, -300, 4, this.next)
        this.moveBody(this.clones[0].body, 500, -300, 4)
    }

    secondMovement = () => {
        this.clone.create(this.enemy.body.position.x, this.enemy.body.position.y)
        this.clone.create(this.clones[0].body.position.x, this.clones[0].body.position.y)
        this.moveBody(this.enemy.body, -650, -275, 4)
        this.moveBody(this.clones[0].body, 650, -275, 4)
        this.moveBody(this.clones[1].body, -350, -350, 4)
        this.moveBody(this.clones[2].body, 350, -350, 4, this.next)
    }

    thirdMovement = (value) => {
        let base = (index, amount) => {
            let result = index
            for (let i = 0; i < amount; i++) {
                result = result - 1
                if (result < 0) result = 3
            }
            return result
        }
        [this.enemy, this.clones].flat().forEach(key => this.fire.laser(1, key.body.position, this.player.body.position, 30))
        this.timeout(() => [this.enemy, this.clones].flat().forEach(key => this.fire.laser(1, key.body.position, this.player.body.position, 30)), 1000)
        this.timeout(() => [this.enemy, this.clones].flat().forEach(key => this.fire.laser(1, key.body.position, this.player.body.position, 30)), 2000)

        this.curveMovement(this.clones[0].body, this.spots[base(0, value)], -180, 1)
        this.curveMovement(this.clones[1].body, this.spots[base(3, value)], -180, 1)
        this.curveMovement(this.clones[2].body, this.spots[base(1, value)], -180, 1, this.next)
        this.curveMovement(this.enemy.body, this.spots[base(2, value)], -180, 1)
    }

    fourthMovement = () => {
        this.moveBody(this.clones[1].body, -850, 0, 8, this.next)
        this.moveBody(this.clones[2].body, 850, 0, 8, () => [this.clones[1], this.clones[2]].forEach(key => this.clone.destroy(key)))
    }

    fifthMovement = () => {
        this.multiFire.laser([this.enemy, this.clones].flat())
        this.timeout(() => this.multiFire.laser([this.enemy, this.clones].flat()), 1000)
        this.timeout(() => this.multiFire.laser([this.enemy, this.clones].flat()), 2000)
        this.moveBody(this.enemy.body, 0, -350, 4, this.next)
        this.moveBody(this.clones[0].body, 0, -350, 4, () => [this.clone.destroy(this.clones[0])])
    }


    barrage = (...origins) => {
        this.multiFire.laser(origins)
        this.timeout(() => this.multiFire.laser(origins), 1000 + ((6 - origins.length) * 200))
        this.timeout(() => this.multiFire.laser(origins), 2000 + 2 * ((6 - origins.length) * 200))

        this.timeout(() => {
            origins.forEach(key => this.fire.nuke(key.body.position, this.player.body.position))
            this.timeout(() => origins.forEach(key => this.fire.nuke(key.body.position, this.player.body.position)), 2000)
        }, 3000 + 3 * ((6 - origins.length) * 200))

        this.timeout(() => this.multiFire.wave(origins), 3500 + 3 * ((6 - origins.length) * 200))
        this.timeout(() => this.multiFire.wave(origins), 5500 + 3 * ((6 - origins.length) * 200))
        this.timeout(this.next, 5500 + 3 * ((6 - origins.length) * 200))

    }

    curveMovement = (body, target, angle, speed, callback) => {
        let origin = { ...body.position }
        let step = angle > 0 ? Math.PI / 180 : Math.PI / -180
        let totalAngle = angle * Math.PI / 180
        let radius = Math.sqrt(Math.pow(target.x - origin.x, 2) + Math.pow(target.y - origin.y, 2)) / 2
        let theta = Target.getTheta(origin.x, origin.y, target.x, target.y)
        let center = { x: origin.x + radius * Math.cos(theta), y: origin.y + radius * Math.sin(theta) }
        let composite = Composite.create({ bodies: [body] })

        for (let i = 0; i < Math.abs(totalAngle / step); i++) {
            this.timeout(() => Composite.rotate(composite, step, center), 16 / speed * i)
            if (i === Math.abs(totalAngle / step)) Body.setPosition(body, target)
        }
        this.timeout(() => {

            if (callback) callback()
        }, 16 / speed * (totalAngle / step))
    }

    fire = {
        nuke: (origin, target, callback) => {
            new vidaBullet(origin.x, origin.y, target.x, target.y, 20, 10, 0, this.world, this.bullets)
            if (callback) callback()
        },
        laser: (shots, origin, target, speed, callback) => {
            for (let i = 0; i < shots; i++) {
                this.timeout(() => new vidaLaser(origin.x, origin.y, 50, 5, target, speed, 0, this.world, this.bullets), 200 * i)
            }
            if (callback) this.timeout(() => callback(), 800)
        },
        wave: (w, h, origin, target, speed, delay, callback) => {
            new vidaWave(origin.x, origin.y, w, h, target, speed, delay, this.world, this.bullets)
            if (callback) callback()
        }
    }

    multiFire = {
        laser: (origins) => {
            origins.forEach(key => this.fire.laser(6 - origins.length, key.body.position, this.player.body.position, 30))
        },
        wave: (origins) => {
            origins.forEach(key => this.fire.wave(100 / origins.length, 200 / origins.length, key.body.position, this.player.body.position, 30, 1000))
        }
    }
}
export default Scene4
