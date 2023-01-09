// functions.test.js

test('测试jest.fn()调用', () => {
  let mockFn = jest.fn()
  let res = mockFn('厦门', '青岛', '三亚')

  // 断言mockFn的执行后返回undefined
  expect(res).toBeUndefined()
  // 断言mockFn被调用
  expect(mockFn).toBeCalled()
  // 断言mockFn被调用了一次
  expect(mockFn).toBeCalledTimes(1)
  // 断言mockFn传入的参数为1, 2, 3
  expect(mockFn).toHaveBeenCalledWith('厦门', '青岛', '三亚')
})

test('测试jest.fn()返回固定值', () => {
  let mockFn = jest.fn().mockReturnValue('default')
  // 断言mockFn执行后返回值为default
  expect(mockFn()).toBe('default')
})

test('测试jest.fn()内部实现', () => {
  let mockFn = jest.fn((num1, num2) => {
    return num1 + num2
  })
  // 断言mockFn执行后返回20
  expect(mockFn(10, 10)).toBe(20)
})

test('测试jest.fn()返回Promise', async () => {
  let mockFn = jest.fn().mockResolvedValue('default')
  let res = await mockFn()
  // 断言mockFn通过await关键字执行后返回值为default
  expect(res).toBe('default')
  // 断言mockFn调用后返回的是Promise对象
  expect(Object.prototype.toString.call(mockFn())).toBe('[object Promise]')
})
