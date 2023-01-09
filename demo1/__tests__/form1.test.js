import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'

const Form = () => {
  const [name, setName] = React.useState('')
  const handleChange = (event) => {
    setName(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <form data-testid="form" onSubmit={handleSubmit}>
      <input data-testid="input" value={name} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  )
}

test('form should submit correctly', () => {
  const handleSubmit = jest.fn()
  const { getByTestId } = render(<Form handleSubmit={handleSubmit} />)
  const form = getByTestId('form')
  const input = getByTestId('input')
  fireEvent.change(input, { target: { value: 'John Doe' } })
  fireEvent.submit(form)
  expect(input.value).toBe('John Doe')
  expect(handleSubmit).toBeCalled()
})
