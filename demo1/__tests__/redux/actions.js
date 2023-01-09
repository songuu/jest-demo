export const fetchData = () => {
  return {
    type: 'FETCH_DATA',
  }
}

export const fetchDataSuccess = (data) => {
  return { type: 'FETCH_DATA_SUCCESS', payload: data }
}

export const fetchDataError = (error) => {
  return {
    type: 'FETCH_DATA_ERROR',
    payload: error,
  }
}

export const getUsersRequest = () => {
  return {
    type: 'GET_USERS_REQUEST',
  }
}
