module.exports = {
  verbose: true, // 显示详细信息
  clearMocks: true, // 清除mock
  collectCoverage: true, // 收集测试覆盖信息
  reporters: ["default", "jest-junit"],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ["node_modules"],
  transform: { // 如果模块是以.tsx结尾的话，需要ts-jest进行转义
    "^.+\\.tsx?$": "ts-jest",
  },
  // 表示要进入单元测试的正则匹配
  testRegex: '(/__tests__/.*|(test|spec)\\.(jsx|tsx))$',
}
