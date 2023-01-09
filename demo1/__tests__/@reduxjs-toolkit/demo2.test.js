import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

jest.mock('axios')

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataRequest(state) {
      state.loading = true
      state.error = null
    },
    fetchDataSuccess(state, action) {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    fetchDataError(state, action) {
      state.loading = false
      state.error = action.payload
    },
    updateDataRequest(state) {
      state.loading = true
      state.error = null
    },
    updateDataSuccess(state, action) {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      )
      state.data[index] = action.payload
      state.loading = false
      state.error = null
    },
    updateDataError(state, action) {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataError,
  updateDataRequest,
  updateDataSuccess,
  updateDataError,
} = dataSlice.actions

const allData = [
  { id: 1, title: 'Title 1' },
  { id: 2, title: 'Title 2' },
]

export const fetchData = () => async (dispatch) => {
  try {
    dispatch(fetchDataRequest())
    // const response = await axios.get('http://example.com/data')
    return Promise.resolve(dispatch(fetchDataSuccess(allData)))
  } catch (error) {
    dispatch(fetchDataError(error))
  }
}

export const updateData = (data) => async (dispatch) => {
  try {
    dispatch(updateDataRequest())
    /* const response = await axios.patch(
      `http://example.com/data/${data.id}`,
      data
    ) */
    return Promise.resolve(dispatch(updateDataSuccess(data)))
  } catch (error) {
    dispatch(updateDataError(error))
  }
}

const middlewares = [thunk]
const mockStore = createMockStore(middlewares)

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
    const store = mockStore({ data: {} })

    return store.dispatch(fetchData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
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
