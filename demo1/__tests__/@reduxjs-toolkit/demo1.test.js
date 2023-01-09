import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import axios from 'axios'
import dataSlice, {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataError,
  updateDataRequest,
  updateDataSuccess,
  updateDataError,
  fetchData,
  updateData,
} from './slice'

jest.mock('axios')

const middlewares = [thunk]
const mockStore = configureStore({
  reducer: {
    data: dataSlice,
  },
  middleware: middlewares,
})

console.log('mockStore', mockStore)

describe('async action creators', () => {
  afterEach(() => {
    axios.mockClear()
  })

  it('creates FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS when fetching data has been done', () => {
    const payload = [
      { id: 1, title: 'Title 1' },
      { id: 2, title: 'Title 2' },
    ]
    axios.mockResolvedValue({ data: payload })
    const expectedActions = [fetchDataRequest(), fetchDataSuccess(payload)]
    // const store = mockStore({ data: {} })

    return mockStore.dispatch(fetchData()).then(() => {
      // expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates FETCH_DATA_REQUEST, FETCH_DATA_ERROR when fetching data has failed', () => {
    const error = 'Error'
    axios.mockRejectedValue(error)
    const expectedActions = [fetchDataRequest(), fetchDataError(error)]
    const store = mockStore({ data: {} })

    return store.dispatch(fetchData()).catch(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates UPDATE_DATA_REQUEST, UPDATE_DATA_SUCCESS when updating data has been done', () => {
    const payload = { id: 1, title: 'Title 1 updated' }
    axios.mockResolvedValue({ data: payload })
    const expectedActions = [updateDataRequest(), updateDataSuccess(payload)]
    const store = mockStore({ data: {} })

    return store
      .dispatch(updateData({ id: 1, title: 'Title 1 updated' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('creates UPDATE_DATA_REQUEST, UPDATE_DATA_ERROR when updating data has failed', () => {
    const error = 'Error'
    axios.mockRejectedValue(error)
    const expectedActions = [updateDataRequest(), updateDataError(error)]
    const store = mockStore({ data: {} })

    return store
      .dispatch(updateData({ id: 1, title: 'Title 1 updated' }))
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
