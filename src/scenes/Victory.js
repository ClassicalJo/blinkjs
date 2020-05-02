import React, { useEffect } from 'react'
import PlayerSVG from '../assets/svg/PlayerSVG'
import Viewbox from '../assets/svg/Viewbox'
import EnemySVG from '../assets/svg/EnemySVG'
import { Howl } from "howler"
import enemyScream from "../assets/sounds/sfx/enemy_scream.wav"
import enemyExplosion from "../assets/sounds/sfx/enemy_explosion.wav"
let shuffle = arr => {
    var i, temp, j, len = arr.length;
    for (i = 0; i < len; i++) {
        j = ~~(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

let scream = new Howl({
    src: [enemyScream],
    preload: true,
    volume: 0.5
})

let explosion = new Howl({
    src: [enemyExplosion],
    preload: true,
    volume: 0.5
})

let Victory = props => {
    useEffect(() => {
        scream.play()
        let timeout = setTimeout(() => explosion.play(), 2000)
        return () => clearTimeout(timeout)
    }, [props])
    return (
        <Viewbox>
            <text opacity="0" fill="white" fontSize="32" alignmentBaseline="central" textAnchor="middle" fontFamily="Arial Black">
                ENEMY ASSIMILATION: SUCCESS
                <animate
                    attributeName="opacity"
                    from="0"
                    to="1"
                    begin="6s"
                    dur="0.1s"
                    fill="freeze"
                />
            </text>

            <g>
                {EnemySVG[props.victoryData.enemy.name](props.victoryData.enemy)}
                <animate attributeName="opacity" from="1" to="0" dur="0.1s" begin="1.9s" fill="freeze" />
            </g>
            <g>
                {shuffle([30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360]).map((key, index) => (
                    <circle
                        key={key}
                        fill={props.victoryData.enemy.coreColor}
                        r="20"
                        cx={props.victoryData.enemy.body.position.x + (30 + Math.floor(Math.random() * 10)) * Math.cos(key * Math.PI / 180)}
                        cy={props.victoryData.enemy.body.position.y + (30 + Math.floor(Math.random() * 10)) * Math.sin(key * Math.PI / 180)}
                        opacity="0">
                        <animate
                            attributeName="opacity"
                            calcMode="discrete"
                            keyTimes={`0;1`}
                            values="1;0"
                            begin={`${1 + 0.1 * index}s`}
                            dur={`${4 - 0.1 * index}s`}
                            fill="freeze"
                        />
                        <animateTransform
                            attributeName='transform'
                            type="translate"
                            additive="replace"
                            keyTimes="0;0.75;1"
                            values={`
                        ${(30 + Math.floor(Math.random() * 10)) * Math.cos(key * Math.PI / 180)} ${(30 + Math.floor(Math.random() * 10)) * Math.sin(key * Math.PI / 180)};
                        ${1500 * Math.cos(key * Math.PI / 180)} ${1500 * Math.sin(key * Math.PI / 180)};
                        ${props.victoryData.player.body.position.x - props.victoryData.enemy.body.position.x} ${props.victoryData.player.body.position.y - props.victoryData.enemy.body.position.y}
                        `}

                            dur="3s"
                            begin="2s"
                            fill="freeze"
                        />
                    </circle>
                ))}
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from={`0 ${props.victoryData.enemy.body.position.x} ${props.victoryData.enemy.body.position.x}`}
                    to={`360 ${props.victoryData.player.body.position.x} ${props.victoryData.player.body.position.x}`}
                    begin="2s"
                    dur="3s"
                    fill="freeze"
                />
            />
            </g>
            <g>
                {PlayerSVG(props.victoryData.player.body.position.x - 10, props.victoryData.player.body.position.y - 10, 20, 20)}
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    begin="5.5s"
                    dur="0.1s"
                    fill="freeze"
                />
            </g>
            <rect rx="20" width="200" height="100" x="-100" y="300" cursor="pointer" fill="transparent" onClick={() => props.sceneChange("select")} />
            <text
                fontFamily="Arial Black"
                fontSize="50"
                alignmentBaseline="central"
                textAnchor="middle"
                x="0"
                y="350"
                fill="white"
                pointerEvents="none"
                opacity="0">
                PROCEED
                    <animate
                    attributeName="opacity"
                    from="0"
                    to="1"
                    begin="6s"
                    dur="0.1s"
                    fill="freeze"
                />
            </text>
        </Viewbox>
    )
}

export default Victory
