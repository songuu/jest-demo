const requestData = () => ({
  type: 'REQUEST_DATA',
})

const receiveDataSuccess = (data) => ({
  type: 'RECEIVE_DATA_SUCCESS',
  data,
})

const receiveDataError = (error) => ({
  type: 'RECEIVE_DATA_ERROR',
  error,
})

const fetchData = () => {
  return (dispatch) => {
    dispatch(requestData())
    return axios
      .get('/some/api/endpoint')
      .then((response) => dispatch(receiveDataSuccess(response.data)))
      .catch((error) => dispatch(receiveDataError(error)))
  }
}
