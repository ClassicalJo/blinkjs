import React from 'react'
import nipplejs from "nipplejs"

class Touchscreen extends React.PureComponent {
    componentDidMount = () => {
        this.mountJoystick()
        window.addEventListener("resize", this.mountJoystick)
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.mountJoystick)
    }

    mountJoystick = () => {
        if (this.manager) {
            let joystick = this.manager.get()
            joystick.destroy()
            this.manager.destroy()
        }
        this.manager = nipplejs.create({
            zone: document.getElementById("zone"),
            position: {
                top: this.props.svgHeight * 7 / 8 + (this.props.svgHeight / -6) + "px",
                left: this.props.offset + this.props.svgWidth / 4 + (this.props.svgHeight / -6) + "px"
            },
            mode: "static",
            size: this.props.svgHeight / 3

        })
        this.manager.on("move", (evt, data) => {
            this.props.move(data.angle.degree)
        })

        this.manager.on("end", ()=> {
            this.props.move(-1)
        })

        document.querySelector("#buttonA").style.cssText = `
            height: ${this.props.svgHeight / 5}px; 
            width: ${this.props.svgHeight / 5}px;
            position: absolute; 
            top: ${this.props.svgHeight * 3 / 4 + ((this.props.svgHeight / 5) / -2)}px; 
            left: ${this.props.offset + this.props.svgWidth * 11 / 16 + ((this.props.svgHeight / 5) / -2)}px; 
            border: 3px solid rgba(255,255,255,0.3);
            background-color: transparent;
            border-radius: ${this.props.svgHeight / 5}px`

        document.querySelector("#buttonB").style.cssText = `
            height: ${this.props.svgHeight / 5}px; 
            width: ${this.props.svgHeight / 5}px;
            position: absolute; 
            top: ${this.props.svgHeight * 3 / 4 + ((this.props.svgHeight / 5) / -2)}px; 
            left: ${this.props.offset + this.props.svgWidth * 13 / 16 + ((this.props.svgHeight / 5) / -2)}px; 
            border: 3px solid rgba(255,255,255,0.3);
            background-color: transparent;
            border-radius: ${this.props.svgHeight / 5}px`

    }

    render() {
        return (
            <div className="zone-wrapper">
                <div id="zone"></div>
                <div id="buttonA" style={this.buttonA} onTouchStart={this.props.blink}></div>
                <div id="buttonB" style={this.buttonB} onTouchStart={this.props.shoot} onTouchMove={this.props.shoot}></div>
            </div>
        )
    }
}

export default Touchscreen
