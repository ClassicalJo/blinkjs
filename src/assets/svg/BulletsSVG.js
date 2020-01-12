import React from 'react'
let BulletsSVG = {
    bouncer: (key) => {
        return (
            <g key={key.body.id}>
                <circle
                    className={key.className}
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.radius}
                    fill="#FFFF26"
                    filter="url(#blur)" />
                <circle
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.radius * 3 / 4}
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
                    r={key.radius}
                    stroke="#FFFF26"
                    fill="lightpink"
                    strokeWidth="1" />
            </g>
        )
    },
    bigBullet: (key) => {
        return (
            <g key={key.body.id}>
                <circle
                    className="bigBullet"
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.radius}
                    stroke="#C24CF6"
                    fill="#FC6E22"
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
                    r={key.radius}
                    stroke="#FFFF26"
                    fill="#C24CF6"
                    strokeWidth="1" />
            </g>
        )
    },
}


export default BulletsSVG