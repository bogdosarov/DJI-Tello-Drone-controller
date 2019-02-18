import React from 'react'
import PropTypes from 'prop-types'

export const ServerStatus = ({ isServerOnline }) => (<div>
  <div>Server: { isServerOnline ? 'online' : 'offline' } </div>
</div>)

ServerStatus.propTypes = {
  isServerOnline: PropTypes.bool.isRequired,
}