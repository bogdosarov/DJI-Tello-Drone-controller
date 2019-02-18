import React, { Component } from 'react'
import { find } from 'lodash'

import { DroneAPI } from "api/DroneAPI";
import { allowedKeys } from "constants/common";
import { getDirectionsFromKeys, getDroneCommandFromDirections, getCommandString } from "helpers/directions";

import styles from './Controller.module.css'

export class Controller extends Component {
  commandLoopInterval = null

  constructor(props) {
    super(props)

    this.state = {
      activeCommand: getCommandString({}),
      activeKeys: []
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.startCommandLoop = this.startCommandLoop.bind(this)

    this.startCommandLoop()
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  handleComponentDidUnmount(){
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    clearInterval(this.commandLoopInterval)
  }

  startCommandLoop() {
    this.commandLoopInterval = setInterval(() => {
      DroneAPI.sendCommand(this.state.activeCommand)
    }, 10)
  }

  handleKeyDown({ keyCode }) {
    if(allowedKeys.indexOf(keyCode) < 0 || this.state.activeKeys.indexOf(keyCode) >= 0) return false


    this.setState(({ activeKeys }) => {
      return {
        activeKeys: [keyCode],
        activeCommand: getDroneCommandFromDirections(getDirectionsFromKeys([...activeKeys, keyCode]))
      }
    })
  }

  handleKeyUp ({ keyCode }) {
    if(allowedKeys.indexOf(keyCode) < 0) return false

    if(this.state.activeKeys.indexOf(keyCode) >= 0) {
      const updatedActiveKeys = this.state.activeKeys.filter(code => code !== keyCode)

      this.setState({
        activeKeys: updatedActiveKeys,
        activeCommand: getDroneCommandFromDirections(getDirectionsFromKeys(updatedActiveKeys))
      })
    }
  }

  handleTakeOff() {
    DroneAPI.sendCommand('takeoff')
  }

  handleLand() {
    DroneAPI.sendCommand('land')
  }

  render() {
    return (<div className={styles.controller}>
      <div className={styles.direction}>
        <div>
          <button onClick={this.handleLand}>Land</button> <button onClick={this.handleTakeOff}>TakeOff</button>
        </div>
        command: {this.state.activeCommand}
      </div>
    </div>)
  }
}