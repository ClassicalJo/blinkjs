import { ENEMY_KILL, ENEMY_RESTORE, ENEMY_LIST } from "../actionTypes"

const initialState = {
    sakura: true,
    blood: true,
    nul: true,
    vida: true,
    ava: true,
}


export default function (state = initialState, action) {
    switch (action.type) {
        case ENEMY_KILL: {
            return {
                ...state,
                [action.payload]: false
            }
        }
        case ENEMY_RESTORE: {
            return initialState
        }
        case ENEMY_LIST: {
            return action.payload
        }
        default: return state
    }

}
