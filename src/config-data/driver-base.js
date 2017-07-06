import lib from './lib'
import { driverBaseApi } from 'api'

const listData = [
  ['ID', 'ID', true, false, 'string'],
  ['工号', 'JobNnumber', true, true, 'string'],
  ['姓名', 'Name', true, true, 'string'],
  ['电话', 'Phone', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string']
]

const searchData = [
  [
    '工作状态',
    'jobStatus',
    'select',
    [
      {
        value: 1,
        label: '正常在职'
      },
      {
        value: 2,
        label: '已离职'
      },
      {
        value: 3,
        label: '停职'
      },
      {
        value: 4,
        label: '休假'
      }
    ]
  ],
  [
    '请选择',
    'labelVal',
    'select',
    [
      {
        value: '1',
        label: '姓名'
      },
      {
        value: '2',
        label: '电话'
      }
    ]
  ],
  ['请输入姓名', 'name', 'input', ''],
  ['请输入电话', 'phone', 'input', '']
]
const listFields = lib.transTable(listData)
const searchFields = lib.transSearch(searchData)

export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: driverBaseApi.edit
    }
  }
}
