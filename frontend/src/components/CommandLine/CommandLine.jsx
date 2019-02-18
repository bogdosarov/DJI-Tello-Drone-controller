import React, { useState, useCallback } from 'react'

import { DroneAPI } from "api/DroneAPI";

import styles from './CommandLine.module.css'

export const CommandLine = () => {
  const [commandLine, setCommandLine] = useState('')
  const handleInputChange = useCallback(event => {
    setCommandLine(event.currentTarget.value)
  })


  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" onChange={handleInputChange} value={commandLine} placeholder="Enter command" />
      <button className={styles.button} onClick={() => DroneAPI.sendCommand(commandLine)}>Send</button>
    </div>
  )
}