import React from 'react'

let sakura = {
    wing: (cx, cy, r) => {
        return (
            `
            M${cx} ${cy + 2 * r} 
            L${cx + r / 8} ${cy} 
            L${cx} ${cy - 2 * r} 
            L${cx - r / 8} ${cy} 
            Z`
        )
    },

}

let nul = {
    delta: (cx, cy, r) => {
        return (
            `
            M${cx + r * Math.cos(360 * Math.PI / 180)} ${cy + (2 * r) * Math.sin(300 * Math.PI / 180)}            
            L${cx + (2 * r) * Math.cos(60 * Math.PI / 180)} ${cy + (2 * r) * Math.sin(60 * Math.PI / 180)}
            L${cx + (2 * r) * Math.cos(180 * Math.PI / 180)} ${cy + (2 * r) * Math.sin(180 * Math.PI / 180)}
            Z`
        )
    }
}

let vida = {
    cross: (cx, cy, r) => {
        return (
            `
            M${cx + r / 2 * Math.cos(225 * Math.PI / 180)} ${cy + r / 2 * Math.sin(225 * Math.PI / 180)}
            L${cx + r * 2 * Math.cos(270 * Math.PI / 180)} ${cy + r * 2 * Math.sin(270 * Math.PI / 180)}
            L${cx + r / 2 * Math.cos(325 * Math.PI / 180)} ${cy + r / 2 * Math.sin(325 * Math.PI / 180)}
            L${cx + r * 2 * Math.cos(2 * Math.PI)} ${cy + r * 2 * Math.sin(2 * Math.PI)}
            L${cx + r / 2 * Math.cos(45 * Math.PI / 180)} ${cy + r / 2 * Math.sin(45 * Math.PI / 180)}
            L${cx + r * 2 * Math.cos(90 * Math.PI / 180)} ${cy + r * 2 * Math.sin(90 * Math.PI / 180)}
            L${cx + r / 2 * Math.cos(135 * Math.PI / 180)} ${cy + r / 2 * Math.sin(135 * Math.PI / 180)}
            L${cx + r * 2 * Math.cos(180 * Math.PI / 180)} ${cy + r * 2 * Math.sin(180 * Math.PI / 180)}
            Z
            `
        )
    }
}

let ava = {
    ring: (cx, cy, r, plusX, plusY) => {
        return (
            `
            M${cx + r + plusX} ${cy}
            H${cx - r - plusX}
            
            `
        )
    },
    grin: (cx, cy, r, plusX, plusY) => {
        return (
            `
            M${cx} ${cy - plusY}
            C${cx + r + 2 * plusX} ${cy - plusY} ${cx + r + 2 * plusX} ${cy} ${cx + r + plusX} ${cy}
            H${cx - r - plusX}
            C${cx - r - 2 * plusX} ${cy} ${cx - r - 2 * plusX} ${cy - plusY} ${cx} ${cy - plusY}
            `
        )
    }
}

