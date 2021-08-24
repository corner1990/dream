import { TreeData } from "../typings";

/**
 * @desc 导出文件
 */
const data: TreeData = {
  name: '父亲',
  key: '1',
  type: 'folder',
  collapsed: false,
  checked: false,
  children: [
      {
          name: '儿子1',
          key: '1-1',
          type: 'folder',
          collapsed: false,
          checked: false,
          children: [
              {
                  name: '孙子1',
                  key: '1-1-1',
                  type: 'folder',
                  collapsed: false,
                  checked: false,
                  children: [
                      {
                          name: '重孙1',
                          key: '1-1-1-1',
                          type: 'file',
                          collapsed: false,
                          checked: false,
                          children: []
                      }
                  ]
              }
          ]
      },
      {
          name: '儿子2',
          key: '1-2',
          type: 'folder',
          collapsed: true,
          checked: true
      }
  ]
}
export default data;