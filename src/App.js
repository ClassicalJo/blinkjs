import React from 'react';
import Controller from './scenes/Controller'
import Start from "./scenes/Start"
import Select from './scenes/Select'
import Scene1 from "./scenes/Scene1"
import Scene2 from './scenes/Scene2'
import Scene3 from './scenes/Scene3'
import Scene4 from "./scenes/Scene4"
import Scene5 from "./scenes/Scene5"
import Victory from "./scenes/Victory"
import Credits from "./scenes/Credits"
import "./assets/css/app.css"
import Death from './scenes/Death';
import { withCookies } from "react-cookie"
import { Howl } from "howler"
import spaceConcept from "./assets/sounds/music/space_concept.mp3"
import gwdihw from "./assets/sounds/music/gwdihw.mp3"
import colossalSketchBlood from "./assets/sounds/music/colossal_sketch_blood.mp3"
import colossalSketchAva from "./assets/sounds/music/colossal_sketch_ava.mp3"
import sleighBells from "./assets/sounds/music/sleighbells.mp3"
import thrillerHorrorSomething from "./assets/sounds/music/thrillerhorrorsomething.mp3"
import rodeOverTheDeep from "./assets/sounds/music/rode_over_the_deep.mp3"


class App extends React.Component {
  constructor(props) {
    super(props);
    let svgHeight = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth * 9 / 16 : window.innerHeight
    let svgWidth = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth : window.innerHeight * 16 / 9

    this.cookies = props.cookies;

    this.state = {
      currentScene: "start",
      enemySelected: "none",
      playMode: "keyboard",
      mute: false,
      svgHeight: svgHeight,
      svgWidth: svgWidth,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      offset: (window.innerWidth - svgWidth) / 2,
      showIntro: true,
      sakura: this.cookies.get("sakura") !== undefined ? false : true,
      blood: this.cookies.get("blood") !== undefined ? false : true,
      nul: this.cookies.get("nul") !== undefined ? false : true,
      vida: this.cookies.get("vida") !== undefined ? false : true,
      death: {
        x: 0,
        y: 0,
        width: 25,
        height: 25,
      }
    }

    this.bgm = {
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
      scene1: new Howl({
        src: [gwdihw],
        preload: true,
        volume: 0.25,
        loop: true
      }),
      scene2: new Howl({
        src: [colossalSketchBlood],
        preload: true,
        volume: 0.5,
        loop: true
      }),
      scene3: new Howl({
        src: [thrillerHorrorSomething],
        preload: true,
        volume: 0.25,
        loop: true
      }),
      scene4: new Howl({
        src: [sleighBells],
        preload: true,
        volume: 0.25,
        loop: true
      }),
      scene5: new Howl({
        src: [colossalSketchAva],
        preload: true,
        volume: 0.25,
        loop: true
      }),
      credits: new Howl({
        src: [rodeOverTheDeep],
        preload: true,
        volume: 0.5,
      })
    }

  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resize)
  }

  componentDidMount = () => {
    this.bgm.start.play()
  }

  stopAllMusic = () => {
    for (let music in this.bgm) {
      this.bgm[music].stop()
    }
  }

  resize = () => {
    let svgHeight = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth * 9 / 16 : window.innerHeight
    let svgWidth = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth : window.innerHeight * 16 / 9
    this.setState({
      svgHeight: svgHeight,
      svgWidth: svgWidth,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      offset: (window.innerWidth - svgWidth) / 2
    })
  }

  selectEnemy = string => {
    this.stopAllMusic()
    this.bgm[string].play()
    this.setState({
      enemySelected: string,
      currentScene: string
    })
  }

  toggleMute = () => {
    this.setState(prevState => ({
      mute: !prevState.mute
    }))

    for (let music in this.bgm) {
      this.bgm[music].stop()
      this.bgm[music]._muted = !this.bgm[music]._muted
    }
    this.bgm.start.play()
  }



  sceneChange = string => {
    if (string === 'credits') {
      this.stopAllMusic()
      this.bgm.credits.play()
    }
    this.setState({
      currentScene: string
    })
  }

  setShowIntro = boolean => {
    this.setState({
      showIntro: boolean
    })
  }

  victory = (victoryData) => {
    let currentDate = new Date()
    this.cookies.set(victoryData.enemy.name, "vencido", { expires: new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0), path: '/' })
    this.stopAllMusic()
    this.setState({
      [victoryData.enemy.name]: false,
      enemySelected: "none",
      currentScene: 'victory',
      showIntro: true,
      victory: { ...victoryData }
    })
  }

  death = playerData => {
    this.setState({
      death: {
        x: playerData.body.position.x,
        y: playerData.body.position.y,
        width: playerData.width,
        height: playerData.height,
      }
    })
  }

  eraseCookies = () => {
    ["sakura", "blood", "nul", "vida", "ava"].forEach(key => this.cookies.remove(key))

    this.setState({
      sakura: true,
      blood: true,
      nul: true,
      vida: true,

    })
  }
  render() {
    const sceneProps = {
      svgHeight: this.state.svgHeight,
      svgWidth: this.state.svgWidth,
      innerHeight: this.state.innerHeight,
      innerWidth: this.state.innerWidth,
      offset: this.state.offset,
      playMode: this.state.playMode,
      sceneChange: this.sceneChange,
      showIntro: this.state.showIntro,
      enemySelected: this.state.enemySelected,
      death: this.death,
      setShowIntro: this.setShowIntro,
      selectEnemy: this.selectEnemy,
      victory: this.victory,
    }
    return (
      <div className="svg-container" >
        {this.state.currentScene === "start" &&
          <Start
            sceneChange={this.sceneChange}
            erase={this.eraseCookies}
            toggleMute={this.toggleMute}
            mute={this.state.mute}
          />}
        {this.state.currentScene === "controller" &&
          <Controller
            sceneChange={this.sceneChange}
          />}
        {this.state.currentScene === "credits" && <Credits sceneChange={this.sceneChange} />}
        {this.state.currentScene === "select" &&
          <Select
            blood={this.state.blood}
            sakura={this.state.sakura}
            vida={this.state.vida}
            nul={this.state.nul}
            selectEnemy={this.selectEnemy}
            enemySelected={this.state.enemySelected}
            sceneChange={this.sceneChange}
            bgm={this.bgm}
          />}
        {this.state.currentScene === "death" &&
          <Death
            x={this.state.death.x}
            y={this.state.death.y}
            width={this.state.death.width}
            height={this.state.death.height}
            sceneChange={this.sceneChange}
            setShowIntro={this.setShowIntro}
          />}
        {this.state.currentScene === "victory" &&
          <Victory
            setShowIntro={this.setShowIntro}
            selectEnemy={this.selectEnemy}
            sceneChange={this.sceneChange}
            victoryData={this.state.victory}
          />}

        {this.state.currentScene === "scene1" && <Scene1 {...sceneProps} />}
        {this.state.currentScene === "scene2" && <Scene2 {...sceneProps} />}
        {this.state.currentScene === 'scene3' && <Scene3 {...sceneProps} />}
        {this.state.currentScene === 'scene4' && <Scene4 {...sceneProps} />}
        {this.state.currentScene === 'scene5' && <Scene5 {...sceneProps} />}

      </div>
    )
  }
}


export default withCookies(App);
