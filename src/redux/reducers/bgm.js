import { PLAY_BGM, STOP_BGM, TOGGLE_MUTE } from "../actionTypes"
import { Howl } from "howler"
import spaceConcept from "../../assets/sounds/music/space_concept.mp3"
import gwdihw from "../../assets/sounds/music/gwdihw.mp3"
import colossalSketchBlood from "../../assets/sounds/music/colossal_sketch_blood.mp3"
import colossalSketchAva from "../../assets/sounds/music/colossal_sketch_ava.mp3"
import sleighBells from "../../assets/sounds/music/sleighbells.mp3"
import thrillerHorrorSomething from "../../assets/sounds/music/thrillerhorrorsomething.mp3"
import rodeOverTheDeep from "../../assets/sounds/music/rode_over_the_deep.mp3"

const initialState = {
    current: null,
    mute: false,
    songs: {
        start: new Howl({
            src: [spaceConcept],
            preload: true,
            volume: 0.5,
            loop: true,
        }),
        none: new Howl({
            src: [spaceConcept],
            preload: true,
            volume: 0.5,
            loop: true,
        }),
        sakura: new Howl({
            src: [gwdihw],
            preload: true,
            volume: 0.25,
            loop: true,
        }),
        blood: new Howl({
            src: [colossalSketchBlood],
            preload: true,
            volume: 0.5,
            loop: true,
        }),
        nul: new Howl({
            src: [thrillerHorrorSomething],
            preload: true,
            volume: 0.25,
            loop: true,
        }),
        vida: new Howl({
            src: [sleighBells],
            preload: true,
            volume: 0.25,
            loop: true,
        }),
        ava: new Howl({
            src: [colossalSketchAva],
            preload: true,
            volume: 0.25,
            loop: true,
        }),
        credits: new Howl({
            src: [rodeOverTheDeep],
            preload: true,
            volume: 0.5,
        })
    },
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PLAY_BGM: return {
            ...state,
            current: action.payload
        }
        case STOP_BGM: return {
            ...state,
            current: null
        }
        case TOGGLE_MUTE: return {
            ...state,
            mute: !state.mute
        }
        default: return state
    }
}
