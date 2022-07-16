import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './../reducers/blogReducer';
import { useHistory } from 'react-router';
import { login } from '../reducers/authReducers';


const LoginForm = () => {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmitHandleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ""
    event.target.password.value = ""
    dispatch(login(username, password))
    dispatch(initializeBlogs())
    history.push('/blogs')
    // setUsername('')
    // setPassword('')
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