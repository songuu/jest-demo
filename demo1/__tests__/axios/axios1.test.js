import { shallow, mount } from 'enzyme'

import React from 'react'

import axios from './axios' // 封装后的 axios 库

const UserList = (props) => {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    axios
      .get('/api/users', {
        params: {
          name: props.name,
        },
      })
      .then((response) => {
        setUsers(response.data)
      })
  }, [props.name])

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

const UserSearch = (props) => {
  const [name, setName] = React.useState('')

  const handleSearch = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <input type="text" onChange={handleSearch} />
      <UserList name={name} />
    </div>
  )
}

describe('UserSearch', () => {
  it('should render user search correctly', () => {
    const name = 'John Doe'
    const mockFn = jest.spyOn(axios, 'get')
    mockFn.mockResolvedValueOnce({
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
    })
    const wrapper = shallow(<UserSearch />)
    const input = wrapper.find('input')
    input.simulate('change', { target: { value: name } })
    expect(wrapper).toMatchSnapshot()
    expect(mockFn).toBeCalledWith('/api/users', {
      params: {
        name: name,
      },
    })
  })
})
