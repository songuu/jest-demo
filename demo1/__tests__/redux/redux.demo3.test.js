import {
  requestData,
  receiveDataSuccess,
  receiveDataError,
  fetchData,
} from './actions1'
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

  it('creates REQUEST_DATA, RECEIVE_DATA_SUCCESS when fetching data has been done', () => {
    const payload = [
      { id: 1, title: 'Title 1' },
      { id: 2, title: 'Title 2' },
    ]
    axios.mockResolvedValue({ data: payload })

    const expectedActions = [requestData(), receiveDataSuccess(payload)]
    const store = mockStore({ data: [] })

    return store.dispatch(fetchData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates REQUEST_DATA, RECEIVE_DATA_ERROR when fetching data has failed', () => {
    const error = 'Error'
    axios.mockRejectedValue(error)

    const expectedActions = [requestData(), receiveDataError(error)]
    const store = mockStore({ data: [] })

    return store.dispatch(fetchData()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
