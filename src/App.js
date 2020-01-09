import React from 'react';
import Start from './scenes/Start'
import Scene1 from "./scenes/Scene1"
import Victory from "./scenes/Victory"
import "./assets/css/app.css"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScene: 'start',
      playMode: "keyboard",
    }

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

  victory = () => {
    this.setState({
      currentScene: 'victory'
    })
  }
  render() {
    return (
      <div className="svg-container" >
        <svg viewBox="-1000 -500 2000 1000" preserveAspectRatio="xMidYMid meet">

          <rect
            fill="black"
            width="100%"
            height="100%"
            x="-1000"
            y="-500"
          />
          {this.state.currentScene === "start" && <Start keyboard={this.keyboard} touchscreen={this.touchscreen} />}
          {this.state.currentScene === "scene1" && <Scene1 playMode={this.state.playMode} victory={this.victory}/>}
          {this.state.currentScene === "victory" && <Victory />}
          <rect
            fill="transparent"
            stroke="blue"
            width="100%"
            height="100%"
            x="-1000"
            y="-500"
            strokeWidth="25"
            pointerEvents="none" />

        </svg>
      </div>
    )
  }
}


export default App;
