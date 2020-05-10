import {
    CHANGE_SCENE,
    SELECT_ENEMY,
    CLEAR_ENEMY,
    ENEMY_KILL,
    SET_SHOW_INTRO,
    VICTORY,
    VICTORY_DATA,
    RESIZE_WINDOW,
    DEATH_DATA,
    PLAY_BGM,
    STOP_BGM,
    ENEMY_RESTORE,
    ENEMY_LIST,
    TOGGLE_MUTE,
} from "./actionTypes"

export const changeScene = scene => ({
    type: CHANGE_SCENE,
    payload: scene,
})

export const selectEnemy = enemy => ({
    type: SELECT_ENEMY,
    payload: enemy
})

export const clearEnemy = () => ({
    type: CLEAR_ENEMY,
})

export const enemyKill = enemy => ({
    type: ENEMY_KILL,
    payload: enemy
})

export const enemyRestore = () => ({
    type: ENEMY_RESTORE,
})

export const enemyList = list => ({
    type: ENEMY_LIST,
    payload: list,
})
export const setShowIntro = boolean => ({
    type: SET_SHOW_INTRO,
    payload: boolean,
})

export const victoryData = data => ({
    type: VICTORY_DATA,
    payload: data
})

export const deathData = data => ({
    type: DEATH_DATA,
    payload: data
})

export const victory = () => ({
    type: VICTORY,
})

export const resizeWindow = data => ({
    type: RESIZE_WINDOW,
    payload: data
})

export const playBGM = data => ({
    type: PLAY_BGM,
    payload: data
})

export const stopBGM = () => ({
    type: STOP_BGM,
})

export const toggleMute = () => ({
    type: TOGGLE_MUTE
})

