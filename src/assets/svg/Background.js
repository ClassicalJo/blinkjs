import React from 'react'

let Background = () => {
    let stars = [1]
    

    return (
        <g>
            {stars.map((key) => <rect key={key} x={Math.ceil(Math.random() * 2000) - 1000} y={Math.ceil(Math.random() * 1000) -500} width={Math.ceil(Math.random() * 3)} height={Math.ceil(Math.random() * 3)} fill="white" />)}
            {stars.map((key) => <rect key={key} x={Math.ceil(Math.random() * -2000) - 1000} y={Math.ceil(Math.random() * -1000) -500} width={Math.ceil(Math.random() * 3)} height={Math.ceil(Math.random() * 3)} fill="white" />)}
        </g>
    )
}

export default Background
