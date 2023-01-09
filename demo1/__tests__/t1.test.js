// 定义一个函数，用于计算两个数的和
function add(a, b) {
  return a + b
}

// 定义测试用例
describe('add()', () => {
  it('should return the sum of two numbers', () => {
    // 使用 Jest 的 expect 函数来断言 add(1, 2) 的返回值是否为 3
    expect(add(1, 2)).toBe(3)
  })

  it('should return 0 if either operand is not a number', () => {
    // 使用 Jest 的 expect 函数来断言 add('foo', 'bar') 的返回值是否为 0
    expect(add('foo', 'bar')).toBe(0)
  })
})

// 定义一个函数，用于检查给定字符串是否为回文
function isPalindrome1(str) {
  return str === str.split('').reverse().join('')
}

// 定义测试用例
describe('isPalindrome1()', () => {
  it('should return true if the given string is a palindrome', () => {
    // 使用 Jest 的 expect 函数来断言 isPalindrome1('level') 的返回值是否为 true
    expect(isPalindrome1('level')).toBe(true)
  })

  it('should return false if the given string is not a palindrome', () => {
    // 使用 Jest 的 expect 函数来断言 isPalindrome('hello') 的返回值是否为 false
    expect(isPalindrome1('hello')).toBe(false)
  })
})

// 定义一个函数，用于检查给定字符串是否为回文
function isPalindrome(str) {
  // 将字符串转换为小写
  str = str.toLowerCase()

  // 将字符串按字符分割成数组
  let chars = str.split('')

  // 创建一个新数组，用于存储过滤后的字符
  let filteredChars = []

  // 过滤掉非字母字符
  chars.forEach((char) => {
    if (char >= 'a' && char <= 'z') {
      filteredChars.push(char)
    }
  })

  // 判断过滤后的字符数组是否为回文
  return filteredChars.join('') === filteredChars.reverse().join('')
}

// 定义测试用例
describe('isPalindrome()', () => {
  it('should return true if the given string is a palindrome', () => {
    // 使用 Jest 的 expect 函数来断言 isPalindrome('A man, a plan, a canal: Panama') 的返回值是否为 true
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true)
  })

  it('should return false if the given string is not a palindrome', () => {
    // 使用 Jest 的 expect 函数来断言 isPalindrome('Hello world') 的返回值是否为 false
    expect(isPalindrome('Hello world')).toBe(false)
  })

  it('should ignore non-letter characters', () => {
    // 使用 Jest 的 expect 函数来断言 isPalindrome('Eva, can I see bees in a cave?') 的返回值是否为 true
    expect(isPalindrome('Eva, can I see bees in a cave?')).toBe(true)
  })
})
