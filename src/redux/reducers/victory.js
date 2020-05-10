import { VICTORY_DATA } from "../actionTypes"

let initialState = {
    enemy: {},
    player: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case VICTORY_DATA: return {
            ...state,
            enemy: action.payload.enemy,
            player: action.payload.player,
        }
        default: return state
    }
}
