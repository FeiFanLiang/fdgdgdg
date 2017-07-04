// const listFields = [
//    '酒店名称',  'HotelName',  true, isEditable: true ],
//    '英文名称',  'HotelName_En',  true, isEditable: true ],
//    '前台电话',  'FrontPhone',  true, isEditable: true ],
//    '地址',  'Address',  true, isEditable: true ],
//    '星级',  'Star.StarName',  true, isEditable: false ],
//    '采购人',  'Policys.PersonName',  true, isEditable: true ],
//   {
//     label: '政策负责人',
//      'Policys.PurchasingName',
//      true,
//     isEditable: true
//   ],
//    '结款',  'Policys.PayMode.ModeName',  true, isEditable: true ]
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
