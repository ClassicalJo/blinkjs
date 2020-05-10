import React, { useEffect } from 'react'
import PlayerSVG from '../assets/svg/PlayerSVG'
import { Howl } from "howler"
import enemyScream from "../assets/sounds/sfx/enemy_scream.wav"
import enemyExplosion from "../assets/sounds/sfx/enemy_explosion.wav"
import { connect } from "react-redux"
import { changeScene } from "../redux/actions"
import Viewbox from '../assets/svg/Viewbox'

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
        props.bgm.songs[props.bgm.current].stop()
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
                <circle
                    r={props.enemy.body.circleRadius}
                    fill={props.enemy.coreColor}
                    cx={props.enemy.body.position.x}
                    cy={props.enemy.body.position.y}>
                    <animate attributeName="opacity" from="1" to="0" dur="0.1s" begin="1.9s" fill="freeze" />
                </circle>
            </g>
            <g>
                {shuffle([30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360]).map((key, index) => (
                    <circle
                        key={key}
                        fill={props.enemy.coreColor}
                        r="20"
                        cx={props.enemy.body.position.x + (30 + Math.floor(Math.random() * 10)) * Math.cos(key * Math.PI / 180)}
                        cy={props.enemy.body.position.y + (30 + Math.floor(Math.random() * 10)) * Math.sin(key * Math.PI / 180)}
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
                        ${props.player.body.position.x - props.enemy.body.position.x} ${props.player.body.position.y - props.enemy.body.position.y}
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
                    from={`0 ${props.enemy.body.position.x} ${props.enemy.body.position.x}`}
                    to={`360 ${props.player.body.position.x} ${props.player.body.position.x}`}
                    begin="2s"
                    dur="3s"
                    fill="freeze"
                />
            />
            </g>
            <g>
                {PlayerSVG(props.player.body.position.x - 10, props.player.body.position.y - 10, 20, 20)}
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    begin="5.5s"
                    dur="0.1s"
                    fill="freeze"
                />
            </g>
            <rect rx="20" width="200" height="100" x="-100" y="300" cursor="pointer" fill="transparent" onClick={() => props.dispatch(changeScene("select"))} />
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

function mapStateToProps(state) {
    return {
        enemy: state.victory.enemy,
        player: state.victory.player,
        bgm: state.bgm
    }
}
export default connect(mapStateToProps)(Victory)
