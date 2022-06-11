import React, { useState, useImperativeHandle } from 'react'
import { PropTypes } from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleWhenVisible = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleWhenVisible
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
      <button onClick={toggleWhenVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
      {props.children}
      <button onClick={toggleWhenVisible}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
