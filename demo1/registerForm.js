const { useState } = require('react')

const users = []

// 定义一个函数，用于注册用户
function registerUser(name, email, password) {
  // 如果 email 已经被注册过了，则抛出错误
  if (users.some((user) => user.email === email)) {
    throw new Error('The given email is already registered.')
  }

  // 否则，将用户信息存储到 users 数组中
  users.push({
    name,
    email,
    password,
  })
}

// 定义一个组件，用于渲染注册界面
function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    registerUser(name, email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  )
}

export { users }

export default RegisterForm
