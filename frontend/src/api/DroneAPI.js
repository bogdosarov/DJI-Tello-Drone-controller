import { fromEvent, merge } from 'rxjs'
import 'rxjs/add/operator/map'
import io from "socket.io-client";

import { SERVER_EVENTS_TYPES } from "constants/common";


class Drone {
  _server = io('http://localhost:3000')
  serverEvents$ = null
  droneEvents$ = null

  constructor() {
    const serverConnected$ = fromEvent(this._server, SERVER_EVENTS_TYPES.CONNECTED).map(data => ({ type: SERVER_EVENTS_TYPES.CONNECTED, data }))
    const serverDisconnected$ = fromEvent(this._server, SERVER_EVENTS_TYPES.DISCONNECTED).map(data => ({ type: SERVER_EVENTS_TYPES.DISCONNECTED, data }))
    const serverMessage$ = fromEvent(this._server, SERVER_EVENTS_TYPES.MESSAGE).map(data => ({ type: SERVER_EVENTS_TYPES.MESSAGE, data }))
    const droneMessage$ = fromEvent(this._server, SERVER_EVENTS_TYPES.DRONE_COMMAND_STATUS).map(data => ({ type: SERVER_EVENTS_TYPES.DRONE_COMMAND_STATUS, data }))
    const droneState$ = fromEvent(this._server, SERVER_EVENTS_TYPES.DRONE_STATE).map(data => ({ type: SERVER_EVENTS_TYPES.DRONE_STATE, data }))

    this.droneEvents$ = merge(droneMessage$, droneState$)
    this.serverEvents$ = merge(serverConnected$, serverDisconnected$, serverMessage$)
  }

  sendCommand(command) {
    this._server.emit('command', command)
  }
}

export const DroneAPI = new Drone()