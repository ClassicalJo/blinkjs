import { combineReducers } from "redux";
import scene from "./changeScene"
import enemies from "./enemies"
import victory from "./victory"
import window from "./window"
import death from "./death"
import bgm from "./bgm"
import sfx from "./sfx"

export default combineReducers({ scene, enemies, victory, window, death, bgm, sfx});
