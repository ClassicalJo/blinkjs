import { DEATH_DATA } from "../actionTypes"

const initialState = {
    x: 0,
    y: 0,
    height: 20,
    width: 20,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case DEATH_DATA: return {
            ...state,
            ...action.payload
        }
        default: return state
    }
}
