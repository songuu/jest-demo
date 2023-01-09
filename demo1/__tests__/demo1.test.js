class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  getName() {
    return this.name
  }

  getAge() {
    return this.age
  }

  setName(name) {
    this.name = name
  }

  setAge(age) {
    this.age = age
  }
}

describe('单元测试demo1', () => {
  test('creates a person with the correct name and age', () => {
    const person = new Person('John', 30)
    expect(person.getName()).toBe('John')
    expect(person.getAge()).toBe(30)
  })

  test('sets the name and age of a person correctly', () => {
    const person = new Person('John', 30)
    person.setName('Jane')
    person.setAge(25)
    expect(person.getName()).toBe('Jane')
    expect(person.getAge()).toBe(25)
  })
})

const tasks = []

export function addTask(task) {
  tasks.push(task)
}

export function getTasks() {
  return tasks
}

export function markTaskAsComplete(task) {
  const index = tasks.indexOf(task)
  if (index === -1) {
    throw new Error('Task not found')
  }
  tasks.splice(index, 1)
}

describe('todo list', () => {
  beforeEach(() => {
    // Reset the task list before each test
    getTasks().length = 0
  })

  test('adds a task to the list', () => {
    addTask('Learn Jest')
    expect(getTasks()).toContain('Learn Jest')
  })

  test('marks a task as complete', () => {
    addTask('Learn Jest')
    markTaskAsComplete('Learn Jest')
    expect(getTasks()).not.toContain('Learn Jest')
  })

  test('throws an error if the task is not found', () => {
    expect(() => {
      markTaskAsComplete('Learn Jest')
    }).toThrowError(/Task not found/)
  })
})
