import React from 'react'
import { PropTypes } from 'prop-types'


const LoginForm = (props) => {
  // console.log(props.username)
  return(
  <form onSubmit={props.handleLogin} autoComplete='false'>
  <h1>Please Log In </h1>
  <label>
      <p>Username</p>
      <input type="text"
      id='username'
      value={props.username}
      name='Username'
      onChange={({ target }) => props.setUsername(target.value)} autoComplete='none' />
    </label>
    <label>
      <p>Password</p>
      <input type="password" id='password'  value={props.password}
      name='Password'
      onChange={({ target }) => props.setPassword(target.value)}   autoComplete='none' />
    </label>
    <button type='submit' id='login-button'> login </button>
</form>)
}

LoginForm.propTypes= {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm
