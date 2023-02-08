import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import './NotFound.scss'

function NotFound ({ error = '404' }){
  return (
    <div className="not-found">
      <span className="dsl-w36 text-400 mb-3 z1">Tune-up underway.</span>
      <span className="dsl-w18 text-200 mb-5 z1">
        This page will be improved and back on the track soon.
      </span>
      <Button className="ds-btn go-back z1">
        GO BACK
      </Button>
      <span className="dsl-w12 text-200 text-center error-code z1">error code: {error}</span>
    </div>
  )
}

NotFound.propTypes = {
  description: PropTypes.string,
}

NotFound.defaultProps = {
  description: 'X-Gen Marketplace',
}

export default memo(NotFound)
