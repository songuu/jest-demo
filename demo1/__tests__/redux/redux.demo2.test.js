import {
  fetchData,
  fetchDataError,
  fetchDataSuccess,
  getUsersRequest,
} from './actions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

export const GetUsers = () => (dispatch) => {
  dispatch(getUsersRequest())
}

describe('async action creators', () => {
  afterEach(() => {
    axios.mockClear()
  })

  it('creates FETCH_DATA_SUCCESS when fetching data has been done', async () => {
    const payload = [
      { id: 1, title: 'Title 1' },
      { id: 2, title: 'Title 2' },
    ]
    axios.mockResolvedValue({ data: payload })

    const expectedActions = [fetchData(), fetchDataSuccess(payload)]
    const store = mockStore({ data: [] })

    await store.dispatch(fetchData())

    await store.dispatch(fetchDataSuccess(payload))

    // const actions = store.getActions()

    // expect(actions[0].type).toEqual('FETCH_DATA_SUCCESS')
    // expect(actions[0].payload).toEqual(payload)

    expect(store.getActions()).toEqual(expectedActions);
  })

  it('creates FETCH_DATA_ERROR when fetching data has failed', () => {
    const error = 'Error'
    axios.mockRejectedValue(error)

    const expectedActions = [fetchData(), fetchDataError(error)]
    const store = mockStore({ data: [] })

    return store.dispatch(fetchData()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  test('should create an action to get Users List', async () => {
    const data = {
      data: [
        { name: 'JsMount', email: 'info@jsmount.com' },
        { name: 'web', email: 'technical@gmail.com' },
      ],
    }
    const store = mockStore()

    axios.get.mockImplementationOnce(() => Promise.resolve(data))
    await store.dispatch(GetUsers())
    const actions = store.getActions()
    // console.log('actions :', actions);
    expect(actions[0].type).toEqual('GET_USERS_REQUEST')
    // expect(actions[1].payload).toEqual(data.data)
  })
})
