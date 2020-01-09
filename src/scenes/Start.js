import React from 'react'

let Start = (props) => {
    return (
        <React.Fragment>
            <symbol id="shape1" width="500" height="100" viewBox="-250 -50 500 100" >
                <rect x="-250" y="-50" width="500" height="100" fill="white" />
                <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="40"
                    fontFamily="Arial"
                    fill="black">
                    Keyboard
                 </text>
            </symbol>

            <symbol id="shape2" width="500" height="100" viewBox="-250 -50 500 100" >
                <rect x="-250" y="-50" width="500" height="100" fill="white" />
                <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="40"
                    fontFamily="Arial"
                    fill="black">
                    Touchscreen
                 </text>
            </symbol>

            <use xlinkHref="#shape1" x="-250" y="-100" onClick={props.keyboard}/>
            <use xlinkHref="#shape2" x="-250" y="100" onClick={props.touchscreen}/>
        </React.Fragment>
    )

}
export default Start