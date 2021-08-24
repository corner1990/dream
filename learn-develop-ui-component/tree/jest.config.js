module.exports = {
  verbose: true, // 显示详细信息
  clearMocks: true, // 清楚mocks
  collectCoverage: true, // 收集测试覆盖率信息
  reporters: ['default', 'jest-junit'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // 如果模块后缀名为tsx的话，使用ts-jest进行转移
  },
  // 正则匹配需要做单元测试的文件
  testRegex: '(/__test__/.*|(test|spec)\\.(jsx|tsx))'
}