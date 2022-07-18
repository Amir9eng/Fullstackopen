import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducers';
import { initializeAllUsers } from '../reducers/userReducer';


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const onSubmitHandleLogin = (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    dispatch(initializeAllUsers())
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={onSubmitHandleLogin}>
      <div>
        username
        <input
          type="text"
          name="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm