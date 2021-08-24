import { sum } from '../src/utils'

describe('sum', () => { // 表示一个分组
  test('1+1', () => { // 定义一个单元测试
    expect(sum(1, 1)).toBe(2) 
  })

  test('2+2', () => {
    expect(sum(2, 2)).toBe(4)
  })
})