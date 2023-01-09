import React from 'react'
import { Provider } from 'react-redux'
// import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'

import MyConnectedComponent from './redux.demo'

const mockStore = configureStore([])

describe('My Connected React-Redux Component', () => {
  let store
  let component

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    })

    component = render(
      <Provider store={store}>
        <MyConnectedComponent />
      </Provider>
    )
  })

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot()
  })

  it('should dispatch an action on button click', () => {})
})
