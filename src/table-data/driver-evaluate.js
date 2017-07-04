// const listFields = [
//    'ID',  'ID',  true ],
//    '工号',  'Driver',  true ],
//    '司机姓名',  'Openid',  true ],
//    '关注人次',  'field3',  true ],
//    '评论次数',  'field1',  true ],
//    '总分',  'Rate',  true ]
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
