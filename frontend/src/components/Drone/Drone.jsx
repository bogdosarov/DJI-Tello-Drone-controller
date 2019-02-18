import React, { Fragment } from 'react'
import PropTypes from 'react-proptypes'


export const Drone = ({ battery = 0 }) => (
  <Fragment>
    <div>
      <b>Battery:</b>
      <br />
      <progress value={battery} max={100} />
    </div>
  </Fragment>
)

Drone.propTypes = {
  battery: PropTypes.number,
}