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
                    filter="url(#blur)" />
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
                    strokeWidth="5" />
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
                //className={key.className}
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
                //className={key.className}
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
    }
}


export default BulletsSVG
