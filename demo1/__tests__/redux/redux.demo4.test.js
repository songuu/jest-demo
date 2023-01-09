import {
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
} from './actions2'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('async action creators', () => {
  afterEach(() => {
    axios.mockClear()
  })

  it('creates LOGIN_REQUEST, LOGIN_SUCCESS when login has been done', async () => {
    const payload = { username: 'testuser', token: '12345' }
    axios.mockResolvedValue({ data: payload })

    const expectedActions = [loginRequest(), loginSuccess(payload)]
    const store = mockStore({})

    await store.dispatch(login('testuser', 'password'))

    const actions = store.getActions()

    console.log('actions: ', actions)

    expect(store.getActions()).toEqual(expectedActions)
    /* return store.dispatch(login('testuser', 'password')).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    }) */
  })

  it('creates LOGIN_REQUEST, LOGIN_ERROR when login has failed', () => {
    const error = 'Error'
    axios.mockRejectedValue(error)

    const expectedActions = [loginRequest(), loginError(error)]
    const store = mockStore({})

    return store.dispatch(login('testuser', 'password')).catch(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates LOGOUT_SUCCESS when logout has been done', () => {
    const expectedActions = [logoutSuccess()]
    const store = mockStore({})

    return store.dispatch(logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates SIGNUP_REQUEST, SIGNUP_SUCCESS when signup has been done', () => {
    const payload = { username: 'testuser' }
    axios.mockResolvedValue({ data: payload })

    const expectedActions = [signupRequest(), signupSuccess(payload)]
    const store = mockStore({})

    return store
      .dispatch(signup('testuser', 'password', 'email@example.com'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates SIGNUP_REQUEST, SIGNUP_ERROR when signup has failed', () => {
    const error = 'Error'
    axios.mockRejectedValue(error)

    const expectedActions = [signupRequest(), signupError(error)]
    const store = mockStore({})

    return store
      .dispatch(signup('testuser', 'password', 'email@example.com'))
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
