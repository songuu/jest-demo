import { useState } from 'react'

const LoginForm = () => {
  // 定义登录表单的用户名和密码字段
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // 定义登录失败时页面提示信息
  const [errorMessage, setErrorMessage] = useState('')

  // 登录方法
  const handleLogin = () => {
    // 模拟调用后端接口验证用户名和密码是否正确
    if (username === 'admin' && password === '123456') {
      // 登录成功，跳转到首页
      // window.location.pathname = '/home'
      // console.log("登录成功")
      setErrorMessage('Username or password is correct')
    } else {
      // 登录失败，显示错误提示信息
      setErrorMessage('Username or password is incorrect')
    }
  }

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin} type="button">Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  )
}

export default LoginForm
