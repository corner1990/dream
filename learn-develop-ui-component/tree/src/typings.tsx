/**
 * @desc 导出tree data
 */
export interface TreeData {
  name: string,
  key: string,
  type: string,
  collapsed: boolean,
  parent?: TreeData,
  children?: TreeData[]
  checked?: boolean
}