import RegisterForm, { users } from '../registerForm'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// 定义测试用例
describe('RegisterForm', () => {
  it('should allow users to register', () => {
    // 使用 Jest 的 render 函数来渲染组件，并获取渲染结果
    const { getByLabelText, getByText } = render(<RegisterForm />)

    // 使用 Jest 的 fireEvent 函数来模拟用户输入
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'John Doe' } })
    fireEvent.change(getByLabelText('Email:'), {
      target: { value: 'john@doe.com' },
    })
    fireEvent.change(getByLabelText('Password:'), {
      target: { value: 'password' },
    })

    // 使用 Jest 的 fireEvent 函数来模拟用户提交表单
    fireEvent.submit(getByText('Sign Up'))

    // 使用 Jest 的 expect 函数来断言 users 数组是否包含了新用户信息
    expect(users).toContainEqual({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password',
    })
  })

  it('should show an error message if the email is already registered', () => {
    // 使用 Jest 的 render 函数来渲染组件，并获取渲染结果
    const { getByLabelText, getByText } = render(<RegisterForm />)

    // 使用 Jest 的 fireEvent 函数来模拟用户输入
    fireEvent.change(getByLabelText('Name:'), { target: { value: 'John Doe' } })
    fireEvent.change(getByLabelText('Email:'), {
      target: { value: 'john@doe.com' },
    })
    fireEvent.change(getByLabelText('Password:'), {
      target: { value: 'password' },
    })

    // 使用 Jest 的 fireEvent 函数来模拟用户提交表单
    fireEvent.submit(getByText('Sign Up'))

    // 使用 Jest 的 expect 函数来断言是否出现了错误信息
    expect(
      getByText('The given email is already registered.')
    ).toBeInTheDocument()
  })
})
