import axios from 'axios'

const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
})

const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  user,
})

const loginError = (error) => ({
  type: 'LOGIN_ERROR',
  error,
})

const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
})

const signupRequest = () => ({
  type: 'SIGNUP_REQUEST',
})

const signupSuccess = (user) => ({
  type: 'SIGNUP_SUCCESS',
  user,
})

const signupError = (error) => ({
  type: 'SIGNUP_ERROR',
  error,
})

const login = (username, password) => {
  return (dispatch) => {
    dispatch(loginRequest())

    return Promise.resolve(
      dispatch(
        loginSuccess({
          username,
          token: '12345',
        })
      )
    )

    /* return axios
      .post('/login', { username, password })
      .then((response) => dispatch(loginSuccess(response.data)))
      .catch((error) => dispatch(loginError(error))) */
  }
}

const logout = () => {
  return (dispatch) => {
    return Promise.resolve(dispatch(logoutSuccess()))
    /* return axios
      .post('/logout')
      .then(() => dispatch(logoutSuccess()))
      .catch((error) => dispatch(loginError(error))) */
  }
}

const signup = (username, password, email) => {
  return (dispatch) => {
    dispatch(signupRequest())

    return Promise.resolve(
      dispatch(
        signupSuccess({
          username,
        })
      )
    )
    return axios
      .post('/signup', { username, password, email })
      .then((response) => dispatch(signupSuccess(response.data)))
      .catch((error) => dispatch(signupError(error)))
  }
}

export {
  loginRequest,
  loginSuccess,
  loginError,
  logoutSuccess,
  signupRequest,
  signupSuccess,
  signupError,
  login,
  logout,
  signup,
}
