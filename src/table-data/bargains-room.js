// const listFields = [
//    'ID',  'ID',  true ],
//    '入住日期',  'UseDate',  true ],
//    '入住天数',  'Days',  true ],
//    '网站最低价',  'WebLowestPrice',  true ],
//    '售卖价格',  'Price',  true ],
//    '卖点标签',  'Label',  true ],
//    '退改规则',  'CancleReason',  true ],
//    '已售出',  'IsSolded',  true ],
//    '购买人手机号',  'BuyUserPhone',  true ],
//    '创建人',  'CreateUser',  true ]
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
