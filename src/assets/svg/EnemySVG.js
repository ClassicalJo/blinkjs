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

let EnemySVG = {
    sakura: (cx, cy, r, coreColor, className) => {
        return (
            <g key="0">

                <circle
                    key="3"
                    className={className}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={coreColor}
                />
                <path key="1" d={sakura.wing(cx, cy, r)} fill="white" />
            </g>
        )
    },
    blood: (cx, cy, r, coreColor, className) => {
        return (
            <g key="4">
                <circle
                    key="5"
                    className={className}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={coreColor}
                />
            </g>
        )
    },
    satellite: (cx, cy, r, coreColor, className) => {
        return (
            <g key={cx + cy + 6}>
                <circle
                    key="7"
                    className={className}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={coreColor}
                />
            </g>
        )
    },
    nul: (cx, cy, r, coreColor, className, angle) => {
        return (
            <g key={cx + cy + 7} transform={`rotate(${angle * 180 / Math.PI} ${cx} ${cy})`}>
                <path key="9" d={nul.delta(cx, cy, r)} fill={r > 50 ? "transparent" : "purple"}></path>
                <circle
                    key="8"
                    className={className}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={coreColor}

                />
            </g>
        )
    },
    vida: (cx, cy, r, coreColor, className) => {
        return (
            <g key={cx + cy + 7}>
                <path key="9" d={vida.cross(cx, cy, r)} fill="#ccc3b4"></path>
                <circle
                    key="8"
                    className={className}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={coreColor}

                />
            </g>
        )
    }
}

export default EnemySVG
