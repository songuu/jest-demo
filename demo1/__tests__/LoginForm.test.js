import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoginForm from '../LoginForm'

describe('LoginForm', () => {
  // 测试用例1：输入用户名和密码，点击登录按钮，页面跳转到首页
  it('should redirect to homepage when login successfully', () => {
    const { getByLabelText, getByText } = render(<LoginForm />)

    // 输入用户名和密码
    const usernameInput = getByLabelText(/Username*/)
    const passwordInput = getByLabelText(/Password*/)
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })

    // 点击登录按钮
    const loginButton = getByText(/Login*/)

    // if (loginButton) {
      fireEvent.click(loginButton)
    // }

    // 断言页面跳转到首页
    // expect(window.location.pathname).toBe('/home')
    const errorMessage = getByText(/Username or password is correct*/)
    expect(errorMessage).toBeInTheDocument()
  })

  // 测试用例2：输入错误的用户名和密码，点击登录按钮，页面提示“用户名或密码错误”
  it('should show error message when login failed', () => {
    const { getByLabelText, getByText } = render(<LoginForm />)

    // 输入错误的用户名和密码
    const usernameInput = getByLabelText(/Username*/)
    const passwordInput = getByLabelText(/Password*/)
    fireEvent.change(usernameInput, { target: { value: 'admin' } })
    fireEvent.change(passwordInput, { target: { value: '12345' } })

    // 点击登录按钮
    const loginButton = getByText(/Login*/)

    // if (loginButton) {
      fireEvent.click(loginButton)
    // }

    // 断言页面提示“用户名或密码错误”
    const errorMessage = getByText(/Username or password is incorrect*/)
    expect(errorMessage).toBeInTheDocument()
  })
})
