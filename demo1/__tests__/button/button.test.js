import React from 'react'
import { shallow, mount } from 'enzyme'
import Button from './Button'

describe('Button component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should handle click correctly', () => {
    const wrapper = mount(<Button />)
    wrapper.simulate('click')
    expect(wrapper.state('clicked')).toBe(true)
  })
})
