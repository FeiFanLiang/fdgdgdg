// const listFields = [
//    'ID',  'ID',  true ],
//    '工号',  'JobNnumber',  true ],
//    '姓名',  'Name',  true ],
//    '电话',  'Phone',  true ],
//    '备注',  'Remark',  true ]
// ]

import lib from './lib'
import { hotelPayModeApi } from 'api'

const data = [
  ['账户名称', 'ModeName', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string'],
  ['ID', 'ID', true, false, 'string']
]

const listFields = lib.trans(data)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: hotelPayModeApi.edit
    }
  }
}
