import React from 'react'
import classNames from 'class-names'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faAngleDoubleUp,
  faAngleDoubleDown,
  faPlaneDeparture,
  faPlaneArrival,
} from "@fortawesome/free-solid-svg-icons";

import { DroneAPI } from "api/DroneAPI";

import styles from './MovementController.module.css'

export const MovementController = () => (
  <div className={styles.controlsWrapper}>
    <div onClick={() => DroneAPI.sendCommand('forward 20')}  className={classNames(styles.control, styles.up)}><FontAwesomeIcon icon={faAngleDoubleUp}/></div>
    <div onClick={() => DroneAPI.sendCommand('back 20')} className={classNames(styles.control, styles.down)}><FontAwesomeIcon icon={faAngleDoubleDown}/></div>
    <div onClick={() => DroneAPI.sendCommand('left 20')}  className={classNames(styles.control, styles.left)}><FontAwesomeIcon icon={faAngleDoubleLeft}/></div>
    <div onClick={() => DroneAPI.sendCommand('right 20')}  className={classNames(styles.control, styles.right)}><FontAwesomeIcon icon={faAngleDoubleRight}/></div>
    <div
      onClick={() => DroneAPI.sendCommand('takeoff')}
      className={classNames(styles.control, styles.takeoff)}
    >
      <FontAwesomeIcon icon={faPlaneDeparture}/>
    </div>
    <div onClick={() => DroneAPI.sendCommand('land')} className={classNames(styles.control, styles.lend)}><FontAwesomeIcon icon={faPlaneArrival}/></div>
  </div>
)