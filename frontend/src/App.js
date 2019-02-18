import React, { useState, useEffect } from 'react';

import { SERVER_EVENTS_TYPES } from "constants/common";
import { DroneAPI } from "api/DroneAPI";
import { ServerStatus } from "components/Status/Status";
import { Drone } from "components/Drone/Drone";
import { Controller } from "components/Controller/Controller";

const handleServerEvent = ({ setIsServerOnline, data }) => {
  if(data.type === SERVER_EVENTS_TYPES.CONNECTED || data.type === SERVER_EVENTS_TYPES.MESSAGE) {
    setIsServerOnline(true)
  }

  if(data.type === SERVER_EVENTS_TYPES.DISCONNECTED) {
    setIsServerOnline(false)
  }
}

const handleDroneEvent = ({ setIsDroneOnline, data }) => {console.log(data)}

export const App = () => {
  const [ isServerOnline, setIsServerOnline ] = useState(false)

  useEffect(() => {
    DroneAPI.serverEvents$.subscribe(data => handleServerEvent({ setIsServerOnline, data }))
  }, [])

  return ( <div className="App">
    <Drone />
    <ServerStatus isServerOnline={isServerOnline} />
    <Controller />
  </div>)
}
