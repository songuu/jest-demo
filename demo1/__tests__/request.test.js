// 当然下面的代码还是可以继续优化
export const requestSuccess = (response) => {
  if (
    response?.data?.success === true ||
    response?.data?.code === 'success' ||
    response?.data?.code === '1000' ||
    response?.data?.code === 200 ||
    response?.data?.code === '200'
  ) {
    return response
  }
  console.error(response?.data?.message || '请求失败')
}

// 这个describe可以不用纠结，理解成几份用例的集合，只是统一为异常输入的描述
describe('requestSuccess方法异常输入测试用例', () => {
  test('response为空对象测试', () => {
    const input = {}
    const output = requestSuccess(input)
    expect(output).toBeUndefined()
  })
  test('response为undefined测试', () => {
    const output = requestSuccess()
    expect(output).toBeUndefined()
  })

  test('response为Number类型测试', () => {
    const output = requestSuccess(123)
    expect(output).toBeUndefined()
  })
})
