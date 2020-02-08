import React from 'react';
import Controller from './scenes/Controller'
import Start from "./scenes/Start"
import Select from './scenes/Select'
import Scene1 from "./scenes/Scene1"
import Scene2 from './scenes/Scene2'
import Victory from "./scenes/Victory"
import "./assets/css/app.css"




class App extends React.Component {
  constructor(props) {
    super(props);
    let svgHeight = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth * 9 / 16 : window.innerHeight
    let svgWidth = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth : window.innerHeight * 16 / 9
    this.state = {
      currentScene: 'start',
      enemySelected: false,
      playMode: "keyboard",
      svgHeight: svgHeight,
      svgWidth: svgWidth,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      offset: (window.innerWidth - svgWidth) / 2,
      showIntro: true,
      sakura: true,
      blood: true,
      nul: false,
      vida: false,
    }
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.resize)
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resize)
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

  selectEnemy = (string) => {
    this.setState({
      enemySelected: string
    })
    this.game()
  }
  game = () => {
    this.setState((prevState) => ({
      currentScene: prevState.enemySelected
    }))
  }
  controller = () => {
    this.setState({
      currentScene: "controller"
    })
  }

  keyboard = () => {
    this.setState({
      playMode: "keyboard",
      currentScene: "start"
    })
  }

  touchscreen = () => {
    this.setState({
      playMode: "touchscreen",
      currentScene: 'start'
    })
  }

  start = () => {
    this.setState({
      currentScene: "select"
    })

  }
  restart = () => {
    this.setState({
      showIntro: false,
      currentScene: "select"
    })
  }

  victory = () => {
    this.setState({
      currentScene: 'victory'
    })
  }
  render() {
    return (
      <div className="svg-container" >
        {this.state.currentScene === "start" &&
          <Start
            start={this.start}
            controller={this.controller}
          />}
        {this.state.currentScene === "controller" &&
          <Controller
            keyboard={this.keyboard}
            touchscreen={this.touchscreen} />}
        {this.state.currentScene === "select" &&
          <Select
            blood={this.state.blood}
            sakura={this.state.sakura}
            vida={this.state.vida}
            nul={this.state.nul}
            enemySelected={this.state.enemySelected}
            select={this.selectEnemy}
          >
          </Select>}
        {this.state.currentScene === "scene1" &&
          <Scene1
            svgHeight={this.state.svgHeight}
            svgWidth={this.state.svgWidth}
            innerHeight={this.state.innerHeight}
            innerWidth={this.state.innerWidth}
            offset={this.state.offset}
            playMode={this.state.playMode}
            victory={this.victory}
            restart={this.restart}
            showIntro={this.state.showIntro} />}
        {this.state.currentScene === "scene2" &&
          <Scene2
            svgHeight={this.state.svgHeight}
            svgWidth={this.state.svgWidth}
            innerHeight={this.state.innerHeight}
            innerWidth={this.state.innerWidth}
            offset={this.state.offset}
            playMode={this.state.playMode}
            victory={this.victory}
            restart={this.restart}
            showIntro={this.state.showIntro} />}
        {this.state.currentScene === "victory" && <Victory />}
      </div>
    )
  }
}


export default App;
