import { Events } from "matter-js"


let collisionEvents = (player, engine, playerBullets) => {
    Events.on(engine, 'collisionStart', (event) => {
        for (let i = 0; i < event.pairs.length; i++) {
            let pair = event.pairs[i]

            if (pair.bodyA.label === "player" && pair.bodyB.label !== "wall") {
                if (pair.bodyB.label !== "playerBullet") player.dead = true
            }
            else if (pair.bodyB.label === "player" && pair.bodyA.label !== "wall") {
                if (pair.bodyA.label !== "playerBullet") player.dead = true
            }

            if (pair.bodyA.label === "playerBullet") {
                if (pair.bodyB.label === "barrier") {
                    pair.bodyB.hp--
                    removeBullet(pair.bodyA, playerBullets)
                }
                else if (pair.bodyB.label === "enemy") {
                    pair.bodyB.hp--
                    removeBullet(pair.bodyA, playerBullets)
                }
            }

            else if (pair.bodyB.label === "playerBullet") {
                if (pair.bodyA.label === "barrier") {
                    pair.bodyA.hp--
                    removeBullet(pair.bodyB, playerBullets)
                }
                else if (pair.bodyA.label === "enemy") {
                    pair.bodyA.hp--
                    removeBullet(pair.bodyB, playerBullets)
                }
            }
        }
    })
}

let removeBullet = (pair, playerBullets) => {
    for (let i = playerBullets.length - 1; i >= 0; i--) {
        if (playerBullets[i].body.id === pair.id) {
            playerBullets[i].remove()
        }
    }
}
export default collisionEvents
