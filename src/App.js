import React, { useEffect } from 'react';
import Scene from "./scenes"
import "./assets/css/app.css"
import { connect } from "react-redux"
import { withCookies } from "react-cookie"
import { playBGM, resizeWindow, enemyList } from './redux/actions';

let useMount = fn => useEffect(fn, [])

let resize = props => {
  let svgHeight = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth * 9 / 16 : window.innerHeight
  let svgWidth = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth : window.innerHeight * 16 / 9
  props.resize({
    svgHeight: svgHeight,
    svgWidth: svgWidth,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    offset: (window.innerWidth - svgWidth) / 2
  })
}

let getCookies = props => {
  let cookies = {};
  ["sakura", "blood", "nul", "vida", "ava"].forEach(key => cookies[key] = props.cookies.get(key) === undefined ? true : false)
  props.enemyList(cookies)
}

const App = props => {
  useMount(() => {
    setBackgroundMusic(props, "start")
    window.addEventListener("resize", () => resize(props))
    getCookies(props)
    return window.removeEventListener("resize", () => resize(props))
  }, [])

  return (
    <div className="svg-container" >
      {props.state.scene.current === "start" && <Scene.Start />}
      {props.state.scene.current === "loading" && <Scene.Loading />}
      {props.state.scene.current === "controller" && <Scene.Controller />}
      {props.state.scene.current === "credits" && <Scene.Credits />}
      {props.state.scene.current === "select" && <Scene.Select />}
      {props.state.scene.current === "death" && <Scene.Death />}
      {props.state.scene.current === "victory" && <Scene.Victory />}
      {props.state.scene.current === "sakura" && <Scene.Scene1 />}
      {props.state.scene.current === "blood" && <Scene.Scene2 />}
      {props.state.scene.current === 'nul' && <Scene.Scene3 />}
      {props.state.scene.current === 'vida' && <Scene.Scene4 />}
      {props.state.scene.current === 'ava' && <Scene.Scene5 />}
    </div>
  )
}

let setBackgroundMusic = (props, string) => {
  if (props.bgm.current !== string) {
    props.bgm.songs[string].play()
    props.playBGM(string)
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    bgm: state.bgm
  }
}
function mapDispatchToProps(dispatch) {
  return {
    resize: data => dispatch(resizeWindow(data)),
    playBGM: data => dispatch(playBGM(data)),
    enemyList: list => dispatch(enemyList(list)),
  }
}
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(App))

