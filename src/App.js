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
import "./assets/css/app.css"
import Death from './scenes/Death';
import Touchscreen from './assets/svg/Touchscreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    let svgHeight = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth * 9 / 16 : window.innerHeight
    let svgWidth = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth : window.innerHeight * 16 / 9
    this.state = {
      // currentScene: 'start',
      currentScene: "start",
      enemySelected: "none",
      playMode: "keyboard",
      svgHeight: svgHeight,
      svgWidth: svgWidth,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      offset: (window.innerWidth - svgWidth) / 2,
      showIntro: true,
      sakura: true,
      blood: true,
      nul: true,
      vida: true,
      death: {
        x: 0,
        y: 0,
        width: 25,
        height: 25,
      }

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

  selectEnemy = string => {
    this.setState({
      enemySelected: string,
      currentScene: string
    })
  }


  sceneChange = string => {
    this.setState({
      currentScene: string
    })
  }

  setShowIntro = boolean => {
    this.setState({
      showIntro: boolean
    })
  }

  victory = boss => {
    this.setState({
      [boss]: false,
      enemySelected: "none",
      currentScene: 'victory',
      showIntro: true,
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
          />}
        {this.state.currentScene === "controller" &&
          <Controller
            sceneChange={this.sceneChange}
          />}
        {this.state.currentScene === "select" &&
          <Select
            blood={this.state.blood}
            sakura={this.state.sakura}
            vida={this.state.vida}
            nul={this.state.nul}
            selectEnemy={this.selectEnemy}
            enemySelected={this.state.enemySelected}
            sceneChange={this.sceneChange}
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


export default App;