let EnemySVG = {
    sakura: key => {
        return (
            <g key={key.body.id} transform={`rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`}>
                <circle
                    className={key.className}
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    fill={key.coreColor}
                />
                <path d={sakura.wing(key.body.position.x, key.body.position.y, key.body.circleRadius)} fill="white" />
            </g>
        )
    },
    blood: key => {
        return (
            <g key={key.body.id} transform={`rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`}>
                <circle
                    // className={key.className}
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    fill={key.coreColor}
                />
            </g>
        )
    },
    satellite: key => {
        return (
            <g key={key.body.id} transform={`rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`}>
                <circle
                    // className={key.className}
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    fill={key.coreColor}
                />
            </g>
        )
    },
    nul: key => {
        return (
            <g key={key.body.id} transform={`rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`}>
                <path d={nul.delta(key.body.position.x, key.body.position.y, key.body.circleRadius)} fill="purple" />
                <circle
                    className={key.className}
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    fill={key.coreColor}

                />
            </g>
        )
    },
    vida: key => {
        return (
            <g key={key.body.id} transform={`rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`}>
                <path d={vida.cross(key.body.position.x, key.body.position.y, key.body.circleRadius)} fill="#ccc3b4" />
                <circle
                    className={key.className}
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    fill={key.coreColor}

                />
            </g>
        )
    },
    ava: key => {
        let outerRing = [0, 90]
        let innerRing = [0, -90, -135]
        return (
            <g key={key.body.id} transform={`rotate(${key.body.angle * 180 / Math.PI} ${key.body.position.x} ${key.body.position.y})`}>
                {innerRing.map(ring => (
                    <path
                        key={`inner${ring}`}
                        stroke="#6E798A"
                        fill="transparent"
                        strokeWidth="3"
                        strokeDasharray="1"
                        pathLength="1"
                        d={ava.grin(key.body.position.x, key.body.position.y, key.body.circleRadius, 15, 5)}>
                        <animateTransform attributeName="transform" type="rotate" from={`${ring} ${key.body.position.x} ${key.body.position.y}`} to={`${ring - 360} ${key.body.position.x} ${key.body.position.y}`} repeatCount="indefinite" dur="10s" />
                    </path>
                ))}
                {outerRing.map(ring => (
                    <path
                        key={`outer${ring}`}
                        stroke="silver"
                        fill="transparent"
                        strokeWidth="3"
                        strokeDasharray="1"
                        pathLength="1"
                        d={ava.grin(key.body.position.x, key.body.position.y, key.body.circleRadius, 25, 5)}>
                        <animateTransform attributeName="transform" type="rotate" from={`${ring} ${key.body.position.x} ${key.body.position.y}`} to={`${ring + 360} ${key.body.position.x} ${key.body.position.y}`} repeatCount="indefinite" dur="10s" />

                    </path>
                ))}
                <circle
                    key={key.body.id}
                    className={key.className}
                    cx={key.body.position.x}
                    cy={key.body.position.y}
                    r={key.body.circleRadius}
                    fill="url(#avaHeart)">
                    <animateTransform additive="sum" attributeName="transform" type="translate" values={`0;${(1 - 1.05) * key.body.position.x} ${(1 - 1.05) * key.body.position.y};0;0`} dur="1.5" repeatCount='indefinite' fill="remove" keyTimes="0; 0.15; 0.25; 1" />
                    <animateTransform additive="sum" attributeName="transform" type="scale" values="1;1.05;1;1" dur="1.5" repeatCount='indefinite' fill="remove" keyTimes="0; 0.15; 0.25; 1" />
                </circle>
                {innerRing.map(ring => (
                    <path
                        key={`2inner${ring}`}
                        stroke="#6E798A"
                        fill="transparent"
                        strokeWidth="3"
                        strokeDasharray="1"
                        pathLength="1"
                        d={ava.ring(key.body.position.x, key.body.position.y, key.body.circleRadius, 15, 5)}>
                        <animateTransform attributeName="transform" type="rotate" from={`${ring} ${key.body.position.x} ${key.body.position.y}`} to={`${ring - 360} ${key.body.position.x} ${key.body.position.y}`} repeatCount="indefinite" dur="10s" />
                    </path>
                ))}
                {outerRing.map(ring => (
                    <path
                        key={`2outer${ring}`}
                        stroke="silver"
                        fill="transparent"
                        strokeWidth="3"
                        strokeDasharray="1"
                        pathLength="1"
                        d={ava.ring(key.body.position.x, key.body.position.y, key.body.circleRadius, 25, 5)}>
                        <animateTransform attributeName="transform" type="rotate" from={`${ring} ${key.body.position.x} ${key.body.position.y}`} to={`${ring + 360} ${key.body.position.x} ${key.body.position.y}`} repeatCount="indefinite" dur="10s" />
                    </path>
                ))}
            </g>
        )
    },
}

export default EnemySVG
