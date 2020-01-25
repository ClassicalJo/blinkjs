import React from 'react';
import Start from './scenes/Start'
import Scene1 from "./scenes/Scene1"
import Victory from "./scenes/Victory"
import "./assets/css/app.css"


class App extends React.Component {
  constructor(props) {
    super(props);
    let svgHeight = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth * 9 / 16 : window.innerHeight
    let svgWidth = window.innerHeight > window.innerWidth * 9 / 16 ? window.innerWidth : window.innerHeight * 16 / 9
    this.state = {
      currentScene: 'start',
      playMode: "keyboard",
      svgHeight: svgHeight,
      svgWidth: svgWidth,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      offset: (window.innerWidth - svgWidth) / 2
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

  keyboard = () => {
    this.setState({
      playMode: "keyboard",
      currentScene: "scene1"
    })
  }

  touchscreen = () => {
    this.setState({
      playMode: "touchscreen",
      currentScene: 'scene1'
    })
  }

  restart = () => {
    this.setState({
      currentScene: "start"
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
            svgHeight={this.state.svgHeight}
            svgWidth={this.state.svgWidth}
            innerHeight={this.state.innerHeight}
            innerWidth={this.state.innerWidth}
            offset={this.state.offset}
            keyboard={this.keyboard}
            touchscreen={this.touchscreen} />}
        {this.state.currentScene === "scene1" &&
          <Scene1
            svgHeight={this.state.svgHeight}
            svgWidth={this.state.svgWidth}
            innerHeight={this.state.innerHeight}
            innerWidth={this.state.innerWidth}
            offset={this.state.offset}
            playMode={this.state.playMode}
            victory={this.victory}
            restart={this.restart} />}
        {this.state.currentScene === "victory" && <Victory />}
      </div>
    )
  }
}


export default App;
