import React from 'react'


const LoginForm = (props) => {
  console.log(props.username)
  return(
  <form onSubmit={props.handleLogin} autoComplete='false'>
  <h1>Please Log In </h1>
  <label>
      <p>Username</p>
      <input type="text" 
      value={props.username}
      name='Username'
      onChange={({ target }) => props.setUsername(target.value)} autoComplete='none' />
    </label>
    <label>
      <p>Password</p>
      <input type="password" value={props.password}
      name='Password'
      onChange={({ target }) => props.setPassword(target.value)}   autoComplete='none' />
    </label>
    <button type='submit'> login </button>
</form>)
}
 


export default LoginForm
