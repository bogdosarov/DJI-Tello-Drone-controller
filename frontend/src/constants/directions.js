export const DIRECTION_TYPE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD',
  ROTATE_LEFT: 'ROTATE_LEFT',
  ROTATE_RIGHT: 'ROTATE_RIGHT',
  UP: 'UP',
  DOWN: 'DOWN',
  WAIT: 'WAIT',
}

export const DIRECTIONS = {
  [DIRECTION_TYPE.FORWARD]: {
    directionCode: DIRECTION_TYPE.FORWARD,
    keyCodes: [38, 87],
  },
  [DIRECTION_TYPE.BACKWARD]: {
    directionCode: DIRECTION_TYPE.BACKWARD,
    keyCodes: [40, 83],
  },
  [DIRECTION_TYPE.LEFT]: {
    directionCode: DIRECTION_TYPE.LEFT,
    keyCodes: [37, 65],
  },
  [DIRECTION_TYPE.RIGHT]: {
    directionCode: DIRECTION_TYPE.RIGHT,
    keyCodes: [39, 68],
  },
  [DIRECTION_TYPE.ROTATE_LEFT]: {
    directionCode: DIRECTION_TYPE.ROTATE_LEFT,
    keyCodes: [81],
  },
  [DIRECTION_TYPE.ROTATE_RIGHT]: {
    directionCode: DIRECTION_TYPE.ROTATE_RIGHT,
    keyCodes: [69],
  },
  [DIRECTION_TYPE.UP]: {
    directionCode: DIRECTION_TYPE.UP,
    keyCodes: [32],
  },
  [DIRECTION_TYPE.DOWN]: {
    directionCode: DIRECTION_TYPE.DOWN,
    keyCodes: [16],
  },
}