import { createSlice } from '@reduxjs/toolkit'

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

export { dataSlice }

export default dataSlice.reducer
