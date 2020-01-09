import React from 'react'

let Touchscreen = (props) => {
    return (
        <React.Fragment>
            <g onClick={props.onClick}>
                <circle cx="-725" cy="225" r="225" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="transparent" />
                <path d="M-725 225 L -975 0 V 475 Z" fill="transparent" id="left" />
                <path d="M-725 225 L -975 0 H -475 Z" fill="transparent" id="up" />
                <path d="M-725 225 L -475 475 V 0 Z" fill="transparent" id="right" />
                <path d="M-725 225 L -475 475 H -975 Z" fill="transparent" id="down" />
            </g>

            <g>
                <circle cx="600" cy="300" r="100" fill="transparent" stroke="rgba(255,255,255,0.5)" strokeWidth="3" onClick={props.shoot}/>
                <circle cx="850" cy="200" r="100" fill="transparent" stroke="rgba(255,255,255,0.5)" strokeWidth="3" onClick={props.blink}/>
            </g>
        </React.Fragment>
    )
}

export default Touchscreen