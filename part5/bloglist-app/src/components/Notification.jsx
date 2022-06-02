import React from 'react'

const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border__style: 'solid',
  border__radius: 5,
  padding: 10,
  margin_bottom: 10
}

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border__style: 'solid',
  border__radius: 5,
  padding: 10,
  margin_bottom: 10
}

const Notification = ({errorMessage, successMessage}) => {
  if (successMessage === null && errorMessage === null) {
    return null
  } else if (successMessage){
    return (
      <div style={success}>
        {successMessage}
      </div>
    )
  } else
  return (
    <div style={error}>
      {errorMessage}
    </div>
  )
}

export default Notification
