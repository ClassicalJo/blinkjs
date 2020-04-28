import React from 'react'

let Definitions = () => {
    return (
        <defs>
            <filter id="blur">
                <feGaussianBlur stdDeviation="2" />
            </filter>
            <radialGradient
                id="avaHeart"
                cx="50%"
                cy="50%"
                r="100%">
                <stop stopColor="white" offset="5%" />
                <stop stopColor="silver" offset="25%" />
                <stop stopColor="black" offset="55%" />
            </radialGradient>

            <filter id="glowing" height="500%" width="500%" x="-250%" y="-250%">
            <feDropShadow
                    floodColor="silver"
                    floodOpacity="0.9"
                    stdDeviation="5"
                    dy="0"
                    dx="0"
                />
                <feDropShadow
                    floodColor="black"
                    stdDeviation="3"
                    dy="0"
                    dx="0"
                />
    
            </filter>


            {["violet", "indigo", "blue", "green", "yellow", "orange", "red","white"].map(key => {
                return (
                    <radialGradient
                        key={key}
                        id={`radial${key}`}
                        cx="50%"
                        cy="50%"
                        r="100%">
                        <stop stopColor="silver" offset="15%" />
                        <stop stopColor={key} offset="25%" />
                        <stop stopColor="white" offset="95%" />
                    </radialGradient>
                )
            })}

        </defs>
    )
}

export default Definitions
