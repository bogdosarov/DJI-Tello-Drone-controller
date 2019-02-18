import {find} from "lodash";

import {DIRECTION_TYPE, DIRECTIONS} from "constants/directions";
import { DEFAULT_ROTATE_ANGLE, DEFAULT_SPEED } from "constants/common";

export const getCommandString = ({ leftRight = 0, forwardBackward = 0, upDown = 0, yaw = 0 }) =>
  `rc ${Math.floor(leftRight)} ${Math.floor(forwardBackward)} ${Math.floor(upDown)} ${Math.floor(yaw)}`

export const getDirectionsFromKeys = keys => {
  const directions = []

  keys.map(key => {
    const direction = find(DIRECTIONS, directionModel => directionModel.keyCodes.indexOf(key) >= 0)

    return direction && directions.push(direction.directionCode)
  })

  return directions
}

export const getDroneCommandFromDirections = directions => {
  let leftRight = 0
  let forwardBackward = 0
  let upDown = 0
  let yaw = 0

  if(directions.indexOf(DIRECTION_TYPE.LEFT) >= 0) {
    leftRight = -DEFAULT_SPEED
  }

  if(directions.indexOf(DIRECTION_TYPE.RIGHT) >= 0) {
    leftRight = DEFAULT_SPEED
  }
  if(directions.indexOf(DIRECTION_TYPE.FORWARD) >= 0) {
    forwardBackward = DEFAULT_SPEED
  }
  if(directions.indexOf(DIRECTION_TYPE.BACKWARD) >= 0) {
    forwardBackward = -DEFAULT_SPEED
  }
  if(directions.indexOf(DIRECTION_TYPE.UP) >= 0) {
    upDown = DEFAULT_SPEED
  }
  if(directions.indexOf(DIRECTION_TYPE.DOWN) >= 0) {
    upDown = -DEFAULT_SPEED
  }
  if(directions.indexOf(DIRECTION_TYPE.ROTATE_RIGHT) >= 0) {
    yaw = DEFAULT_ROTATE_ANGLE
  }
  if(directions.indexOf(DIRECTION_TYPE.ROTATE_LEFT) >= 0) {
    yaw = -DEFAULT_ROTATE_ANGLE
  }

  return getCommandString({ leftRight, forwardBackward, upDown, yaw })
}
