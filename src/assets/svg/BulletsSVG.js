import React from 'react'

let BulletsSVG = {
    bouncer: (key) => {
        return (
            <g key={key.body.id}>
                <circle
                    className={key.className}
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    fill="#FFFF26"
                    filter="url(#blur)">
                        <animate attributeName="fill" from="#FFFF26" to="pink" dur="0.03s" begin="0s" repeatCount="indefinite" fill="freeze"/>

                </circle>
                <circle
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius * 3 / 4}
                    fill="black" />
            </g>)
    },
    bullet: (key) => {
        return (
            <g key={key.body.id}>
                <circle
                    className="bullet"
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    stroke="#FFFF26"
                    fill="lightpink"
                    strokeWidth="1" />
            </g>
        )
    },
    explosion: (key) => {
        return (
            <g key={key.body.id}>
                <circle
                    className="explosion"
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    fill={key.coreColor}
                />
            </g>
        )
    },
    bigBullet: (key) => {
        return (
            <g key={key.body.id}>
                <circle
                    className={key.className}
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    stroke="#C24CF6"
                    fill="black"
                    strokeWidth="5">
                        <animate attributeName="fill" from="#FFFF26" to="#C24CF6" dur="0.05s" begin="0s" repeatCount="indefinite" fill="freeze"/>
                    </circle>
            </g>
        )
    },
    surroundBullet: (key) => {
        return (
            <g key={key.body.id}>
                <circle
                    className="bullet"
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    stroke="#FFFF26"
                    fill="#C24CF6"
                    strokeWidth="1" />
            </g>
        )
    },
    laser: (key) => {
        let rotate = `rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`
        return (
            <rect
                key={key.body.id}
                x={key.body.position.x + key.width / -2}
                y={key.body.position.y + key.height / -2}
                height={key.height}
                width={key.width}
                fill="red"
                transform={rotate} />
        )
    },
    aimLaser: (key) => {
        let rotate = `rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`
        return (
            <rect
                key={key.body.id}
                x={key.body.position.x + key.width / -2}
                y={key.body.position.y + key.height / -2}
                height={key.height}
                width={key.width}
                fill="rgba(255,0,0,0.4)"
                transform={rotate} />
        )
    },
    nul: key => {
        return (
            <g key={key.body.id}>
                <circle
                    className="bullet"
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    stroke="#9649CB"
                    fill="#292E1E"
                    strokeWidth="3" />
            </g>
        )
    },
    vida: key => {
        let { x, y } = { ...key.body.position }
        let r = key.body.circleRadius
        return (
            <g key={key.body.id} >
                <circle
                    className="bullet"
                    cx={x}
                    cy={y}
                    r={r}
                    fill="#ccc3b4"
                    opacity="0.85"
                />
                <path
                    d={`M${x} ${y - r} L ${x + r / 4} ${y - r / 4} L ${x + r} ${y} L ${x + r / 4} ${y + r / 4} L ${x} ${y + r} L ${x - r / 4} ${y + r / 4} L ${x - r} ${y} L ${x - r / 4} ${y - r / 4} Z`}
                    fill="#76C34E"
                    opacity="0"
                    transform={`rotate(0 ${x} ${y})`}
                >
                    <animate id={`fill${key.body.id}`} attributeName="opacity" begin="indefinite" dur="0.1s" fill="freeze" from="0" to="0.5" />
                    <animateTransform id={`nuke${key.body.id}`} attributeName="transform" begin="indefinite" dur="2s" repeatCount="indefinite" fill="freeze" type="rotate" from={`0 ${x} ${y}`} to={`360 ${x} ${y}`} />
                </path>
            </g>
        )
    },
    lifeLaser: key => {
        return (
            <g key={key.body.id} transform={`rotate(${key.body.angle} ${key.body.position.x} ${key.body.position.y})`}>
                <rect
                    className="bullet"
                    x={key.body.position.x + key.width / -2}
                    y={key.body.position.y + key.height / -2}
                    height={key.height}
                    width={key.width}
                    stroke="#76C34E"
                    fill="#F7F06D"
                    strokeWidth="3"
                    opacity="0.75"
                />
            </g>
        )
    },
    lifeWave: key => {
        let vertices = [key.body.bodies[1].vertices, key.body.bodies[0].vertices].flat()
        return (
            <g key={key.body.id}>
                <path
                    className="lifeWave"
                    id={key.body.id}
                    d={`M ${vertices[0].x} ${vertices[0].y} L ${vertices[3].x} ${vertices[3].y} L ${vertices[5].x} ${vertices[5].y} L ${vertices[4].x} ${vertices[4].y} Z`}
                    fill="transparent"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.2"
                >

                    <animate attributeName="fill"
                        from="transparent" to="#76C34E"
                        begin="3s" dur="0.05s" fill="freeze"
                    />
                    <animate attributeName="fill"
                        from="#76C34E" to="white"
                        begin="3.05s" dur="0.05s" fill="freeze" repeatCount="indefinite"
                    />
                    <animate attributeName="opacity"
                        from="0.2" to="0.75"
                        begin="0s" dur="4s" fill="freeze"
                    />
                </path>
            </g>
        )
    },

    pointer: key => (
        <circle
            cx={key.body.position.x}
            cy={key.body.position.y}
            r={key.body.circleRadius}
            fill="red"
        />
    ),

    ava: key => (
        <circle
            key={key.body.id}
            cx={key.body.position.x}
            cy={key.body.position.y}
            r={key.body.circleRadius}
            fill={`url(#radial${key.color})`}
        >
        </circle>
    )
    ,
    avaPointer: key => (
        <g key={key.body.id}>
            <circle
                cx={key.body.position.x}
                cy={key.body.position.y}
                r={key.body.circleRadius}
                fill="black"
                filter="url(#glowing)"
            />
            <circle
                cx={key.body.position.x}
                cy={key.body.position.y}
                r={key.body.circleRadius / 2.5}
                fill="silver"
                opacity="0.3"
                filter="url(#blur)"

            />
        </g>
    ),
    avaHoming: key => {
        return (
            <circle
                key={key.body.id}
                cx={key.body.position.x}
                cy={key.body.position.y}
                r={key.body.circleRadius}
                fill={`url(#radial${key.color})`}
            >
                <animate id={`fade${key.body.id}`} attributeName="opacity" from="1" to="0.25" dur="0.25s" begin="indefinite" fill="freeze" />
                <animateTransform id={`translate${key.body.id}`} attributeName="transform" type="translate" additive="sum" from="0 0" to={`${0.9 * key.body.position.x} ${0.9 * key.body.position.y}`} dur="0.25s" begin="indefinite" fill="freeze" />
                <animateTransform id={`diminish${key.body.id}`} attributeName="transform" additive="sum" type="scale" from="1 1" to="0.1 0.1" dur="0.25s" begin="indefinite" fill="freeze" />


            </circle>
        )
    },
    avaRailgun: key => (
        <circle
            key={key.body.id}
            cx={key.body.position.x}
            cy={key.body.position.y}
            r={key.body.circleRadius}
            fill="blue"
        />
    ),
    avaAim: key => {
        return (
            <rect
                key={key.body.id}
                x={key.body.position.x + key.width / -2}
                y={key.body.position.y + key.height / -2}
                height={key.height}
                width={key.width}
                fill="white"
                opacity="0.3"
                transform={`rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`} />
        )
    },
    avaCannon: key => {
        let v = key.body.vertices
        let height = Math.sqrt(Math.pow(v[2].x - v[1].x, 2) + Math.pow(v[2].y - v[1].y, 2))
        let width = Math.sqrt(Math.pow(v[1].x - v[0].x, 2) + Math.pow(v[1].y - v[0].y, 2))

        return (
            <rect
                key={key.body.id}
                x={key.body.position.x + width / -2}
                y={key.body.position.y + height / -2}
                width={width}
                height={height}
                rx={height}
                transform={`rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`}
                fill="white"
                opacity="0.9">
                <animate id={`fade${key.body.id}`} attributeName="opacity" from="0.9" to="0" dur="0.5s" begin="indefinite" fill="freeze" />
            </rect>

        )
    }
}


export default BulletsSVG
