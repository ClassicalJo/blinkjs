import { RESIZE_WINDOW } from "../actionTypes"

const initialState = {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    svgHeight: window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth * 9 / 16 : window.innerHeight,
    svgWidth: window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth : window.innerHeight * 16 / 9,
    offset: (window.innerWidth - window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth : window.innerHeight * 16 / 9) / 2,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case RESIZE_WINDOW: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return state
    }
}
