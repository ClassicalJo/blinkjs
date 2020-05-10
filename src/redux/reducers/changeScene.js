import { CHANGE_SCENE, SELECT_ENEMY, CLEAR_ENEMY, SET_SHOW_INTRO, VICTORY } from "../actionTypes"

const initialState = {
    current: "loading",
    enemySelected: "none",
    showIntro: true,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_SCENE: {
            return {
                ...state,
                current: action.payload
            }
        }
        case SELECT_ENEMY: {
            return {
                ...state,
                enemySelected: action.payload,
                current: action.payload,
            }
        }
        case CLEAR_ENEMY: {
            return {
                ...state,
                enemySelected: "none",
                current: "select",
                showIntro: true
            }
        }
        case SET_SHOW_INTRO: {
            return {
                ...state,
                showIntro: action.payload,
            }
        }
        case VICTORY: {
            return {
                ...state,
                showIntro: true,
                enemySelected: "none",
                current: "victory",
            }
        }
        default:
            return state
    }
}
