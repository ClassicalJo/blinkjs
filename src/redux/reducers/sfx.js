import {Howl} from "howler"
import playerFire from "../../assets/sounds/sfx/player_fire.wav"
import playerBlink from "../../assets/sounds/sfx/player_blink.wav"
import playerHit from "../../assets/sounds/sfx/player_hit.wav"
import playerExplosion from "../../assets/sounds/sfx/player_explosion.wav"
import gamePause from "../../assets/sounds/sfx/game_pause.wav"
import gameUnpause from "../../assets/sounds/sfx/game_unpause.wav"
import gameText from "../../assets/sounds/sfx/game_text.wav"
import sakuraBullet from "../../assets/sounds/sfx/sakura_bullet.wav"
import sakuraBarrage from "../../assets/sounds/sfx/sakura_barrage.wav"
import sakuraWave from "../../assets/sounds/sfx/sakura_wave.wav"
import sakuraBouncer from "../../assets/sounds/sfx/sakura_bouncer.wav"
import sakuraCascadeFalls from "../../assets/sounds/sfx/sakura_cascade_falls.wav"
import bloodLaser from "../../assets/sounds/sfx/blood_laser.wav"
import bloodExplosion from "../../assets/sounds/sfx/blood_explosion.wav"
import bloodMovement from "../../assets/sounds/sfx/blood_movement.wav"
import bloodShotgun from "../../assets/sounds/sfx/blood_shotgun.wav"
import bloodBullet from "../../assets/sounds/sfx/blood_bullet.wav"
import nulBombSound from "../../assets/sounds/sfx/nul_bomb.wav"
import nulVoidSound from "../../assets/sounds/sfx/nul_void.wav"
import nulBulletSound from "../../assets/sounds/sfx/nul_bullet.wav"
import nulMovementSound from "../../assets/sounds/sfx/nul_movement.wav"
import nulFlashSound from "../../assets/sounds/sfx/nul_flash.wav"
import vidaLaserSound from "../../assets/sounds/sfx/vida_laser.wav"
import vidaExplosionSound from "../../assets/sounds/sfx/vida_explosion.wav"
import vidaWaveSound from "../../assets/sounds/sfx/vida_wave.wav"
import vidaDivideSound from "../../assets/sounds/sfx/vida_divide.wav"
import cannonSound from "../../assets/sounds/sfx/ava_cannon.mp3"
import fireworksSound from "../../assets/sounds/sfx/ava_fireworks.wav"
import fireworksReverseSound from "../../assets/sounds/sfx/ava_fireworks_reverse.wav"
import missileSound from "../../assets/sounds/sfx/ava_missiles.wav"
import bulletSound from "../../assets/sounds/sfx/ava_bullet.wav"
import railgunSound from "../../assets/sounds/sfx/ava_railgun.wav"

const initialState = {
    player: {
        fire: new Howl({
            src: [playerFire],
            preload: true,
        }),
        blink: new Howl({
            src: [playerBlink],
            preload: true,
            volume: 0.20,
        }),
        hit: new Howl({
            src: [playerHit],
            preload: true
        }),
        explosion: new Howl({
            src: [playerExplosion],
            preload: true
        })
    },
    game: {
        pause: new Howl({
            src: [gamePause],
            volume: 0.15,
            preload: true
        }),
        unpause: new Howl({
            src: [gameUnpause],
            volume: 0.15,
            preload: true
        }),
        text: new Howl({
            src: [gameText],
            preload: true,
        })
    },
    sakura: {
        bullet: new Howl({
            src: [sakuraBullet],
            preload: true,
            volume: 0.05,
        }),
        barrage: new Howl({
            src: [sakuraBarrage],
            preload: true,
            volume: 0.25,
        }),
        bouncer: new Howl({
            src: [sakuraBouncer],
            preload: true,
            volume: 0.5,
        }),
        wave: new Howl({
            src: [sakuraWave],
            preload: true,
            volume: 0.25,
        }),
        cascade: new Howl({
            src: [sakuraCascadeFalls],
            preload: true,
            volume: 0.5,
        }),
    },
    blood: {
        movement: new Howl({
            src: [bloodMovement],
            preload: true,
        }),
        shotgun: new Howl({
            src: [bloodShotgun],
            preload: true,
        }),
        laser: new Howl({
            src: [bloodLaser],
            preload: true,
            volume: 0.35
        }),
        explosion: new Howl({
            src: [bloodExplosion],
            preload: true,
            volume: 0.35
        }),
        bullet: new Howl({
            src: [bloodBullet],
            preload: true,
        })
    },
    nul: {
        bullet: new Howl({
            src: [nulBulletSound],
            preload: true,
            volume: 0.5
        }),
        bomb: new Howl({
            src: [nulBombSound],
            preload: true,
            volume: 0.5
        }),
        void: new Howl({
            src: [nulVoidSound],
            preload: true,
        }),
        movement: new Howl({
            src: [nulMovementSound],
            preload: true,
            volume: 0.5
        }),
        flash: new Howl({
            src: [nulFlashSound],
            preload: true,
            volume: 0.15,
        })
    },
    vida: {
        laser: new Howl({
            src: [vidaLaserSound],
            preload: true,
            volume: 0.15,
        }),
        wave: new Howl({
            src: [vidaWaveSound],
            preload: true,
            volume: 0.15,
        }),
        explosion: new Howl({
            src: [vidaExplosionSound],
            preload: true,
            volume: 0.5,
        }),
        divide: new Howl({
            src: [vidaDivideSound],
            preload: true
        }),
    },
    ava: {
        cannon: new Howl({
            src: [cannonSound],
            volume: 0.25,
            preload: true

        }),
        fireworks: new Howl({
            src: [fireworksSound],
            volume: 0.5,
            preload: true
        }),
        fireworksReverse: new Howl({
            src: [fireworksReverseSound],
            volume: 0.5,
            preload: true
        }),
        missiles: new Howl({
            src: [missileSound],
            volume: 0.5,
            preload: true,
        }),
        bullet: new Howl({
            src: [bulletSound],
            volume: 0.75,
            preload: true,
        }),
        railgun: new Howl({
            src: [railgunSound],
            volume: 0.5,
            preload: true,
        })
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        default: return state
    }
}
