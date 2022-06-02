import React from 'react'

const LoginForm = ({username, setPassword, setUsername, password, handleLogin}) => (
  <form onSubmit={handleLogin} autoComplete='false'>
    <h1>Please Log In </h1>
    <label>

        <p>Username</p>
        <input type="text" 
        value={username}
        name='Username'
        onChange={({ target }) => setUsername(target.value)} autoComplete='none' />
      </label>
      <label>
        <p>Password</p>
        <input type="password" value={password}
        name='Password'
        onChange={({ target }) => setPassword(target.value)}   autoComplete='none' />
      </label>
      <button type='submit'> login </button>
  </form>
)

export default LoginForm
