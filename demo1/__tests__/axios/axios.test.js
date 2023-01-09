import React from 'react'
import axios from 'axios'
import { shallow, mount } from 'enzyme'

jest.mock('axios')

const response = {
  code: '000000',
  msg: 'ok',
  data: {},
}
// axios.get.mockResolvedValue(response)

it('axios fetch', () => {
  const res = axios.get.mockResolvedValue(response)

  // expect(res).toEqual(response)
  // expect(fn).toHaveBeenCalled()
})

const makeRequest = () => axios.get('/')

test('should make request correctly', () => {
  const mockFn = jest.fn()
  axios.get.mockImplementationOnce(mockFn)
  makeRequest()
  expect(mockFn).toBeCalledWith('/')
})

test('get user info', async () => {
  const mockFn = jest.fn()
  axios.get = mockFn
  mockFn.mockResolvedValue({
    data: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  })
  const user = await getUser(1)
  expect(user.id).toBe(1)
  expect(user.name).toBe('John Doe')
  expect(user.email).toBe('john.doe@example.com')
})

const UserList = (props) => {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    axios.get('/api/users').then((response) => {
      setUsers(response.data)
    })
  }, [])

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

describe('UserList', () => {
  it('should render user list correctly', () => {
    const mockFn = jest.fn()
    axios.get = mockFn
    mockFn.mockResolvedValue({
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
    })
    const wrapper = shallow(<UserList />)
    expect(wrapper).toMatchSnapshot()
  })
})

import axios1 from './axios' // 封装后的 axios 库

const UserList1 = (props) => {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    axios1.get('/api/users').then((response) => {
      setUsers(response.data)
    })
  }, [])

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

describe('UserList1', () => {
  it('should render user list correctly', () => {
    const mockFn = jest.spyOn(axios, 'get')
    mockFn.mockResolvedValue({
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
    })
    const wrapper = shallow(<UserList1 />)
    expect(wrapper).toMatchSnapshot()
    expect(mockFn).toBeCalledWith('/api/users')
  })
})

const UserList2 = (props) => {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    axios1
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

describe('UserList', () => {
  it('should render user list correctly', () => {
    const name = 'John Doe'
    const mockFn = jest.spyOn(axios, 'get')
    mockFn.mockResolvedValue({
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
    })
    const wrapper = shallow(<UserList2 name={name} />)
    expect(wrapper).toMatchSnapshot()
    expect(mockFn).toBeCalledWith('/api/users', {
      params: {
        name: name,
      },
    })
  })
})

const UserList3 = (props) => {
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
      <UserList3 name={name} />
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
        { id: 2, name: 'Jane Doe' }
      ]
    })
    const wrapper = shallow(<UserSearch />)
    const input = wrapper.find('input')
    input.simulate('change', { target: { value: name } })
    expect(wrapper).toMatchSnapshot()
    expect(mockFn).toBeCalledWith('/api/users', {
      params: {
        name: name
      }
    })
  })
})