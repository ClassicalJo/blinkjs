import React from 'react'
import ViewBox from "../assets/svg/Viewbox"
let Credits = props => {
    return (
        <ViewBox>
            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={-400}>Due credit to the following for their amazing job at being amazing:</text>
            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={-300}>
                Physics Engine: Matter-JS by liabru
                </text>
            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={-250}>
                Sound effects: created with BFXR by increpare
                </text>
            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={-200} pointerEvents="none">
                Music provided by the awesome Robert Suthard - check his Soundcloud!!!
                </text>
            <a href="https://soundcloud.com/user-883264187" rel="noopener noreferrer" target="_blank" >
                <rect width="300" height="60" fill="transparent" x="560" y="-225" cursor="pointer" />
            </a>
            <line x1="560" x2="860" y1="-165" y2="-165" stroke="white" strokeWidth="5" />

            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={-100}>
                Everything else made by me: ClassicalJo -
                 </text>
            <a href="https://github.com/classicaljo/" rel="noopener noreferrer" target="_blank" >
                <rect width="300" height="50" x="-750" y="-50" cursor="pointer" />
            </a>
            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={-25} pointerEvents="none">github</text>
            <line x1="-750" x2="-605" y1="5" y2="5" stroke="white" strokeWidth="5" />

            <a href="https://classicaljo.github.io/portfolio" rel="noopener noreferrer" target="_blank" >
                <rect width="300" height="50" x="-750" y="15" cursor="pointer" />
            </a>
            <line x1="-750" x2="-565" y1="60" y2="60" stroke="white" strokeWidth="5" />
            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={30} pointerEvents="none">
                portfolio
                </text>
            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={100}>
                Special thanks and a big "i love you" to all my friends that invested
                </text>
            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={150}>
                their valuable time in testing this piece of shit:
                </text>
            <text fontSize="40" fontFamily="Arial Black" fill="white" alignmentBaseline="central" x="-750" y={200}>Adhara, War, Robert, Diego, Marian, Brodda, Lihuel, Kieron</text>

            <rect x="-100" y="420" width="200" height="60" onClick={() => props.sceneChange("start")} cursor="pointer" />
            <text fontSize="40" fontFamily="Arial Black" fill="white" textAnchor="middle" alignmentBaseline="central" x="0" y={450} pointerEvents="none">Back</text>
        </ViewBox>
    )
}
export default Credits
