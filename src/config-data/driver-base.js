import lib from './lib'
import { driverBaseApi } from 'api'

const listData = [
  ['ID', 'ID', true, false, 'string'],
  ['工号', 'JobNnumber', true, true, 'string'],
  ['代码', 'CodeNum', true, true, 'string'],
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
    'multiple',
    [
      {
        value: 'name',
        label: '姓名'
      },
      {
        value: 'phone',
        label: '电话'
      }
    ]
  ]
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
